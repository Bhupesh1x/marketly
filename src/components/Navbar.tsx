"use client";

import Link from "next/link";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import { Button } from "./ui/button";
import { MobileNavbar } from "./MobileNavbar";

const navRoutes = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Features",
    href: "/features",
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useState(false);

  const trpc = useTRPC();
  const { data: session, isLoading } = useQuery(
    trpc.auth.session.queryOptions()
  );

  return (
    <nav className="h-20 flex items-center justify-between border-b border-black shadow">
      <Link href="/">
        <h1 className="text-5xl font-medium px-4 cursor-pointer">Marketly</h1>
      </Link>

      <div className="hidden lg:flex items-center gap-4">
        {navRoutes.map((route) => (
          <Button
            asChild
            key={route.href}
            variant={pathname === route.href ? "default" : "ghost"}
            className="rounded-full py-6 px-6 text-base border-none"
          >
            <Link href={route.href}>{route.title}</Link>
          </Button>
        ))}
      </div>

      {session?.user ? (
        <Button
          disabled={isLoading}
          variant="ghost"
          asChild
          className="hidden lg:flex px-12 bg-black text-white h-full rounded-none font-medium text-base hover:bg-purple-400 hover:text-black transition"
        >
          <Link href="/admin">Dashboard</Link>
        </Button>
      ) : (
        <div className="hidden lg:flex items-center border-l border-black h-full">
          <Button
            disabled={isLoading}
            variant="ghost"
            asChild
            className="px-12 h-full rounded-none text-base font-medium hover:bg-purple-400 hover:text-black transition"
          >
            <Link href="/sign-in">Log in</Link>
          </Button>
          <Button
            disabled={isLoading}
            variant="ghost"
            asChild
            className="px-12 bg-black text-white h-full rounded-none font-medium text-base hover:bg-purple-400 hover:text-black transition"
          >
            <Link href="/sign-up">Start selling</Link>
          </Button>
        </div>
      )}

      <div className="flex lg:hidden items-center px-2">
        <Button
          variant="ghost"
          className="size-12"
          onClick={() => setIsMobileNavbarOpen(true)}
        >
          <MenuIcon className="size-8" />
        </Button>
      </div>
      <MobileNavbar
        open={isMobileNavbarOpen}
        onOpenChange={setIsMobileNavbarOpen}
        items={navRoutes}
        session={session}
        isLoading={isLoading}
      />
    </nav>
  );
}
