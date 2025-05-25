import { SearchIcon } from "lucide-react";

import { Input } from "../ui/input";

interface Props {
  disabled?: boolean;
}

export function SearchInput({ disabled }: Props) {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      <Input
        placeholder="Search products"
        className="pl-8"
        disabled={disabled}
      />
    </div>
  );
}
