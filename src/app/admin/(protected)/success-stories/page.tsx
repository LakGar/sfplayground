import { getSuccessStories } from "@/lib/db";
import Link from "next/link";
import { DeleteSuccessStoryButton } from "@/component/admin/DeleteSuccessStoryButton";

export const dynamic = "force-dynamic";

export default async function AdminSuccessStoriesPage() {
  const stories = await getSuccessStories();
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-oswald font-bold text-white">
          Success stories
        </h1>
        <Link
          href="/admin/success-stories/new"
          className="inline-flex items-center justify-center w-fit px-4 py-2 rounded-lg bg-[#19f7ea] text-black font-oswald font-bold text-sm hover:bg-white transition-colors"
        >
          New story
        </Link>
      </div>
      <p className="text-white/60 text-sm mb-6">
        Manage success stories. Edit title, tagline, description, quotes, and
        all content.
      </p>
      {stories.length === 0 ? (
        <div className="rounded-lg border border-white/10 bg-white/5 p-8 text-center text-white/60 font-oswald">
          No success stories yet. Create one or import from site-data.
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
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {stories.map((s) => (
                <tr
                  key={s.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="px-4 py-3 text-white font-oswald text-sm">
                    {s.title}
                  </td>
                  <td className="px-4 py-3 text-white/60 text-sm font-mono">
                    {s.slug}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/success-stories/${s.id}/edit`}
                      className="text-[#19f7ea] hover:underline font-oswald text-sm"
                    >
                      Edit
                    </Link>
                    {" · "}
                    <a
                      href={`/success-stories/${s.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:underline text-sm"
                    >
                      View
                    </a>
                    <DeleteSuccessStoryButton id={s.id} />
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
