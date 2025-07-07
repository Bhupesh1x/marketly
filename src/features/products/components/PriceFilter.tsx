import { ChangeEvent } from "react";

import { formatAsCurrency } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  minPrice?: string | null;
  maxPrice?: string | null;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
}

export function PriceFilter({
  maxPrice,
  minPrice,
  onMaxPriceChange,
  onMinPriceChange,
}: Props) {
  function handleMinPriceChange(e: ChangeEvent<HTMLInputElement>) {
    const numericValue = e.target.value?.replace(/[^0-9.]/g, "");
    onMinPriceChange?.(numericValue);
  }

  function handleMaxPriceChange(e: ChangeEvent<HTMLInputElement>) {
    const numericValue = e.target.value?.replace(/[^0-9.]/g, "");
    onMaxPriceChange?.(numericValue);
  }

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-base">Minimum price</Label>
      <Input
        type="text"
        placeholder="₹ 0"
        value={minPrice ? formatAsCurrency(minPrice) : ""}
        onChange={handleMinPriceChange}
      />
      <Label className="text-base">Maximum price</Label>
      <Input
        type="text"
        placeholder="ထ"
        value={maxPrice ? formatAsCurrency(maxPrice) : ""}
        onChange={handleMaxPriceChange}
      />
    </div>
  );
}
