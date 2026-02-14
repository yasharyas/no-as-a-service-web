'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { GlowingEffect } from '@/components/ui/glowing-effect';

export default function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <div className="relative rounded-lg border-[0.75px] border-transparent p-0.5">
      <GlowingEffect
        spread={20}
        glow={true}
        disabled={false}
        proximity={32}
        inactiveZone={0.01}
        borderWidth={2}
      />
      <button
        onClick={toggleTheme}
        className="relative p-2 rounded-md bg-secondary text-secondary-foreground hover:bg-muted transition-colors"
        aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {resolvedTheme === 'dark' ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}
