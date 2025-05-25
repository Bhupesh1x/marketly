import { RefObject } from "react";

interface Props {
  ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>;
}

export function useGetDropdownPosition({ ref }: Props) {
  function getDropdownPosition() {
    if (!ref?.current) return { top: 0, left: 0 };

    const rect = ref?.current?.getBoundingClientRect();

    const dropdownWidth = 240;

    // Calculate the initial position
    let left = rect.left + window.scrollX;
    const top = rect.bottom + window.scrollY;

    // Check if dropdown would go off the right edge of the viewport
    if (left + dropdownWidth > window.innerWidth) {
      // Align to the right edge of the button instead
      left = rect.right + window.screenX - dropdownWidth;

      // If still off-screen, align to the right edge of the viewport with some padding
      if (left < 0) {
        left = window.innerWidth - dropdownWidth - 16;
      }
    }

    // Ensure dropdown doesn't go off the left edge
    if (left < 0) {
      left = 16;
    }

    return { top, left };
  }

  return { getDropdownPosition };
}
