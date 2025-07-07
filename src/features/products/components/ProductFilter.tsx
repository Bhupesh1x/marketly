"use client";

import { useState } from "react";
import { ChevronRightIcon, ChevronUpIcon } from "lucide-react";

interface Props {
  title: string;
  className?: string;
  children: React.ReactNode;
}

export function ProductFilter({ title, children, className }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  function toogleOpen() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div className={`border-b p-3 flex flex-col gap-2 ${className}`}>
      <div
        className="flex items-center justify-between select-none cursor-pointer"
        onClick={toogleOpen}
      >
        <p className="font-medium">{title}</p>
        {isOpen ? (
          <ChevronUpIcon className="size-5" />
        ) : (
          <ChevronRightIcon className="size-5" />
        )}
      </div>

      {isOpen && children}
    </div>
  );
}
