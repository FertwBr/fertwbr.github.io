import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useSmoothScroll} from '../../context/SmoothScrollContext';

/**
 * HashScrollHandler (Lenis compatible)
 *
 * Watches the URL and scrolls to the element with the given #ID as soon as it appears on the page.
 * Compatible with asynchronous rendering (Markdown) and Smooth Scroll (Lenis).
 */
export default function HashScrollHandler() {
    const {hash, pathname} = useLocation();
    const {lenis} = useSmoothScroll();

    useEffect(() => {
        if (!hash || !lenis) return;

        const id = hash.replace('#', '');
        const HEADER_OFFSET = 120;
        let attempts = 0;
        const maxAttempts = 50;

        const attemptScroll = () => {
            const element = document.getElementById(id);

            if (element) {
                lenis.resize();

                lenis.scrollTo(element, {
                    offset: -HEADER_OFFSET,
                    duration: 1.5,
                    force: true,
                    lock: true,
                    onComplete: () => {
                    }
                });
                return true;
            }
            return false;
        };

        const intervalId = setInterval(() => {
            attempts++;
            const success = attemptScroll();
            if (success || attempts >= maxAttempts) {
                clearInterval(intervalId);
            }
        }, 100);

        return () => clearInterval(intervalId);
    }, [hash, pathname, lenis]);

    return null;
}