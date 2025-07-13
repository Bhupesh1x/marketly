import Link from "next/link";

export function Footer() {
  return (
    <nav className="h-20 border-t bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex items-center h-full px-4 lg:px-12">
        <p className="font-medium">Powered by</p>
        <Link href="/">
          <h1 className="text-xl font-semibold tracking-wide cursor-pointer pl-1">
            Marketly
          </h1>
        </Link>
      </div>
    </nav>
  );
}
