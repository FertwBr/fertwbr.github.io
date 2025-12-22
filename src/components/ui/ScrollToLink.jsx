import React from 'react';
import { useSmoothScroll } from '../../context/SmoothScrollContext';

/**
 * A wrapper component for anchor tags that implements Lenis smooth scrolling.
 * Replaces standard anchor tag behavior to ensure consistent easing across the app.
 *
 * @param {Object} props - Component props.
 * @param {string} props.href - The target ID selector (e.g., "#projects").
 * @param {React.ReactNode} props.children - The content to be rendered inside the link.
 * @param {string} [props.className] - Optional CSS class names.
 * @param {Object} [props.style] - Optional inline styles.
 * @returns {JSX.Element} An anchor tag with intercepted click behavior.
 */
export default function ScrollToLink({ href, children, className, style }) {
    const { lenis } = useSmoothScroll();

    /**
     * Intercepts the click event to perform smooth scrolling via Lenis.
     *
     * @param {React.MouseEvent} e - The click event.
     */
    const handleClick = (e) => {
        e.preventDefault();
        if (lenis) {
            lenis.scrollTo(href, {
                duration: 1.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
        } else {
            const element = document.querySelector(href);
            element?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <a
            href={href}
            onClick={handleClick}
            className={className}
            style={style}
        >
            {children}
        </a>
    );
}