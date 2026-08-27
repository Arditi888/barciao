import { useEffect } from 'react';

/** Sets the document title and description for the active route.
 *  Imperative rather than rendered, so it can never end up competing
 *  with the tags already in index.html. */
export function useSeo(title: string, description: string): void {
  useEffect(() => {
    document.title = title;

    const set = (selector: string, attribute: string, value: string) => {
      document.querySelector(selector)?.setAttribute(attribute, value);
    };

    set('meta[name="description"]', 'content', description);
    set('meta[property="og:title"]', 'content', title);
    set('meta[property="og:description"]', 'content', description);
    set('meta[name="twitter:title"]', 'content', title);
    set('meta[name="twitter:description"]', 'content', description);
  }, [title, description]);
}
