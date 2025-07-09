import { Checkbox } from "@/components/ui/checkbox";
import { DEFAULT_LIMIT } from "@/constants";
import { useTRPC } from "@/trpc/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";

interface Props {
  value: string[] | null;
  onTagChange: (value: string[]) => void;
}

export function TagsFilter({ value, onTagChange }: Props) {
  const trpc = useTRPC();
  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery(
      trpc.tags.getMany.infiniteQueryOptions(
        {
          limit: DEFAULT_LIMIT,
        },
        {
          getNextPageParam: (lastPage) => {
            return lastPage?.docs?.length ? lastPage?.nextPage : undefined;
          },
        }
      )
    );

  function handleCheckboxChange(tagName: string) {
    if (value?.includes(tagName)) {
      onTagChange([...(value ?? []).filter((tag) => tag !== tagName)]);
    } else {
      onTagChange([...(value ?? []), tagName]);
    }
  }

  return (
    <div className="flex flex-col gap-y-2">
      {isLoading ? (
        <div className="py-10">
          <Loader2Icon className="size-5 animate-spin mx-auto" />
        </div>
      ) : (
        data?.pages?.map((page) =>
          page?.docs?.map((tag) => (
            <div key={tag.id} className="flex items-center justify-between">
              <p className="font-medium">{tag?.name || ""}</p>
              <Checkbox
                checked={value?.includes(tag?.name)}
                onCheckedChange={() => handleCheckboxChange(tag?.name)}
              />
            </div>
          ))
        )
      )}

      {!!hasNextPage && !isLoading ? (
        <button
          disabled={isFetchingNextPage}
          className="underline text-start cursor-pointer disabled:opacity-50"
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage ? "Loading..." : "Load more..."}
        </button>
      ) : null}
    </div>
  );
}
