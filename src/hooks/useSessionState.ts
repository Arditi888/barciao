import { useEffect, useState } from 'react';

/** State that survives navigation within a visit but never leaks into
 *  the next one — used to remember the menu category being browsed. */
export function useSessionState<T extends string>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initial;
    try {
      return (window.sessionStorage.getItem(key) as T | null) ?? initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      window.sessionStorage.setItem(key, value);
    } catch {
      // Private browsing modes can refuse storage; the UI still works.
    }
  }, [key, value]);

  return [value, setValue] as const;
}
