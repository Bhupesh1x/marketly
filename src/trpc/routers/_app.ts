import { authRouter } from "@/features/auth/server/procedure";
import { tagsRouter } from "@/features/tags/server/procedure";
import { productsRouter } from "@/features/products/server/procedure";
import { categoriesRouter } from "@/features/categories/server/procedure";

import { createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  tags: tagsRouter,
  products: productsRouter,
  categories: categoriesRouter,
});

export type AppRouter = typeof appRouter;
