import { redirect } from "next/navigation";
import { getSession } from "@/lib/admin-auth";
import { AdminShell } from "./AdminShell";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/admin/signin");
  }
  return <AdminShell>{children}</AdminShell>;
}
