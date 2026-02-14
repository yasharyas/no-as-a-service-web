import type { Category } from '@/types';

/** Base URL for the NaaS API */
export const API_BASE_URL = 'https://naas.isalman.dev';

/** Local edge proxy endpoint */
export const PROXY_ENDPOINT = '/api/no';

/** Rate limit: requests per minute */
export const RATE_LIMIT = 120;

/** Cooldown between generate requests (ms) */
export const GENERATE_COOLDOWN_MS = 500;

/** Number of reasons to pre-fetch on load */
export const PREFETCH_COUNT = 3;

/** Copy confirmation auto-reset delay (ms) */
export const COPY_RESET_DELAY_MS = 2000;

/** Cache duration for edge proxy (seconds) */
export const EDGE_CACHE_DURATION = 60;

/** Max reasons to store in fallback pool */
export const FALLBACK_POOL_SIZE = 50;

/** Available rejection categories */
export const CATEGORIES: { label: string; value: Category }[] = [
  { label: 'All', value: 'all' },
  { label: 'Professional', value: 'professional' },
  { label: 'Personal', value: 'personal' },
  { label: 'Student', value: 'student' },
  { label: 'Developer', value: 'developer' },
  { label: 'Savage', value: 'savage' },
  { label: 'Polite', value: 'polite' },
  { label: 'Dramatic', value: 'dramatic' },
];

/** Fallback reasons when API is unreachable */
export const FALLBACK_REASONS = [
  "No. Just... no.",
  "I'd rather organize my sock drawer.",
  "My calendar says no, and honestly, so do I.",
  "I'm on a strict 'no' diet right now.",
  "That's a hard pass from me, chief.",
];

/** Social share URL templates */
export const SHARE_URLS = {
  twitter: (text: string) =>
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent('https://naas.isalman.dev')}`,
  whatsapp: (text: string) =>
    `https://wa.me/?text=${encodeURIComponent(text)}`,
  linkedin: (text: string) =>
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://naas.isalman.dev')}&summary=${encodeURIComponent(text)}`,
} as const;

/** App metadata */
export const APP_META = {
  title: 'No-as-a-Service',
  tagline: 'Say No. Creatively.',
  description: 'Generate creative rejection reasons instantly. Copy, share, and customize witty ways to say no.',
  url: 'https://naas.isalman.dev',
  github: 'https://github.com/yasharyas/no-as-a-service-web',
} as const;
