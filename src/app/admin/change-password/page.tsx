import { redirect } from "next/navigation";

import { ClearSigninErrorUrl } from "@/components/clear-signin-error-url";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSession } from "@/lib/admin-auth";

export const metadata = {
  title: "Set password | SFPlayground",
};

export default async function ChangePasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/signin");
  const { error } = await searchParams;

  return (
    <main className="flex min-h-svh items-center justify-center bg-muted/30 px-4 py-10">
      <ClearSigninErrorUrl />
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Set your password</CardTitle>
          <CardDescription>
            Choose a private password before continuing to the admin board.
          </CardDescription>
          {error ? (
            <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              Use at least 10 characters, and make sure both password fields match.
            </p>
          ) : null}
        </CardHeader>
        <form action="/api/auth/change-password" method="post" className="grid gap-5 px-6 pb-6">
          {!session.passwordChangeRequired ? (
            <div className="grid gap-2">
              <Label htmlFor="currentPassword">Current password</Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                autoComplete="current-password"
                required
              />
            </div>
          ) : null}
          <div className="grid gap-2">
            <Label htmlFor="newPassword">New password</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              autoComplete="new-password"
              minLength={10}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              minLength={10}
              required
            />
          </div>
          <Button type="submit">Save password</Button>
        </form>
      </Card>
    </main>
  );
}
