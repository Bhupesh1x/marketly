import { Button, Link } from "@payloadcms/ui";

export function StripeVerify() {
  return (
    <Link href="/stripe-verify">
      <Button className="my-4">Verify account</Button>
    </Link>
  );
}
