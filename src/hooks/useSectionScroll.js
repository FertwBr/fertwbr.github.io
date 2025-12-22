import { useState, useCallback } from 'react';
import { useSmoothScroll } from '../context/SmoothScrollContext';

/**
 * useSectionScroll hook.
 *
 * Manages the active section id and provides a `scrollToSection` helper.
 * Uses `lenis` from SmoothScrollContext when available, otherwise falls back
 * to native `window.scrollTo`.
 *
 * @param {string} [initialSection=''] Initial active section id.
 * @returns {{ activeSection: string, setActiveSection: function, scrollToSection: function }} Hook API
 */
export function useSectionScroll(initialSection = '') {
    const { lenis } = useSmoothScroll();
    const [activeSection, setActiveSection] = useState(initialSection);

    const scrollToSection = useCallback((id) => {
        const offset = 120;
        const element = document.getElementById(id);

        if (element) {
            setActiveSection(id);

            if (lenis) {
                lenis.scrollTo(element, {
                    offset: -offset,
                    duration: 1.5,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            } else {
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: elementPosition - offset,
                    behavior: 'smooth'
                });
            }
        }
    }, [lenis]);

    return { activeSection, setActiveSection, scrollToSection };
}