import { authRouter } from "@/features/auth/server/procedure";
import { categoriesRouter } from "@/features/categories/server/procedure";

import { createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  categories: categoriesRouter,
});

export type AppRouter = typeof appRouter;
