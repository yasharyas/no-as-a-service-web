'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { fetchNoReason, fetchNoReasonByCategory } from '@/lib/api';
import { GENERATE_COOLDOWN_MS, PREFETCH_COUNT, FALLBACK_REASONS, FALLBACK_POOL_SIZE } from '@/lib/constants';
import type { Category, GeneratorState } from '@/types';

export function useNoGenerator() {
  const [state, setState] = useState<GeneratorState>({
    reason: '',
    loading: false,
    error: null,
    category: 'all',
  });

  const cooldownRef = useRef(false);
  const cacheRef = useRef<string[]>([]);
  const fallbackPoolRef = useRef<string[]>([]);

  // Pre-fetch reasons on mount
  useEffect(() => {
    const prefetch = async () => {
      try {
        const promises = Array.from({ length: PREFETCH_COUNT }, () => fetchNoReason());
        const results = await Promise.allSettled(promises);
        const reasons = results
          .filter((r): r is PromiseFulfilledResult<{ reason: string }> => r.status === 'fulfilled')
          .map((r) => r.value.reason);

        cacheRef.current = reasons;

        if (reasons.length > 0) {
          setState((prev) => ({ ...prev, reason: reasons[0] }));
          cacheRef.current = reasons.slice(1);
          fallbackPoolRef.current = [...reasons];
        }
      } catch {
        // Use static fallback on pre-fetch failure
        const fallback = FALLBACK_REASONS[Math.floor(Math.random() * FALLBACK_REASONS.length)];
        setState((prev) => ({ ...prev, reason: fallback }));
      }
    };

    prefetch();
  }, []);

  const generate = useCallback(async () => {
    // Throttle check
    if (cooldownRef.current || state.loading) return;

    // Use cached reason if available
    if (cacheRef.current.length > 0) {
      const cached = cacheRef.current.shift()!;
      setState((prev) => ({ ...prev, reason: cached, error: null }));

      // Background refill when cache is depleted
      if (cacheRef.current.length === 0) {
        fetchNoReason()
          .then((r) => cacheRef.current.push(r.reason))
          .catch(() => {});
      }
      return;
    }

    // Set cooldown
    cooldownRef.current = true;
    setTimeout(() => {
      cooldownRef.current = false;
    }, GENERATE_COOLDOWN_MS);

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const data =
        state.category === 'all'
          ? await fetchNoReason()
          : await fetchNoReasonByCategory(state.category);

      setState((prev) => ({ ...prev, reason: data.reason, loading: false }));

      // Add to fallback pool
      if (fallbackPoolRef.current.length < FALLBACK_POOL_SIZE) {
        fallbackPoolRef.current.push(data.reason);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';

      // Try fallback pool
      if (fallbackPoolRef.current.length > 0) {
        const index = Math.floor(Math.random() * fallbackPoolRef.current.length);
        setState((prev) => ({
          ...prev,
          reason: fallbackPoolRef.current[index],
          loading: false,
          error: null,
        }));
      } else {
        // Use static fallback
        const fallback = FALLBACK_REASONS[Math.floor(Math.random() * FALLBACK_REASONS.length)];
        setState((prev) => ({
          ...prev,
          reason: fallback,
          loading: false,
          error: errorMessage,
        }));
      }
    }
  }, [state.loading, state.category]);

  const setCategory = useCallback((category: Category) => {
    setState((prev) => ({ ...prev, category }));
    cacheRef.current = []; // Clear cache on category change
  }, []);

  const setReason = useCallback((reason: string) => {
    setState((prev) => ({ ...prev, reason, error: null }));
  }, []);

  return {
    reason: state.reason,
    loading: state.loading,
    error: state.error,
    category: state.category,
    generate,
    setCategory,
    setReason,
  };
}
