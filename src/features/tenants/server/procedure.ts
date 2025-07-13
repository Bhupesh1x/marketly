import z from "zod";
import { TRPCError } from "@trpc/server";

import { Media, Tenant } from "@/payload-types";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const tenantsRouter = createTRPCRouter({
  getOne: baseProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const tenantsData = await ctx.payload.find({
        collection: "tenants",
        depth: 1, // Populate tenants.image
        where: {
          slug: {
            equals: input.slug,
          },
        },
        pagination: false,
        limit: 1,
      });

      const tenant = tenantsData?.docs?.[0];

      if (!tenant) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Tenant not found" });
      }

      return tenant as Tenant & { image: Media | null };
    }),
});
