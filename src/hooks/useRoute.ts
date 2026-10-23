import { useCallback, useEffect, useState } from 'react';
import type { CaseSlug } from '../content/types';
import { caseHash, parseHash, type Route } from '../lib/route';

export function useRoute(): { route: Route; openCase(slug: CaseSlug): void; closeCase(): void } {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));
  useEffect(() => {
    const on = () => setRoute(parseHash(window.location.hash));
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  const openCase = useCallback((slug: CaseSlug) => {
    window.location.hash = caseHash(slug);
  }, []);
  const closeCase = useCallback(() => {
    // replaceState doesn't fire hashchange; notify every useRoute instance (App + overlay)
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }, []);
  return { route, openCase, closeCase };
}
