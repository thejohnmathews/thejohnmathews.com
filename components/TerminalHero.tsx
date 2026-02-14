"use client";

import { useState, useEffect } from "react";

const roles = [
  "embedded software engineer",
  "full stack developer",
];

export default function TerminalHero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const target = roles[currentRole];
    const timeout = isDeleting ? 30 : 60;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < target.length) {
          setDisplayText(target.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, timeout);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRole]);

  return (
    <div className="rounded-lg border border-border bg-card p-6 relative">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-3 w-3 rounded-full bg-destructive/60" />
        <div className="h-3 w-3 rounded-full bg-primary/40" />
        <div className="h-3 w-3 rounded-full bg-accent/60" />
        <span className="ml-2 font-mono text-[10px] text-muted-foreground">
          ~/overview
        </span>
      </div>
      <div className="font-mono text-sm space-y-2">
        <p className="text-foreground">
          <span className="text-primary">struct</span>{" "}
          <span className="text-foreground">Developer</span>{" "}
          <span className="text-foreground">{"{"}</span>
        </p>
        <p className="pl-4 text-foreground">
          <span className="text-primary">char*</span> name{" "}
          <span className="text-foreground">=</span>{" "}
          <span className="text-accent">&quot;john mathews&quot;</span>
          <span className="text-foreground">;</span>
        </p>
        <p className="pl-4 text-foreground">
          <span className="text-primary">char*</span> role{" "}
          <span className="text-foreground">=</span>{" "}
          <span className="text-accent">&quot;{displayText}&quot;</span>
          <span className="cursor-blink text-foreground">▐</span>
          <span className="text-foreground">;</span>
        </p>
        <p className="pl-4 text-foreground">
          <span className="text-primary">char*</span> stack<span className="text-foreground">[]</span>{" "}
          <span className="text-foreground">=</span>{" "}
          <span className="text-foreground">{"{"}</span>
          <span className="text-accent">&quot;C/C++&quot;</span>,{" "}
          <span className="text-accent">&quot;Embedded C&quot;</span>,{" "}
          <span className="text-accent">&quot;NextJS&quot;</span>,{" "}
          <span className="text-accent">&quot;TypeScript&quot;</span>
          <span className="text-foreground">{"}"}</span>
          <span className="text-foreground">;</span>
        </p>
        <p className="pl-4 text-foreground">
          <span className="text-primary">int</span> yearsExperience{" "}
          <span className="text-foreground">=</span>{" "}
          <span className="text-foreground">3</span>
          <span className="text-foreground">;</span>
        </p>
        <p className="text-foreground">{"};"}</p>
      </div>
    </div>
  );
}
