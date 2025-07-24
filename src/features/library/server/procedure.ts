import z from "zod";
import { TRPCError } from "@trpc/server";

import { DEFAULT_LIMIT } from "@/constants";

import { Media, Tenant } from "@/payload-types";

import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const libraryRouter = createTRPCRouter({
  getMany: protectedProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_LIMIT),
      })
    )
    .query(async ({ input, ctx }) => {
      const ordersData = await ctx.payload.find({
        collection: "orders",
        depth: 0,
        page: input.cursor,
        limit: input.limit,
        where: {
          user: {
            equals: ctx.session.user.id,
          },
        },
      });

      const productIds = ordersData?.docs?.map((order) => order.product) || [];

      const products = await ctx.payload.find({
        collection: "products",
        pagination: false,
        where: {
          id: {
            in: productIds,
          },
        },
      });

      return {
        ...products,
        docs: products?.docs?.map((doc) => ({
          ...doc,
          image: doc?.image as Media | null,
          tenant: doc?.tenant as Tenant & { image: Media | null },
        })),
      };
    }),
  getOne: protectedProcedure
    .input(
      z.object({
        productId: z.string().min(1),
      })
    )
    .query(async ({ input, ctx }) => {
      const orderData = await ctx.payload.find({
        collection: "orders",
        depth: 0,
        pagination: false,
        limit: 1,
        where: {
          and: [
            {
              user: {
                equals: ctx.session.user.id,
              },
            },
            {
              product: {
                equals: input.productId,
              },
            },
          ],
        },
      });

      const order = orderData?.docs?.[0];

      if (!order) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Order not found" });
      }

      const product = await ctx.payload.findByID({
        collection: "products",
        id: order.product as string,
      });

      if (!product) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Order not found" });
      }

      return product;
    }),
});
