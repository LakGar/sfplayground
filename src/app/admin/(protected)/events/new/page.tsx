import { EventForm } from "../EventForm";

export const dynamic = "force-dynamic";

export default function AdminEventsNewPage() {
  return (
    <div>
      <h1 className="text-2xl font-oswald font-bold text-white mb-6">
        New event
      </h1>
      <EventForm />
    </div>
  );
}
