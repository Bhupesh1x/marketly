import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";

interface Item {
  title: string;
  href: string;
}

interface Props {
  items: Item[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileNavbar({ items, open, onOpenChange }: Props) {
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader className="border-b border-black">
          <SheetTitle className="text-base font-medium">Menu</SheetTitle>
        </SheetHeader>

        <div className="h-full flex flex-col overflow-y-auto">
          {items.map((route) => (
            <Button
              asChild
              key={route.href}
              variant={pathname === route.href ? "default" : "ghost"}
              className="!text-left flex justify-start rounded-none p-8 text-base"
              onClick={() => onOpenChange(false)}
            >
              <Link href={route.href} className="!text-left">
                {route.title}
              </Link>
            </Button>
          ))}

          <div className="border-t border-black">
            <Button
              asChild
              variant="ghost"
              className="!text-left flex justify-start rounded-none p-8 text-base"
              onClick={() => onOpenChange(false)}
            >
              <Link href="/sign-in" className="!text-left">
                Log in
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="!text-left flex justify-start rounded-none p-8 text-base"
              onClick={() => onOpenChange(false)}
            >
              <Link href="/sign-up" className="!text-left">
                Start selling
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
