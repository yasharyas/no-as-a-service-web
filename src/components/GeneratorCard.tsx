'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface GeneratorCardProps {
  reason: string;
  loading: boolean;
}

export default function GeneratorCard({ reason, loading }: GeneratorCardProps) {
  return (
    <div className="mx-auto w-full max-w-2xl px-4">
      <div className="relative rounded-2xl border border-border bg-card p-8 shadow-lg sm:p-10">
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
  );
}
