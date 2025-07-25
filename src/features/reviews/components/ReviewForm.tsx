import z from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StarPicker } from "@/components/StarPicker";

import { ReviewGetOneOutput } from "../types";

interface Props {
  initialData: ReviewGetOneOutput;
  productId: string;
}

const formSchema = z.object({
  description: z.string().min(1, "Description is required"),
  ratings: z.number().min(1).max(5),
});

export function ReviewForm({ initialData, productId }: Props) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const [isPreview, setIsPreview] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description ?? "",
      ratings: initialData?.ratings ?? undefined,
    },
  });

  const addReview = useMutation(trpc.reviews.create.mutationOptions());
  const updateReview = useMutation(trpc.reviews.update.mutationOptions());

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!!initialData) {
      updateReview.mutate(
        {
          reviewId: initialData.id,
          ratings: values.ratings,
          description: values.description,
        },
        {
          onSuccess: () => {
            toast.success("Review added");
            queryClient.invalidateQueries(
              trpc.reviews.getOne.queryFilter({
                productId,
              })
            );
            setIsPreview(true);
          },
          onError: (error) => {
            toast.error(error?.message || "Failed to add review");
            setIsPreview(true);
          },
        }
      );
    } else {
      addReview.mutate(
        {
          productId,
          ratings: values.ratings,
          description: values.description,
        },
        {
          onSuccess: () => {
            toast.success("Review updated");
            queryClient.invalidateQueries(
              trpc.reviews.getOne.queryFilter({
                productId,
              })
            );
            setIsPreview(true);
          },
          onError: (error) => {
            toast.error(error?.message || "Failed to update review");
            setIsPreview(true);
          },
        }
      );
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h1 className="font-medium">Your rating:</h1>

        <FormField
          name="ratings"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <StarPicker
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isPreview}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  disabled={isPreview}
                  placeholder="Want to leave a written review?"
                  {...field}
                  className="resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!isPreview && (
          <Button
            disabled={addReview?.isPending || updateReview?.isPending}
            type="submit"
            variant="default"
          >
            Submit
          </Button>
        )}
      </form>
      {isPreview && (
        <Button
          disabled={addReview?.isPending || updateReview?.isPending}
          type="button"
          variant="elevated"
          className="mt-4"
          onClick={() => setIsPreview(false)}
        >
          Edit
        </Button>
      )}
    </Form>
  );
}
