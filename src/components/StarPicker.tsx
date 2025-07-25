import { useState } from "react";
import { StarIcon } from "lucide-react";

interface Props {
  value: number;
  disabled?: boolean;
  className?: string;
  onChange: (value: number) => void;
}

export function StarPicker({ value, onChange, disabled, className }: Props) {
  const [hoverValue, setHoverValue] = useState(0);

  return (
    <div
      className={`flex items-center gap-3 ${disabled ? "opacity-50 cursor-not-allowed" : ""}  ${className}`}
    >
      {[1, 2, 3, 4, 5]?.map((star) => (
        <button
          key={star}
          type="button"
          disabled={disabled}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHoverValue(star)}
          onMouseLeave={() => setHoverValue(0)}
          className={`p-0.5 ${!disabled ? "hover:scale-105 transition cursor-pointer" : ""}`}
        >
          <StarIcon
            className={`${(hoverValue || value) >= star ? "fill-black stroke-black" : "stroke-black"} size-5`}
          />
        </button>
      ))}
    </div>
  );
}
