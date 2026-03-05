import { getSuccessStoryById } from "@/lib/db";
import { notFound } from "next/navigation";
import { SuccessStoryForm } from "../../SuccessStoryForm";

export const dynamic = "force-dynamic";

export default async function AdminSuccessStoryEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const story = await getSuccessStoryById(Number(id));
  if (!story) notFound();
  return (
    <div>
      <h1 className="text-2xl font-oswald font-bold text-white mb-6">
        Edit: {story.title}
      </h1>
      <SuccessStoryForm story={story} />
    </div>
  );
}
