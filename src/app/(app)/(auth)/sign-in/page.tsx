import { redirect } from "next/navigation";

import { caller } from "@/trpc/server";

import { SignInView } from "@/features/auth/views/SignInView";

export const dynamic = "force-dynamic";

async function SignInPage() {
  const session = await caller.auth.session();

  if (session?.user) {
    redirect("/");
  }

  return (
    <>
      <SignInView />
    </>
  );
}

export default SignInPage;
