"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ADMIN_PROFILES, type AdminId } from "@/data/admin-profiles";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [selectedId, setSelectedId] = useState<AdminId | null>(null);
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedId || !password.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminId: selectedId, password: password.trim() }),
      });
      if (res.redirected) {
        window.location.href = res.url;
        return;
      }
      router.push("/admin/signin?error=invalid");
    } catch {
      router.push("/admin/signin?error=invalid");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top_left,rgba(148,163,184,0.12),transparent_55%),radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.06),transparent_40%)]">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/3 p-8 backdrop-blur">
        <h1 className="text-xl font-oswald font-bold text-white mb-2">
          Admin sign in
        </h1>
        <p className="text-white/60 text-sm mb-6">
          Select your profile and enter your password.
        </p>
        {error === "invalid" && (
          <p className="mb-4 text-amber-400 text-sm">Invalid profile or password.</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {ADMIN_PROFILES.map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => setSelectedId(user.id)}
                className={`rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition-all ${
                  selectedId === user.id
                    ? "border-slate-300 bg-slate-300/10"
                    : "border-white/20 bg-white/5 hover:border-white/40"
                }`}
              >
                <img
                  src={user.imageUrl}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <span className="text-white font-oswald text-sm font-medium text-center">
                  {user.name}
                </span>
              </button>
            ))}
          </div>
          <div>
            <label htmlFor="password" className="block text-white/80 text-sm font-oswald mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/20 text-white placeholder-white/40 font-oswald focus:border-slate-300 focus:outline-none"
              required
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            disabled={!selectedId || !password.trim() || submitting}
            className="block w-full py-3 px-4 rounded-lg bg-slate-200 text-slate-900 font-oswald font-bold hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminSignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white/60">Loading…</div>}>
      <SignInForm />
    </Suspense>
  );
}
