import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSmoothScroll } from '../../context/SmoothScrollContext';

/**
 * ScrollToTop Component.
 * Handles scrolling the window to the top on route changes.
 * Uses useLayoutEffect to prevent visual flickering.
 * Disables browser's native scroll restoration to rely on Lenis/App logic.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  const { lenis } = useSmoothScroll();

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0);

    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true, lock: false });
    }
  }, [pathname, lenis]);

  return null;
}