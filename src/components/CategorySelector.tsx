'use client';

import { CATEGORIES } from '@/lib/constants';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import type { Category } from '@/types';

interface CategorySelectorProps {
  selected: Category;
  onSelect: (category: Category) => void;
}

export default function CategorySelector({ selected, onSelect }: CategorySelectorProps) {
  return (
    <div className="mx-auto mt-8 max-w-2xl px-4">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {CATEGORIES.map(({ label, value }) => (
          <div key={value} className="relative rounded-full border-[0.75px] border-transparent p-0.5">
            {selected === value && (
              <GlowingEffect
                spread={20}
                glow={true}
                disabled={false}
                proximity={32}
                inactiveZone={0.01}
                borderWidth={2}
              />
            )}
            <button
              onClick={() => onSelect(value)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all ${
                selected === value
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-secondary text-secondary-foreground hover:bg-muted'
              }`}
              aria-label={`Filter by ${label} category`}
              aria-pressed={selected === value}
            >
              {label}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
