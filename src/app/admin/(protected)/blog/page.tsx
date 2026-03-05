import { DeleteBlogPostButton } from "@/app/admin/(protected)/blog/DeleteBlogPostButton";
import { getBlogPosts } from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const posts = await getBlogPosts(false);
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-oswald font-bold text-white">Blog</h1>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center justify-center w-fit px-4 py-2 rounded-lg bg-[#19f7ea] text-black font-oswald font-bold text-sm hover:bg-white transition-colors"
        >
          New post
        </Link>
      </div>
      <p className="text-white/60 text-sm mb-6">
        Manage posts. Publish to show on the public blog.
      </p>
      {posts.length === 0 ? (
        <div className="rounded-lg border border-white/10 bg-white/5 p-8 text-center text-white/60 font-oswald">
          No posts yet. Create one to get started.
        </div>
      ) : (
        <div className="rounded-lg border border-white/10 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-4 py-3 font-oswald text-white/80 text-sm font-bold">
                  Title
                </th>
                <th className="px-4 py-3 font-oswald text-white/80 text-sm font-bold">
                  Slug
                </th>
                <th className="px-4 py-3 font-oswald text-white/80 text-sm font-bold">
                  Status
                </th>
                <th className="px-4 py-3 font-oswald text-white/80 text-sm font-bold">
                  Updated
                </th>
                <th className="px-4 py-3 font-oswald text-white/80 text-sm font-bold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="px-4 py-3 text-white font-oswald text-sm">
                    {p.title}
                  </td>
                  <td className="px-4 py-3 text-white/60 text-sm font-mono">
                    {p.slug}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {p.published_at ? (
                      <span className="text-[#19f7ea]">Published</span>
                    ) : (
                      <span className="text-white/50">Draft</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-white/50 text-sm">
                    {new Date(p.updated_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/blog/${p.id}/edit`}
                      className="text-[#19f7ea] hover:underline font-oswald text-sm"
                    >
                      Edit
                    </Link>
                    {p.published_at && (
                      <>
                        {" · "}
                        <a
                          href={`/blog/${p.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/60 hover:underline text-sm"
                        >
                          View
                        </a>
                      </>
                    )}
                    {" · "}
                    <DeleteBlogPostButton id={p.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
