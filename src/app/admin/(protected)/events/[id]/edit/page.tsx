import { getEventById } from "@/lib/db";
import { notFound } from "next/navigation";
import { EventForm } from "../../EventForm";

export const dynamic = "force-dynamic";

export default async function AdminEventEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEventById(Number(id));
  if (!event) notFound();
  return (
    <div>
      <h1 className="text-2xl font-oswald font-bold text-white mb-6">
        Edit: {event.title}
      </h1>
      <EventForm event={event} />
    </div>
  );
}
