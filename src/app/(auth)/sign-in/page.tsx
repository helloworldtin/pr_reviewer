import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSet,
} from "@/components/ui/field";
import GithubSignInForm from "@/features/auth/components/github-sign-in-form";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to PR reviewer with your github account",
};

type SignInPageProps = {
  searchParams: Promise<{ callbackUrl?: string }>;
};
export default async function SigninPage({ searchParams }: SignInPageProps) {
  const { callbackUrl } = await searchParams;
  return (
    <Card className="border-border/80 shadow-sm">
      <CardHeader className="items-center text-center">
        <div className="mb-6 flex justify-center pt-2">
          <Image
            height={172}
            width={172}
            src="./logo.svg"
            priority
            className="text-foreground"
            alt="app logo"
          />
        </div>
        <CardTitle className="text-base">Welcome Back</CardTitle>
        <CardDescription>
          Signin With github to review and manage your code.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldSet>
          <FieldGroup>
            <Field>
              <GithubSignInForm callbackUrl={callbackUrl} />
              <FieldDescription>
                We only require the permission need to identify your account.
                You can revoke access anytime from Github Setting.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>
      </CardContent>
    </Card>
  );
}
