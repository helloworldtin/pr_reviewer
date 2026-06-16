import { requireAuth } from "@/features/auth/actions";
import { ReactNode } from "react";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAuth();
  return <div className="min-h-svh">{children}</div>;
}
