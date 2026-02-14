import type { NoResponse } from '@/types';
import { PROXY_ENDPOINT } from './constants';

/**
 * Fetch a random rejection reason from the edge proxy.
 * Uses the local /api/no proxy to avoid CORS and add caching.
 */
export async function fetchNoReason(): Promise<NoResponse> {
  const res = await fetch(`${PROXY_ENDPOINT}?_t=${Date.now()}`, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
    cache: 'no-store',
  });

  if (!res.ok) {
    if (res.status === 429) {
      throw new Error('Too many Nos. Try again shortly.');
    }
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

/**
 * Fetch a rejection reason by category.
 * Falls back to the default if the category is invalid.
 */
export async function fetchNoReasonByCategory(
  category: string,
): Promise<NoResponse> {
  const sep = category === 'all' ? '?' : '&';
  const base =
    category === 'all'
      ? PROXY_ENDPOINT
      : `${PROXY_ENDPOINT}?category=${encodeURIComponent(category)}`;
  const endpoint = `${base}${sep}_t=${Date.now()}`;

  const res = await fetch(endpoint, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
    cache: 'no-store',
  });

  if (!res.ok) {
    if (res.status === 429) {
      throw new Error('Too many Nos. Try again shortly.');
    }
    // Invalid category — fallback to default
    if (res.status === 404) {
      return fetchNoReason();
    }
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}
