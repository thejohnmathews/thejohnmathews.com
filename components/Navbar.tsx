"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const mainNavItems = [
  { label: "home", path: "/" },
  { label: "projects", path: "/projects" },
  { label: "experience", path: "/experience" },
];

const personalNavItems = [
  { label: "personal", path: "/personal" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-14 items-center justify-between px-6">
        <Link
          href="/"
          className="font-mono text-sm font-semibold text-primary tracking-wider hover:text-primary/80 transition-colors"
        >
          ~/johnmathews.dev
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {mainNavItems.map((item) => (
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
          <div className="h-4 w-px bg-border" />
          {personalNavItems.map((item) => (
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
          <div className="h-4 w-px bg-border" />
          <ThemeToggle />
        </div>

        {/* mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-foreground hover:text-primary transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-3">
            {/* Main navigation items */}
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-mono text-xs tracking-wide transition-colors hover:text-primary ${
                  pathname === item.path ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}();
              </Link>
            ))}
            <div className="h-px w-full bg-border my-1" />
            {personalNavItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-mono text-xs tracking-wide transition-colors hover:text-primary ${
                  pathname === item.path ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}();
              </Link>
            ))}
            <div className="h-px w-full bg-border my-1" />
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
