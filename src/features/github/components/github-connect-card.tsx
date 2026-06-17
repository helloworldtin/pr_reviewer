"use client";

import {
  RiArrowGoForwardLine,
  RiGithubLine,
  RiPlug2Line,
} from "@remixicon/react";
import { disconnectGithubApp } from "../actions";
import { Button } from "@/components/ui/button";
import {
  statusBadge,
  statusButtonClass,
} from "@/features/dashboard/lib/status-style";
import { GithubInstallationStatus } from "@/features/dashboard/lib/types";
import { getGithubInstallUrl } from "../utils/github-app";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

function ConnectedDetails({ accountLogin }: { accountLogin: null | string }) {
  return (
    <p className="text-xs text-muted-foreground">
      Installed for{" "}
      <span className="font-medium text-green-700 dark:text-green-400">
        @{accountLogin}
      </span>
      . The app can read repository metadata and post review comments on pull
      request.
    </p>
  );
}

function DisconnectedDetails() {
  return (
    <ul className="list-inside list-disc space-y-1 text-xs text-muted-foreground">
      <li>Access public and private repository you select</li>
      <li>Receive webhooks for pull request events</li>
      <li>Post AI-generated review comments on PRs</li>
    </ul>
  );
}

function ConnectedAction() {
  return (
    <form action={disconnectGithubApp}>
      <Button
        type="submit"
        variant="outline"
        className={statusButtonClass.danger}
      >
        <RiPlug2Line />
        Disconnect Github App
      </Button>
    </form>
  );
}

function DisconnectedActions({ installUrl }: { installUrl: string }) {
  return (
    <Button
      nativeButton={false}
      render={<a href={installUrl} className={statusButtonClass.success} />}
    >
      <RiGithubLine />
      Install Github App
      <RiArrowGoForwardLine />
    </Button>
  );
}

function ConnectionDetail({
  connected,
  accountLogin,
}: {
  connected: boolean;
  accountLogin: string | null;
}) {
  if (connected) return <ConnectedDetails accountLogin={accountLogin} />;

  return <DisconnectedDetails />;
}

function ConnectionAction({
  connected,
  installUrl,
}: {
  connected: boolean;
  installUrl: string;
}) {
  if (connected) return <ConnectedAction />;

  return <DisconnectedActions installUrl={installUrl} />;
}

type GithubConnectCardProps = {
  userId: string;
  installation: GithubInstallationStatus;
};

export function GithubConnectCard({
  userId,
  installation,
}: GithubConnectCardProps) {
  const { connected, accountLogin } = installation;

  const installUrl = getGithubInstallUrl(userId);

  let cardBorderClass = "border-border";
  let iconWrapperClass = "border-border bg-muted";
  let statusTone: "success" | "neutral" = "neutral";
  let statusLabel = "Not Connected";

  if (connected) {
    cardBorderClass = "border-green-500/30";
    iconWrapperClass =
      "border-green-500/40 bg-green-500/10 text-green-700 dark:text-green-400";
    statusTone = "success";
    statusLabel = "Connected";
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <Card className={cn("max-w-2xl transition-colors", cardBorderClass)}>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "flex size-10 items-center justify-center rounded-none border",
                  iconWrapperClass,
                )}
              >
                <RiGithubLine className="size-5" />
              </span>
              <div>
                <CardTitle>Github App</CardTitle>
                <CardDescription>
                  Install the Chai reviewer app on your GitHub account or
                  organization to access public and private repositories.
                </CardDescription>
              </div>
            </div>
          </div>
          <span className={statusBadge(statusTone)}>{statusLabel}</span>
        </CardHeader>
        <CardContent className="space-y-4">
          <ConnectionDetail connected={connected} accountLogin={accountLogin} />
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2">
          <ConnectionAction connected={connected} installUrl={installUrl} />
        </CardFooter>
      </Card>
    </div>
  );
}
