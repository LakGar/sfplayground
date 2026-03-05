import { BlogPostForm } from "../BlogPostForm";

export const dynamic = "force-dynamic";

export default function AdminBlogNewPage() {
  return (
    <div>
      <h1 className="text-2xl font-oswald font-bold text-white mb-6">
        New post
      </h1>
      <BlogPostForm />
    </div>
  );
}
