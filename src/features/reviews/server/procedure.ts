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
  create: protectedProcedure
    .input(
      z.object({
        productId: z.string().min(1),
        ratings: z.number().min(1).max(5),
        description: z.string().min(1, "Description is required"),
      })
    )
    .mutation(async ({ ctx, input }) => {
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

      if (reviewsData?.totalDocs > 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Review already exist",
        });
      }

      const createdReview = await ctx.payload.create({
        collection: "reviews",
        data: {
          product: product.id,
          description: input.description,
          ratings: input.ratings,
          user: ctx.session.user.id,
        },
      });

      return createdReview;
    }),
  update: protectedProcedure
    .input(
      z.object({
        reviewId: z.string().min(1),
        ratings: z.number().min(1).max(5),
        description: z.string().min(1, "Description is required"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const review = await ctx.payload.findByID({
        collection: "reviews",
        depth: 0, // review.user will be userId with depth being 0
        id: input.reviewId,
      });

      if (!review) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Review not found",
        });
      }

      if (review?.user !== ctx.session.user.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You're not allowed to perform this action",
        });
      }

      const updatedReview = await ctx.payload.update({
        collection: "reviews",
        id: review.id,
        data: {
          description: input.description,
          ratings: input.ratings,
        },
      });

      return updatedReview;
    }),
});
