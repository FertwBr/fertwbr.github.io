import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavbarMobile from './NavbarMobile';
import NavbarTablet from './NavbarTablet';
import TopBarDesktop from './TopBarDesktop';
import SidebarDesktop from './SidebarDesktop';

const m3Variants = {
    initial: { opacity: 0, y: -15, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -10, filter: 'blur(4px)' }
};

const m3Transition = { duration: 0.4, ease: [0.2, 0, 0, 1] };

/**
 * Main navigation orchestrator.
 * Renders the appropriate navigation component based on window width
 * with smooth Material 3 Expressive transitions.
 *
 * @param {Object} props
 * @returns {JSX.Element}
 */
export default function AppNavbar(props) {
    const isMobile = props.windowWidth < 768;
    const isTablet = props.windowWidth >= 768 && props.windowWidth <= 1000;
    const isDesktop = props.windowWidth > 1000;

    return (
        <AnimatePresence>
            {isMobile && (
                <motion.div
                    key="mobile-nav"
                    initial="initial" animate="animate" exit="exit"
                    variants={m3Variants} transition={m3Transition}
                    style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 200 }}
                >
                    <NavbarMobile {...props} />
                </motion.div>
            )}
            {isTablet && (
                <motion.div
                    key="tablet-nav"
                    initial="initial" animate="animate" exit="exit"
                    variants={m3Variants} transition={m3Transition}
                    style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 200 }}
                >
                    <NavbarTablet {...props} />
                </motion.div>
            )}
            {isDesktop && (
                <motion.div
                    key="desktop-nav"
                    initial="initial" animate="animate" exit="exit"
                    variants={m3Variants} transition={m3Transition}
                    style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 200 }}
                >
                    <TopBarDesktop {...props} isVisible={props.isSidebarVisible} isExpanded={props.isDrawerMode} />
                    <SidebarDesktop {...props} isVisible={props.isSidebarVisible} isExpanded={props.isDrawerMode} />
                </motion.div>
            )}
        </AnimatePresence>
    );
}