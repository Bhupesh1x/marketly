"use client";

import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

function StripeVerifyPage() {
  const trpc = useTRPC();

  const { mutate: verify } = useMutation(
    trpc.checkout.verify.mutationOptions({
      onSuccess: (data) => {
        window.location.href = data?.url;
      },
      onError: () => {
        window.location.href = "/";
      },
    })
  );

  useEffect(() => {
    verify();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="text-muted-foreground animate-spin" />
    </div>
  );
}

export default StripeVerifyPage;
