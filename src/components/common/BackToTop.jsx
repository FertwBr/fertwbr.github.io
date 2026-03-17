import React, {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

/**
 * A floating action button that scrolls the page back to the top.
 *
 * @param {Object} props - Component props.
 * @param {string} [props.tooltip] - Optional tooltip text.
 * @param {boolean} [props.isShifted] - If true, shifts the button higher to avoid overlapping other elements (like mobile bottom navigation).
 * @returns {JSX.Element} The rendered button.
 */
export default function BackToTop({tooltip, isShifted}) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => setVisible(window.scrollY > 300);
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    className={`back-to-top-btn ${isShifted ? 'shifted' : ''}`}
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: 0.8}}
                    onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}
                    title={tooltip || "Back to Top"}
                >
                    <span className="material-symbols-outlined">arrow_upward</span>
                </motion.button>
            )}
        </AnimatePresence>
    );
}