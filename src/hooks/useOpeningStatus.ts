import { useEffect, useState } from 'react';
import type { OpeningStatus } from '../types';
import { getOpeningStatus } from '../utils/openingHours';

/** Live opening status, re-evaluated every half minute so a page left
 *  open across closing time updates itself. */
export function useOpeningStatus(): OpeningStatus {
  const [status, setStatus] = useState<OpeningStatus>(() => getOpeningStatus());

  useEffect(() => {
    const tick = () => setStatus(getOpeningStatus());
    tick();

    const interval = window.setInterval(tick, 30_000);
    const onVisible = () => {
      if (document.visibilityState === 'visible') tick();
    };

    document.addEventListener('visibilitychange', onVisible);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  return status;
}
