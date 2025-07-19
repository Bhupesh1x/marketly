import { CircleXIcon } from "lucide-react";

import { formatPrice } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Props {
  totalPrice: number;
  isPending?: boolean;
  isCancelled?: boolean;
  onCheckout: () => void;
}

export function CheckoutSidebar({
  totalPrice,
  isCancelled,
  isPending,
  onCheckout,
}: Props) {
  return (
    <div className="w-full border bg-white rounded-md">
      <div className="flex items-center justify-between border-b p-4">
        <h4 className="font-semibold">Total</h4>
        <p className="font-semibold text-base">{formatPrice(totalPrice)}</p>
      </div>
      <div className="p-4">
        <Button
          disabled={isPending}
          variant="elevated"
          className="bg-primary text-white hover:bg-purple-400 hover:text-primary w-full"
          onClick={onCheckout}
        >
          Checkout
        </Button>
      </div>
      {isCancelled && (
        <div className="border-t p-4">
          <div className="flex items-center gap-2 bg-red-100 rounded py-3 px-4 border border-red-400 font-medium">
            <CircleXIcon className="size-6 fill-red-500 text-red-100" />
            <p className="text-red-500">Checkout failed. Please try again.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export function CheckoutSidebarSkeleton() {
  return (
    <div className="w-full border rounded-md h-[140px] bg-white animate-pulse" />
  );
}
