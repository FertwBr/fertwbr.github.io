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
    const [bottomPos, setBottomPos] = useState(30);
    const [isTracking, setIsTracking] = useState(false);
    const [rightOffset, setRightOffset] = useState(30);

    useEffect(() => {
        let ticking = false;

        const calculatePosition = () => {
            setVisible(window.scrollY > 300);

            const footer = document.querySelector('footer, .footer-base');
            const isMobile = window.innerWidth <= 1000;

            const desiredBottom = (isShifted && isMobile) ? 180 : 30;
            let footerPush = 0;

            if (footer) {
                const footerRect = footer.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                if (footerRect.top < windowHeight) {
                    footerPush = (windowHeight - footerRect.top) + 24;
                }
            }

            if (footerPush > desiredBottom) {
                setBottomPos(footerPush);
                setIsTracking(true);
            } else {
                setBottomPos(desiredBottom);
                setIsTracking(false);
            }

            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(calculatePosition);
                ticking = true;
            }
        };

        window.addEventListener("scroll", onScroll, {passive: true});
        window.addEventListener("resize", calculatePosition, {passive: true});

        calculatePosition();

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", calculatePosition);
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
                    className="back-to-top-btn"
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: 0.8}}
                    transition={{type: "spring", stiffness: 400, damping: 30}}

                    style={{
                        right: rightOffset,
                        bottom: `${bottomPos}px`,
                        transition: isTracking
                            ? 'right 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), background 0.2s'
                            : 'bottom 0.4s cubic-bezier(0.2, 0, 0, 1), right 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), background 0.2s'
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