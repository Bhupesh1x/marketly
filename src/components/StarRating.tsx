import { StarIcon } from "lucide-react";

interface Props {
  rating: number;
  text?: string;
  className?: string;
  iconClassname?: string;
}

const MIN_RATING = 0;
const MAX_RATING = 5;

export function StarRating({ text, rating, className, iconClassname }: Props) {
  const safeRating = Math.max(MIN_RATING, Math.min(rating, MAX_RATING));

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {Array.from({ length: 5 })?.map((_, index) => (
        <StarIcon
          key={index}
          className={`size-4 ${index < safeRating ? "fill-black" : ""} ${iconClassname}`}
        />
      ))}
      {!!text && <p>{text}</p>}
    </div>
  );
}
