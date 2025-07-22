import type Stripe from "stripe";

export interface ProductMetadata {
  id: string;
  name: string;
  price: number;
  stripeAccountId: string;
}

export type ExpandedLineItem = Stripe.LineItem & {
  price: Stripe.Price & {
    product: Stripe.Product & {
      metadata: ProductMetadata;
    };
  };
};
