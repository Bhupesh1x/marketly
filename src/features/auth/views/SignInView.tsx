"use client";

import z from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { GUEST_CREDENTIALS } from "@/constants";

import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { loginSchema } from "../schemas";

export function SignInView() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const trpc = useTRPC();
  const login = useMutation(trpc.auth.login.mutationOptions({}));

  const queryClient = useQueryClient();
  function onSubmit(values: z.infer<typeof loginSchema>) {
    login.mutate(values, {
      onError: (error) => {
        toast.error(
          error?.message || "Failed to login. Please try again after sometime"
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.auth.session.queryOptions());

        const url = searchParams?.get("return-url");

        if (url) {
          router.replace(url);
        } else {
          router.replace("/");
        }
      },
    });
  }

  function handleFillGuestCredentails() {
    form.setValue("email", GUEST_CREDENTIALS.email);
    form.setValue("password", GUEST_CREDENTIALS.password);
  }

  return (
    <div className="h-screen w-full grid grid-cols-1 lg:grid-cols-5">
      <div className="h-full w-full col-span-1 lg:col-span-3 bg-[#F4F4F0] p-4 lg:p-16">
        <div className="flex items-center justify-between w-full">
          <Link href="/">
            <h2 className="text-2xl font-semibold">Marketly</h2>
          </Link>

          <Button variant="ghost" size="sm" className="underline border-none">
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div>
        <h1 className="mt-10 mb-5 text-3xl font-medium">
          Welcome back to Marketly.
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="john@gmail.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="******" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-end justify-end mt-2">
                <button
                  onClick={handleFillGuestCredentails}
                  type="button"
                  className="text-sm font-medium underline border-none h-fit cursor-pointer"
                >
                  Use guest credentials
                </button>
              </div>
            </div>

            <Button
              disabled={login.isPending}
              type="submit"
              variant="elevated"
              size="lg"
              className="w-full"
            >
              Log in
            </Button>
          </form>
        </Form>
      </div>
      <div
        className="h-full w-full hidden lg:block lg:col-span-2"
        style={{
          backgroundImage: "url('/images/auth-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
}
