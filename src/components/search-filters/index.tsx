import { Categories } from "./Categories";
import { SearchInput } from "./SearchInput";

export function SearchFilters() {
  return (
    <div className="px-4 lg:px-12 py-9 border-b flex flex-col gap-4 w-full">
      <SearchInput />
      <div className="hidden lg:block">
        <Categories />
      </div>
    </div>
  );
}

export function SearchFiltersSkeleton() {
  return (
    <div className="px-4 lg:px-12 py-9 border-b flex flex-col gap-4 w-full">
      <SearchInput disabled />
      <div className="hidden lg:block">
        <div className="h-11" />
      </div>
    </div>
  );
}
