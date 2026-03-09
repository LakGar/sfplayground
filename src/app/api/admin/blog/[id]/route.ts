import { getSession } from "@/lib/admin-auth";
import { deleteBlogPost, getBlogPostById, updateBlogPost } from "@/lib/db";
import { convertGoogleDriveImageUrl } from "@/utils/convertDriveImageUrl";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const postId = Number(id);
  if (!Number.isInteger(postId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  try {
    const body = await request.json();
    const { title, slug, excerpt, body: postBody, image_url, publish } = body;
    const existing = await getBlogPostById(postId);
    if (!existing) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    const updates: Parameters<typeof updateBlogPost>[1] = {};
    if (title !== undefined) updates.title = title;
    if (slug !== undefined) updates.slug = slug.trim().toLowerCase().replace(/\s+/g, "-");
    if (excerpt !== undefined) updates.excerpt = excerpt || null;
    if (postBody !== undefined) updates.body = postBody;
    if (image_url !== undefined)
      updates.image_url = image_url ? convertGoogleDriveImageUrl(image_url) : null;
    if (publish === true) updates.published_at = new Date();
    if (publish === false) updates.published_at = null;
    const updated = await updateBlogPost(postId, updates);
    return NextResponse.json(updated);
  } catch (err) {
    console.error("Blog update error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const postId = Number(id);
  if (!Number.isInteger(postId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  const deleted = await deleteBlogPost(postId);
  if (!deleted) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  return new NextResponse(null, { status: 204 });
}
