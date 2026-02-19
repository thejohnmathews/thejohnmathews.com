"use client";

import {Mail} from "lucide-react";
import Link from "next/link";
import {FaGithub, FaLinkedin} from "react-icons/fa";
import {useTranslations} from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="mt-20 border-t border-border pt-6">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-6">
          <Link
            href="https://github.com/thejohnmathews"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <FaGithub className="h-4 w-4" />
            <span className="font-mono">github</span>
          </Link>
          <Link
            href="https://linkedin.com/in/thejohnmathews"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <FaLinkedin className="h-4 w-4" />
            <span className="font-mono">linkedin</span>
          </Link>
          <Link
            href="mailto:thejohnmathews@gmail.com"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="h-4 w-4" />
            <span className="font-mono">email</span>
          </Link>
        </div>

        <div className="text-center">
          <p className="font-mono text-xs text-muted-foreground">
            <span className="text-primary">// </span>
            {t('builtWith')}
            <span className="text-primary"> — </span>
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
