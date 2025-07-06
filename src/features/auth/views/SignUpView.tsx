"use client";

import z from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { registerSchema } from "../schemas";

export function SignUpView() {
  const form = useForm<z.infer<typeof registerSchema>>({
    mode: "all",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const trpc = useTRPC();
  const register = useMutation(trpc.auth.register.mutationOptions({}));

  const queryClient = useQueryClient();
  function onSubmit(values: z.infer<typeof registerSchema>) {
    register.mutate(values, {
      onError: (error) => {
        toast.error(
          error?.message ||
            "Failed to register. Please try again after sometime"
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.auth.session.queryOptions());
        router.replace("/");
      },
    });
  }

  const nameError = form.formState.errors.username;
  const username = form.watch("username");
  const showUsernameDescription = !nameError && !!username;

  return (
    <div className="h-screen w-full grid grid-cols-1 lg:grid-cols-5">
      <div className="h-full w-full col-span-1 lg:col-span-3 bg-[#F4F4F0] p-4 lg:p-16">
        <div className="flex items-center justify-between w-full">
          <Link href="/">
            <h2 className="text-2xl font-semibold">Marketly</h2>
          </Link>

          <Button variant="ghost" size="sm" className="underline border-none">
            <Link href="/sign-in">Sign in</Link>
          </Button>
        </div>
        <h1 className="mt-10 mb-5 text-3xl font-medium">
          Join over 2,340+ creators earning money on Marketly.
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="John doe" />
                  </FormControl>
                  {!!showUsernameDescription && (
                    <FormDescription>
                      Your store will be available at {username}.shop.com
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="John@gmail.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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

            <Button
              disabled={register.isPending}
              type="submit"
              variant="elevated"
              size="lg"
              className="w-full"
            >
              Create account
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
