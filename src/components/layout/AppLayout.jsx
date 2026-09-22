import React, { useState, useEffect, useRef } from 'react';

/**
 * Main application layout wrapper.
 * Orchestrates the space required by the dynamic navigation bars and enforces
 * Material 3 Expressive layout structure.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.navbar
 * @param {React.ReactNode} props.children
 * @param {React.ReactNode} props.footer
 * @param {React.ReactNode} props.background
 * @param {boolean} [props.hasRightSidebarPortal=false]
 * @returns {JSX.Element}
 */
export default function AppLayout({ navbar, children, footer, background, hasRightSidebarPortal = false }) {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [hasRightContent, setHasRightContent] = useState(false);
    const appShellRef = useRef(null);

    useEffect(() => {
        let resizeTimeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                setWindowWidth(window.innerWidth);
            }, 150);
        };
        window.addEventListener('resize', handleResize, { passive: true });
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimeout);
        };
    }, []);

    useEffect(() => {
        if (!hasRightSidebarPortal) {
            setHasRightContent(false);
            return;
        }

        const target = document.getElementById('right-sidebar-portal');
        if (!target) return;

        const checkRightContent = () => {
            setHasRightContent(target.childNodes.length > 0);
        };

        const observer = new MutationObserver(checkRightContent);
        observer.observe(target, { childList: true });
        checkRightContent();

        return () => observer.disconnect();
    }, [hasRightSidebarPortal]);

    useEffect(() => {
        const calculateFooterOffset = () => {
            const footerElement = document.querySelector('footer, .footer-base');
            const portalElement = document.getElementById('right-sidebar-portal');

            if (footerElement) {
                const footerRect = footerElement.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                let offset = 0;

                if (footerRect.top < windowHeight) {
                    offset = Math.ceil(windowHeight - footerRect.top);
                }

                if (appShellRef.current) {
                    appShellRef.current.style.setProperty('--footer-offset', `${offset}px`);
                }
                if (portalElement) {
                    portalElement.style.bottom = `${offset}px`;
                }
            }
        };

        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    calculateFooterOffset();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', calculateFooterOffset, { passive: true });

        const resizeObserver = new ResizeObserver(() => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    calculateFooterOffset();
                    ticking = false;
                });
                ticking = true;
            }
        });

        if (document.body) {
            resizeObserver.observe(document.body);
        }

        calculateFooterOffset();

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', calculateFooterOffset);
            resizeObserver.disconnect();
        };
    }, []);

    const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);

    const hasNavbar = !!navbar;
    const isDesktop = windowWidth > 1000;
    const isDrawerMode = windowWidth >= 1200;

    const bodyClass = (isDesktop && hasNavbar && isSidebarVisible) ? (isDrawerMode ? 'with-drawer' : 'with-rail') : '';

    const enhancedNavbar = hasNavbar ? React.cloneElement(navbar, {
        isSidebarVisible,
        isDrawerMode,
        toggleSidebar,
        windowWidth
    }) : null;

    const marginLeftAmount = isDesktop && hasNavbar && isSidebarVisible ? (isDrawerMode ? 280 : 80) : 0;
    const marginRightAmount = isDesktop && hasRightContent ? 320 : 0;

    const dynamicBodyStyles = {
        flex: '1 0 auto',
        minHeight: '100dvh',
        marginRight: `${marginRightAmount}px`,
        marginLeft: `${marginLeftAmount}px`,
        width: `calc(100% - ${marginLeftAmount + marginRightAmount}px)`,
        borderTopRightRadius: isDesktop && hasRightContent ? '0' : undefined,
        borderTopLeftRadius: isDesktop && hasNavbar && isSidebarVisible ? '32px' : '0'
    };

    if (isDesktop && !hasNavbar) {
        dynamicBodyStyles.marginTop = 0;
        dynamicBodyStyles.marginLeft = 0;
        dynamicBodyStyles.borderRadius = 0;
        dynamicBodyStyles.background = 'transparent';
        dynamicBodyStyles.width = '100%';
    }

    return (
        <div ref={appShellRef} className="app-shell page-wrapper">
            {background}
            {enhancedNavbar}

            <div
                className={`app-body-wrapper ${bodyClass}`}
                style={dynamicBodyStyles}
            >
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                    {children}
                </div>
            </div>

            {footer}

            {hasRightSidebarPortal && (
                <div
                    id="right-sidebar-portal"
                    data-lenis-prevent="true"
                    style={{
                        position: 'fixed',
                        top: isDesktop ? '64px' : '0',
                        right: isDesktop ? (hasRightContent ? '0' : '-320px') : '0',
                        bottom: '0',
                        width: '320px',
                        background: 'var(--md-sys-color-surface)',
                        borderLeft: 'none',
                        zIndex: 180,
                        overflowY: 'auto',
                        overscrollBehavior: 'contain',
                        transition: 'right 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                        display: isDesktop ? 'block' : 'none'
                    }}
                >
                    <style>{`
                        #right-sidebar-portal::-webkit-scrollbar {
                            display: none !important;
                            width: 0 !important;
                        }
                        #right-sidebar-portal {
                            -ms-overflow-style: none !important;
                            scrollbar-width: none !important;
                        }
                        #right-sidebar-portal .app-sidebar-sticky-inner {
                            position: static !important;
                            max-height: none !important;
                            overflow-y: visible !important;
                        }
                        #right-sidebar-portal .app-sidebar-fixed {
                            display: block !important;
                            width: 100% !important;
                        }
                    `}</style>
                </div>
            )}
        </div>
    );
}