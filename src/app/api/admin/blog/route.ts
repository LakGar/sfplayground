import { getSession } from "@/lib/admin-auth";
import { createBlogPost, getBlogPosts } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const publishedOnly =
    request.nextUrl.searchParams.get("published") === "true";
  const posts = await getBlogPosts(!publishedOnly);
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { title, slug, excerpt, body: postBody, image_url, publish } = body;
    if (!title || !slug || !postBody) {
      return NextResponse.json(
        { error: "title, slug, and body are required" },
        { status: 400 }
      );
    }
    const post = await createBlogPost({
      title,
      slug: slug.trim().toLowerCase().replace(/\s+/g, "-"),
      excerpt: excerpt || null,
      body: postBody,
      image_url: image_url || null,
    });
    if (publish) {
      const { updateBlogPost } = await import("@/lib/db");
      await updateBlogPost(post.id, { published_at: new Date() });
      const updated = await (await import("@/lib/db")).getBlogPostById(post.id);
      return NextResponse.json(updated ?? post);
    }
    return NextResponse.json(post);
  } catch (err) {
    console.error("Blog create error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create post" },
      { status: 500 }
    );
  }
}
