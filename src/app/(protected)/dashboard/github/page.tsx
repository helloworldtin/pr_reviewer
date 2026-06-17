import { requireAuth } from "@/features/auth/actions";
import { DashboardHeader } from "@/features/dashboard/componets/dashboard-header";
import { GithubConnectCard } from "@/features/github/components/github-connect-card";
import { getInstallationStatus } from "@/features/github/server/installiation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Github App - Dashboard",
};

export default async function DashboardGithub() {
  const session = await requireAuth();

  const installation = await getInstallationStatus(session.user.id);

  return (
    <>
      <DashboardHeader
        title="Github App"
        description="Install or disconnect the reviewer app on your github account"
      />
      <GithubConnectCard userId={session.user.id} installation={installation} />
    </>
  );
}
