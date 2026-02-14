// === NaaS Type Definitions ===

/** API response from /no endpoint */
export interface NoResponse {
  reason: string;
}

/** API error response */
export interface ApiError {
  error: string;
  message: string;
  retryAfter?: number;
}

/** Available rejection categories */
export type Category =
  | 'all'
  | 'professional'
  | 'personal'
  | 'student'
  | 'developer'
  | 'savage'
  | 'polite'
  | 'dramatic';

/** Theme mode */
export type Theme = 'light' | 'dark' | 'system';

/** Share platform options */
export type SharePlatform = 'twitter' | 'whatsapp' | 'linkedin' | 'copy-link';

/** Generator state managed by useNoGenerator hook */
export interface GeneratorState {
  reason: string;
  loading: boolean;
  error: string | null;
  category: Category;
}

/** Clipboard hook return type */
export interface ClipboardState {
  copied: boolean;
  copyToClipboard: (text: string) => Promise<void>;
}
