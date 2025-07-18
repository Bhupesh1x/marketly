import z from "zod";
import { TRPCError } from "@trpc/server";

import { Media, Tenant } from "@/payload-types";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const checkoutRouter = createTRPCRouter({
  getProducts: baseProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
      })
    )
    .query(async ({ input, ctx }) => {
      const products = await ctx.payload.find({
        collection: "products",
        depth: 2, // Populate Image, Categories, Tenants, Tenants.Image
        where: {
          id: {
            in: input.ids,
          },
        },
      });

      if (products?.docs?.length !== input?.ids?.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Products not found",
        });
      }

      return {
        ...products,
        docs: products?.docs?.map((doc) => ({
          ...doc,
          image: doc?.image as Media | null,
          tenant: doc?.tenant as Tenant & { image: Media | null },
        })),
      };
    }),
});
