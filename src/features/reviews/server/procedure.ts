import z from "zod";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const reviewsRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const product = await ctx.payload.findByID({
        collection: "products",
        id: input.productId,
      });

      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }

      const reviewsData = await ctx.payload.find({
        collection: "reviews",
        limit: 1,
        pagination: false,
        where: {
          and: [
            {
              product: {
                equals: product.id,
              },
            },
            {
              user: {
                equals: ctx.session.user.id,
              },
            },
          ],
        },
      });

      const review = reviewsData?.docs?.[0];

      if (!review) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Review not found" });
      }

      return review;
    }),
});
