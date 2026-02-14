"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "home", path: "/" },
  { label: "projects", path: "/projects" },
  { label: "experience", path: "/experience" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-14 items-center justify-between px-6">
        <Link
          href="/"
          className="font-mono text-sm font-semibold text-primary tracking-wider hover:text-primary/80 transition-colors"
        >
          ~/johnmathews.dev
        </Link>
        <div className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`font-mono text-xs tracking-wide transition-colors hover:text-primary ${
                pathname === item.path ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.label}();
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
