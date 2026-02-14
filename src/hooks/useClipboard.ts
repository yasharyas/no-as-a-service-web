'use client';

import { useState, useCallback, useRef } from 'react';
import { COPY_RESET_DELAY_MS } from '@/lib/constants';
import type { ClipboardState } from '@/types';

export function useClipboard(): ClipboardState {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      // Modern clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      setCopied(true);

      // Clear existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Auto-reset after delay
      timerRef.current = setTimeout(() => {
        setCopied(false);
        timerRef.current = null;
      }, COPY_RESET_DELAY_MS);
    } catch (err) {
      console.error('Failed to copy:', err);
      setCopied(false);
    }
  }, []);

  return { copied, copyToClipboard };
}
