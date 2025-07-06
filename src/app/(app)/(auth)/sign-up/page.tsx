import { redirect } from "next/navigation";

import { caller } from "@/trpc/server";

import { SignUpView } from "@/features/auth/views/SignUpView";

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
