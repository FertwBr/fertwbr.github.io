import React, {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

/**
 * A floating action button that scrolls the page back to the top.
 * Automatically detects the footer element and translates upward to prevent overlapping,
 * applying a compensation offset to keep the spacing tight and visually balanced.
 * Also detects the right sidebar portal to avoid being hidden behind it.
 *
 * @param {Object} props
 * @param {string} [props.tooltip]
 * @param {boolean} [props.isShifted]
 * @returns {JSX.Element}
 */
export default function BackToTop({tooltip, isShifted}) {
    const [visible, setVisible] = useState(false);
    const [bottomOffset, setBottomOffset] = useState(0);
    const [rightOffset, setRightOffset] = useState(30);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 300);

            const footer = document.querySelector('footer');
            if (footer) {
                const footerRect = footer.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                if (footerRect.top < windowHeight) {
                    const visibleFooterHeight = windowHeight - footerRect.top;
                    const compensation = isShifted ? 64 : 16;
                    setBottomOffset(Math.max(0, visibleFooterHeight - compensation));
                } else {
                    setBottomOffset(0);
                }
            }
        };

        window.addEventListener("scroll", handleScroll, {passive: true});
        window.addEventListener("resize", handleScroll, {passive: true});

        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, [isShifted]);

    useEffect(() => {
        const checkSidebar = () => {
            const sidebar = document.getElementById('right-sidebar-portal');
            if (sidebar && window.innerWidth > 1000 && sidebar.childNodes.length > 0) {
                setRightOffset(350);
            } else {
                setRightOffset(30);
            }
        };

        checkSidebar();
        window.addEventListener("resize", checkSidebar, {passive: true});

        const sidebar = document.getElementById('right-sidebar-portal');
        let observer;

        if (sidebar) {
            observer = new MutationObserver(checkSidebar);
            observer.observe(sidebar, {childList: true});
        }

        return () => {
            window.removeEventListener("resize", checkSidebar);
            if (observer) observer.disconnect();
        };
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    className={`back-to-top-btn ${isShifted ? 'shifted' : ''}`}
                    initial={{opacity: 0, scale: 0.8, y: 0}}
                    animate={{opacity: 1, scale: 1, y: -bottomOffset}}
                    exit={{opacity: 0, scale: 0.8, y: -bottomOffset}}
                    transition={{type: "spring", stiffness: 400, damping: 30}}
                    style={{
                        right: rightOffset,
                        transition: 'right 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.2s, background 0.2s'
                    }}
                    onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}
                    title={tooltip || "Back to Top"}
                >
                    <span className="material-symbols-outlined">arrow_upward</span>
                </motion.button>
            )}
        </AnimatePresence>
    );
}