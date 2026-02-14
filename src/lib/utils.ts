import { type ClassValue, clsx } from 'clsx';

/** Merge Tailwind class names safely (lightweight — no twMerge needed yet) */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Sanitize text to prevent XSS when used in URLs */
export function sanitizeText(text: string): string {
  return text
    .replace(/[<>"'&]/g, (char) => {
      const entities: Record<string, string> = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '&': '&amp;',
      };
      return entities[char] || char;
    })
    .slice(0, 500); // limit length
}

/** Decode and validate a reason from URL parameter */
export function decodeReasonParam(encoded: string): string | null {
  try {
    const decoded = decodeURIComponent(encoded);
    if (decoded.length > 500) return null;
    return decoded;
  } catch {
    return null;
  }
}

/** Format a shareable URL with reason */
export function buildShareableUrl(reason: string, baseUrl: string): string {
  return `${baseUrl}/?reason=${encodeURIComponent(reason)}`;
}

/** Debounce a function */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
