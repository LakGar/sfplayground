"use client";

import { useEffect } from "react";

export function ClearSigninErrorUrl() {
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("error") !== "invalid") return;

    const timer = window.setTimeout(() => {
      window.history.replaceState(null, "", "/admin/signin");
      document.getElementById("signin-error")?.remove();
    }, 1200);

    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
