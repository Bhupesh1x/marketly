import z from "zod";
import { TRPCError } from "@trpc/server";
import type { Sort, Where } from "payload";

import { DEFAULT_LIMIT } from "@/constants";

import { Category, Media, Tenant } from "@/payload-types";

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

      return {
        ...products,
        docs: products?.docs?.map((doc) => ({
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

      return {
        ...product,
        tenant: product?.tenant as Tenant & { image: Media | null },
      };
    }),
});
