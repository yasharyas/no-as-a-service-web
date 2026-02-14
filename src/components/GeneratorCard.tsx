'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { GlowingEffect } from '@/components/ui/glowing-effect';

interface GeneratorCardProps {
  reason: string;
  loading: boolean;
}

export default function GeneratorCard({ reason, loading }: GeneratorCardProps) {
  return (
    <div className="mx-auto w-full max-w-2xl px-4">
      <div className="relative rounded-2xl border-[0.75px] border-border bg-card p-2 shadow-lg sm:p-3" role="region" aria-label="Generated rejection reason" aria-live="polite">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative overflow-hidden rounded-xl border-[0.75px] border-border bg-card p-6 sm:p-8">
        <div className="min-h-[120px] flex items-center justify-center">
          {loading ? (
            /* Skeleton shimmer loader */
            <div className="w-full space-y-3 animate-pulse">
              <div className="h-4 bg-muted rounded-md w-3/4 mx-auto" />
              <div className="h-4 bg-muted rounded-md w-1/2 mx-auto" />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.p
                key={reason}
                className="text-xl sm:text-2xl font-medium text-card-foreground text-center leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                &ldquo;{reason}&rdquo;
              </motion.p>
            </AnimatePresence>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
