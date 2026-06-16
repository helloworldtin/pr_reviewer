"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { SIGN_IN_PATH } from "../utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RiArrowUpDownLine, RiLogoutCircleLine } from "@remixicon/react";
import { Badge } from "@/components/ui/badge";

const DEFAULT_PLAN = "Free";

export type UserMenu = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export type UserMenuTriggerVariant = "compact" | "profile";

type UserMenuProps = {
  user: UserMenu;
  variant?: UserMenuTriggerVariant;
  plan?: string;
  className?: string;
};

export function getDisplayName(user: UserMenu) {
  return user.name?.trim() || user.email?.split("@")[0] || "User";
}

export function getInitials(user: UserMenu) {
  const source = user.name?.trim() || user.email || "U";
  const parts = source.split(/\s+/).filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }

  return source.slice(0, 2).toUpperCase();
}

function UserAvatar({
  user,
  size = "default",
}: {
  user: UserMenu;
  size?: "default" | "sm" | "lg";
}) {
  return (
    <Avatar size={size}>
      {user.image ? (
        <AvatarImage src={user.image} alt={getDisplayName(user)} />
      ) : null}

      <AvatarFallback>{getInitials(user)}</AvatarFallback>
    </Avatar>
  );
}

export function UserMenu({
  user,
  variant = "profile",
  plan = DEFAULT_PLAN,
  className,
}: UserMenuProps) {
  const router = useRouter();
  const displayName = getDisplayName(user);

  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace(SIGN_IN_PATH);
        },
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(className)}
        render={
          variant === "compact" ? (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Open account menu"
            ></Button>
          ) : (
            <Button
              variant="ghost"
              className="h-9 gap-2 px-2"
              aria-label="Open menu account"
            />
          )
        }
      >
        <UserAvatar
          user={user}
          size={variant == "compact" ? "default" : "sm"}
        />
        {variant === "profile" ? (
          <>
            <span className="max-w-32 truncate text-left text-xs font-medium">
              {displayName}
            </span>
            <RiArrowUpDownLine />
          </>
        ) : null}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-start gap-2 p-2">
              <UserAvatar user={user} />
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <p className="truncate text-xs font-medium"> {displayName} </p>
                {user.email && (
                  <p className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </p>
                )}
                <Badge variant="secondary" className="w-fit">
                  {plan} plan
                </Badge>
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive" onClick={handleSignout}>
            <RiLogoutCircleLine />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type UserMenuWithSessionProps = Omit<UserMenuProps, "user">;

export function UserMenuWithSession(props: UserMenuWithSessionProps) {
  const { data: session, isPending } = authClient.useSession();

  if (isPending || !session?.user) {
    return null;
  }

  return <UserMenu user={session.user} {...props} />;
}
