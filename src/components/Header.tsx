'use client';

import { Github } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { APP_META } from '@/lib/constants';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Logo / Brand */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">🚫</span>
          <span className="text-lg font-semibold tracking-tight">
            {APP_META.title}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a
            href={APP_META.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-muted transition-colors"
            aria-label="View source on GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
