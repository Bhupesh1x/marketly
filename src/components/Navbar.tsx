"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "./ui/button";

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

  return (
    <nav className="h-20 flex items-center justify-between border-b border-black shadow">
      <Link href="/">
        <h1 className="text-5xl font-medium px-4 cursor-pointer">Marketly</h1>
      </Link>

      <div className="hidden md:flex items-center gap-4">
        {navRoutes.map((route) => (
          <Button
            asChild
            key={route.href}
            variant={pathname === route.href ? "default" : "ghost"}
            className="rounded-full"
          >
            <Link href={route.href}>{route.title}</Link>
          </Button>
        ))}
      </div>

      <div className="hidden md:flex items-center border-l border-black h-full">
        <Button
          variant="ghost"
          asChild
          className="px-12 h-full rounded-none font-medium hover:bg-purple-400 hover:text-black transition"
        >
          <Link href="/sign-in">Log in</Link>
        </Button>
        <Button
          variant="ghost"
          asChild
          className="px-12 bg-black text-white h-full rounded-none font-medium hover:bg-purple-400 hover:text-black transition"
        >
          <Link href="/sign-up">Start selling</Link>
        </Button>
      </div>
    </nav>
  );
}
