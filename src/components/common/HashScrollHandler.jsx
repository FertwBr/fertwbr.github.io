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
    const {hash, pathname} = useLocation(); // Adicionei pathname para reiniciar ao mudar de página
    const {lenis} = useSmoothScroll();

    useEffect(() => {
        if (!hash) return;

        const id = hash.replace('#', '');

        const HEADER_OFFSET = 120;

        const attemptScroll = () => {
            const element = document.getElementById(id);

            if (element) {
                if (lenis) {
                    lenis.scrollTo(element, {
                        offset: -HEADER_OFFSET,
                        duration: 1.5,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                        lock: false,
                        force: true
                    });
                } else {
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - HEADER_OFFSET;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
                return true;
            }
            return false;
        };

        if (attemptScroll()) return;

        let attempts = 0;
        const intervalId = setInterval(() => {
            attempts++;
            const success = attemptScroll();
            if (success || attempts >= 40) {
                clearInterval(intervalId);
            }
        }, 100);

        return () => clearInterval(intervalId);
    }, [hash, pathname, lenis]);

    return null;
}