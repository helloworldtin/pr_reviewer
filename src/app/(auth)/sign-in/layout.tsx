import { requireUnauth } from "@/features/auth/actions";
import { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireUnauth();
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center items-center bg-muted/40 px-4 py-2">
      <div className="w-full max-w-sm"> {children} </div>
    </div>
  );
}
