import { authRouter } from "@/features/auth/server/procedure";
import { tagsRouter } from "@/features/tags/server/procedure";
import { libraryRouter } from "@/features/library/server/procedure";
import { tenantsRouter } from "@/features/tenants/server/procedure";
import { reviewsRouter } from "@/features/reviews/server/procedure";
import { checkoutRouter } from "@/features/checkout/server/procedure";
import { productsRouter } from "@/features/products/server/procedure";
import { categoriesRouter } from "@/features/categories/server/procedure";

import { createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  tags: tagsRouter,
  library: libraryRouter,
  tenants: tenantsRouter,
  reviews: reviewsRouter,
  checkout: checkoutRouter,
  products: productsRouter,
  categories: categoriesRouter,
});

export type AppRouter = typeof appRouter;
