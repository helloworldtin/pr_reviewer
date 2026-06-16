"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  DEFAULT_AUTH_CALLBACK,
  getSafeCallbackPath,
  SIGN_IN_PATH,
} from "../utils";

export async function signInWithGithub(formData: FormData) {
  const callback = formData.get("callbackUrl");

  const redirectTo = getSafeCallbackPath(
    typeof callback === "string" ? callback : null,
  );
  const requestHeaders = await headers();

  const result = await auth.api.signInSocial({
    body: {
      provider: "github",
      callbackURL: redirectTo,
    },
    headers: requestHeaders,
  });

  if (result.url) {
    redirect(result.url);
  }
}

export async function getServerSession() {
  const requestHeaders = await headers();
  return auth.api.getSession({ headers: requestHeaders });
}

export async function requireAuth(redirectTo = SIGN_IN_PATH) {
  const session = await getServerSession();
  if (!session) {
    redirect(redirectTo);
  }

  return session;
}

export async function requireUnauth(redirectTo = DEFAULT_AUTH_CALLBACK) {
  const session = await getServerSession();

  if (session) {
    redirect(redirectTo);
  }
  return null;
}
