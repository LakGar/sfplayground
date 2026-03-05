import { getBlogPostById } from "@/lib/db";
import { notFound } from "next/navigation";
import { BlogPostForm } from "../../BlogPostForm";

export const dynamic = "force-dynamic";

export default async function AdminBlogEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getBlogPostById(Number(id));
  if (!post) notFound();
  return (
    <div>
      <h1 className="text-2xl font-oswald font-bold text-white mb-6">
        Edit: {post.title}
      </h1>
      <BlogPostForm post={post} />
    </div>
  );
}
