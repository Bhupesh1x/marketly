import z from "zod";
import type Stripe from "stripe";
import { TRPCError } from "@trpc/server";

import { Media, Tenant } from "@/payload-types";

import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import { stripe } from "@/lib/stripe";

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

      const totalPrice = products?.docs?.reduce(
        (acc, product) => acc + (product?.price ?? 0),
        0
      );

      return {
        ...products,
        totalPrice,
        docs: products?.docs?.map((doc) => ({
          ...doc,
          image: doc?.image as Media | null,
          tenant: doc?.tenant as Tenant & { image: Media | null },
        })),
      };
    }),
  purchase: protectedProcedure
    .input(
      z.object({
        ids: z.array(z.string()).min(1),
        tenantSlug: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const tenantData = await ctx.payload.find({
        collection: "tenants",
        limit: 1,
        pagination: false,
        where: {
          slug: {
            equals: input.tenantSlug,
          },
        },
      });

      const tenant = tenantData?.docs?.[0];

      if (!tenant) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Tenant not found" });
      }

      const products = await ctx.payload.find({
        collection: "products",
        depth: 2,
        where: {
          and: [
            {
              id: {
                in: input.ids,
              },
            },
            {
              "tenant.slug": {
                equals: input.tenantSlug,
              },
            },
          ],
        },
      });

      if (products?.totalDocs !== input?.ids?.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }

      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
        products?.docs?.map((product) => ({
          quantity: 1,
          price_data: {
            unit_amount: product?.price * 100,
            currency: "inr",
            product_data: {
              name: product?.name,
              description: product?.description || " ",
              metadata: {
                id: product.id,
                name: product.name,
                price: product.price,
                stripeAccountId: tenant.stripeAccountId,
              },
            },
          },
        }));

      const checkout = await stripe.checkout.sessions.create({
        customer_email: ctx.session.user.email,
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/tenants/${tenant.slug}/checkout?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/tenants/${tenant.slug}/checkout?cancel=true`,
        line_items: lineItems,
        mode: "payment",
        invoice_creation: {
          enabled: true,
        },
        metadata: {
          userId: ctx.session.user.id,
        },
      });

      if (!checkout?.url) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create checkout session",
        });
      }

      return { url: checkout.url };
    }),
});
