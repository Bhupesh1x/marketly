import { redirect } from "next/navigation";

import { caller } from "@/trpc/server";

import { SignUpView } from "@/features/auth/views/SignUpView";

export const dynamic = "force-dynamic";

async function SignUpPage() {
  const session = await caller.auth.session();

  if (session?.user) {
    redirect("/");
  }

  return (
    <>
      <SignUpView />
    </>
  );
}

export default SignUpPage;
