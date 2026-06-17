import Image from "next/image";

import { ADMIN_USERS } from "@/lib/admin-auth";
import { ClearSigninErrorUrl } from "@/components/clear-signin-error-url";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata = {
  title: "Sign in | SFPlayground",
};

export default async function AdminSignInPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="flex min-h-svh items-center justify-center bg-muted/30 px-4 py-10">
      <ClearSigninErrorUrl />
      <Card className="w-full max-w-md">
        <CardHeader className="gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="SFPlayground"
              width={42}
              height={42}
              className="rounded-md object-contain"
            />
            <div>
              <CardTitle>SFPlayground</CardTitle>
              <CardDescription>Co-founder admin login</CardDescription>
            </div>
          </div>
          {error ? (
            <p
              id="signin-error"
              className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              The selected co-founder or password was not recognized.
            </p>
          ) : null}
        </CardHeader>
        <form action="/api/auth/signin" method="post" className="grid gap-5 px-6 pb-6">
          <div className="grid gap-2">
            <Label htmlFor="adminId">Co-founder</Label>
            <select
              id="adminId"
              name="adminId"
              className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              required
            >
              {ADMIN_USERS.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" autoComplete="current-password" required />
          </div>
          <Button type="submit">Sign in</Button>
        </form>
      </Card>
    </main>
  );
}
