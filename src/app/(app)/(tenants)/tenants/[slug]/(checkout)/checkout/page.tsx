import { CheckoutView } from "@/features/checkout/views/CheckoutView";

interface Props {
  params: Promise<{ slug: string }>;
}

async function CheckoutPage({ params }: Props) {
  const { slug } = await params;

  return <CheckoutView slug={slug} />;
}

export default CheckoutPage;
