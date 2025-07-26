import z from "zod";
import { TRPCError } from "@trpc/server";
import type { Sort, Where } from "payload";
import { headers as getHeaders } from "next/headers";

import { DEFAULT_LIMIT } from "@/constants";

import { Category, Media, Review, Tenant } from "@/payload-types";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";

import { sortValues } from "../productParams";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        category: z.string().optional().nullable(),
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
        tags: z.array(z.string()).nullable().optional(),
        tenantSlug: z.string().nullable().optional(),
        sort: z.enum(sortValues).nullable().optional(),
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_LIMIT),
      })
    )
    .query(async ({ input, ctx }) => {
      const where: Where = {};
      let sort: Sort = "-createdAt";

      if (input.sort === "curated") {
        sort = "-createdAt";
      }

      if (input.sort === "trending") {
        sort = "name";
      }

      if (input.sort === "hot_and_new") {
        sort = "+createdAt";
      }

      if (input.minPrice && input.maxPrice) {
        where.price = {
          less_than_equal: input.maxPrice,
          greater_than_equal: input.minPrice,
        };
      } else if (input.minPrice) {
        where.price = {
          greater_than_equal: input.minPrice,
        };
      } else if (input.maxPrice) {
        where.price = {
          less_than_equal: input.maxPrice,
        };
      }

      if (input?.tenantSlug) {
        where["tenant.slug"] = {
          equals: input.tenantSlug,
        };
      }

      if (input?.category) {
        const parentCategoryData = await ctx.payload.find({
          collection: "categories",
          depth: 1, // Populate subcategories
          limit: 1,
          pagination: false,
          where: {
            slug: {
              equals: input.category,
            },
          },
        });

        const formattedData = parentCategoryData?.docs?.map(
          (doc: Category) => ({
            ...doc,
            subcategories: doc?.subcategories?.docs?.map((doc) => ({
              ...(doc as Category),
              subcategories: undefined,
            })),
          })
        );

        const subcategoriesSlugs = [];
        const parentCategory = formattedData?.[0];

        // For parent category want to load products listed under subcategories as well.
        if (parentCategory?.subcategories) {
          subcategoriesSlugs.push(
            ...(parentCategory?.subcategories ?? [])?.map(
              (subcategory) => subcategory?.slug
            )
          );
        }

        where["category.slug"] = {
          in: [...subcategoriesSlugs, parentCategory?.slug],
        };
      }

      if (input?.tags?.length) {
        where["tags.name"] = {
          in: input.tags,
        };
      }

      const products = await ctx.payload.find({
        collection: "products",
        depth: 2, // Populate Image, Categories, Tenants, Tenants.Image
        where,
        sort,
        page: input.cursor,
        limit: input.limit,
      });

      const allProductIds = products?.docs?.map((product) => product.id) || [];

      const allReviewsData = await ctx.payload.find({
        collection: "reviews",
        pagination: false,
        depth: 0,
        where: {
          product: {
            in: allProductIds,
          },
        },
      });

      // Group reviews by product id
      const reviewsByProductId: Record<string, Review[]> =
        allReviewsData?.docs?.reduce(
          (acc, review) => {
            const productId = review.product as string;
            if (!acc[productId]) {
              acc[productId] = [];
            }

            acc[productId].push(review);

            return acc;
          },
          {} as Record<string, Review[]>
        );

      const productsWithSumarrizedReviews = products?.docs?.map((doc) => {
        const productReviews = reviewsByProductId[doc.id] || [];
        const reviewCount = productReviews?.length;
        const reviewRating =
          reviewCount === 0
            ? 0
            : productReviews?.reduce(
                (acc, product) => (acc + (product.ratings ?? 0)) / reviewCount,
                0
              );

        return {
          ...doc,
          reviewCount,
          reviewRating,
        };
      });

      return {
        ...products,
        docs: productsWithSumarrizedReviews?.map((doc) => ({
          ...doc,
          image: doc?.image as Media | null,
          tenant: doc?.tenant as Tenant & { image: Media | null },
        })),
      };
    }),
  getOne: baseProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const productData = await ctx.payload.find({
        collection: "products",
        where: {
          id: {
            equals: input.id,
          },
        },
        pagination: false,
        depth: 2, // tenants, tenants.image, image
        limit: 1,
      });

      const product = productData?.docs?.[0];

      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }

      const headers = await getHeaders();
      const session = await ctx.payload.auth({ headers });

      let isPurchased = false;
      if (session?.user?.id) {
        const ordersData = await ctx.payload.find({
          collection: "orders",
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
                  equals: session?.user?.id,
                },
              },
            ],
          },
        });

        isPurchased = !!ordersData?.totalDocs;
      }

      const reviews = await ctx.payload.find({
        collection: "reviews",
        pagination: false,
        where: {
          product: {
            equals: product.id,
          },
        },
      });

      const reviewRating =
        reviews?.totalDocs > 0
          ? reviews?.docs?.reduce(
              (acc, review) => (acc + review.ratings) / reviews?.totalDocs,
              0
            )
          : 0;

      const reviewDistribution: Record<number, number> = {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
      };

      if (reviews?.totalDocs > 0) {
        reviews?.docs.forEach((review) => {
          const rating = review?.ratings;

          if (rating >= 1 && rating <= 5) {
            reviewDistribution[rating] = (reviewDistribution[rating] ?? 0) + 1;
          }
        });

        Object.keys(reviewDistribution)?.forEach((key) => {
          const rating = Number(key);
          const count = reviewDistribution[rating] || 0;

          reviewDistribution[rating] = Math.round(
            (count / reviews?.totalDocs) * 100
          );
        });
      }

      return {
        ...product,
        isPurchased,
        reviewRating,
        reviewCount: reviews?.totalDocs,
        reviewDistribution,
        image: product?.image as Media | null,
        tenant: product?.tenant as Tenant & { image: Media | null },
      };
    }),
});
