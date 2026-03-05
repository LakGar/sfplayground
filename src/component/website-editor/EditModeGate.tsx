"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { WebsiteContentProvider } from "@/context/WebsiteContentContext";
import { EditOverlay } from "./EditOverlay";

function EditModeGateInner({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const editMode = searchParams.get("editMode") === "1";
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    if (!editMode) return;
    fetch("/api/admin/website-content", { credentials: "include" })
      .then((r) => setCanEdit(r.ok))
      .catch(() => setCanEdit(false));
  }, [editMode]);

  return (
    <WebsiteContentProvider>
      {editMode && canEdit ? (
        <EditOverlay>{children}</EditOverlay>
      ) : (
        children
      )}
    </WebsiteContentProvider>
  );
}

export function EditModeGate({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={children}>
      <EditModeGateInner>{children}</EditModeGateInner>
    </Suspense>
  );
}
