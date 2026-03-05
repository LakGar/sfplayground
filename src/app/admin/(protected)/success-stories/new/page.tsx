import { SuccessStoryForm } from "../SuccessStoryForm";

export const dynamic = "force-dynamic";

export default function AdminSuccessStoriesNewPage() {
  return (
    <div>
      <h1 className="text-2xl font-oswald font-bold text-white mb-6">
        New success story
      </h1>
      <SuccessStoryForm />
    </div>
  );
}
