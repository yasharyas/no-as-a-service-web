'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center px-4 pt-16 pb-8 sm:pt-24 sm:pb-12 text-center overflow-hidden">
      {/* Subtle animated gradient background */}
      <div
        className="absolute inset-0 -z-10 opacity-30 dark:opacity-20"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, var(--primary) 0%, transparent 60%)',
        }}
      />

      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Say <span className="text-primary">No</span>. Creatively.
      </motion.h1>

      <motion.p
        className="mt-4 max-w-xl text-lg text-muted-foreground sm:text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        Generate creative rejection reasons instantly. Copy, share, and
        customize witty ways to say no.
      </motion.p>
    </section>
  );
}
