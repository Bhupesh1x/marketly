import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

export type CategoryGetManyOutput =
  inferRouterOutputs<AppRouter>["categories"]["getMany"];
