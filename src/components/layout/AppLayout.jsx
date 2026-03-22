import React, {useState, useEffect} from 'react';

/**
 * Main application layout wrapper.
 * Orchestrates the space required by the dynamic navigation bars.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.navbar
 * @param {React.ReactNode} props.children
 * @param {React.ReactNode} props.footer
 * @param {React.ReactNode} props.background
 * @param {boolean} [props.hasRightSidebarPortal=false]
 * @returns {JSX.Element}
 */
export default function AppLayout({navbar, children, footer, background, hasRightSidebarPortal = false}) {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [hasRightContent, setHasRightContent] = useState(false);
    const [footerOffset, setFooterOffset] = useState(0);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!hasRightSidebarPortal) {
            setHasRightContent(false);
            return;
        }

        const target = document.getElementById('right-sidebar-portal');
        if (!target) return;

        const observer = new MutationObserver(() => {
            setHasRightContent(target.childNodes.length > 0);
        });

        observer.observe(target, { childList: true });
        setHasRightContent(target.childNodes.length > 0);

        return () => observer.disconnect();
    }, [hasRightSidebarPortal]);

    useEffect(() => {
        const handleScroll = () => {
            const footerElement = document.querySelector('footer');
            if (footerElement) {
                const footerRect = footerElement.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                if (footerRect.top < windowHeight) {
                    setFooterOffset(windowHeight - footerRect.top);
                } else {
                    setFooterOffset(0);
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });

        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
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

    return (
        <div
            className="app-shell page-wrapper"
            style={{ '--footer-offset': `${footerOffset}px` }}
        >
            {background}
            {enhancedNavbar}

            <div
                className={`app-body-wrapper ${bodyClass}`}
                style={{
                    marginRight: isDesktop && hasRightContent ? '320px' : '0',
                    marginLeft: isDesktop && hasNavbar && isSidebarVisible ? (isDrawerMode ? '280px' : '80px') : '0',
                    width: isDesktop && hasRightContent ? 'auto' : '100%',
                    transition: 'margin 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), width 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), border-radius 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), border 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    borderTopRightRadius: isDesktop && hasRightContent ? '0' : undefined,
                    borderTopLeftRadius: isDesktop && hasNavbar && isSidebarVisible ? '32px' : '0',
                    borderTop: 'none',
                    borderBottom: 'none',
                    borderRight: 'none',
                    borderLeft: isDesktop && hasNavbar && isSidebarVisible ? '1px solid var(--md-sys-color-outline-variant)' : 'none',
                    ...((isDesktop && !hasNavbar) ? {
                        marginTop: 0,
                        marginLeft: 0,
                        border: 'none',
                        borderRadius: 0,
                        background: 'transparent'
                    } : {})
                }}
            >
                <div style={{flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0}}>
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
                        bottom: `${footerOffset}px`,
                        width: '320px',
                        background: 'linear-gradient(90deg, var(--md-sys-color-surface) 0%, rgba(var(--md-sys-color-surface-rgb), 0.5) 100%)',
                        backdropFilter: 'blur(30px)',
                        WebkitBackdropFilter: 'blur(30px)',
                        borderLeft: 'none',
                        zIndex: 180,
                        overflowY: 'auto',
                        overscrollBehavior: 'contain',
                        transition: 'right 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                        display: isDesktop ? 'block' : 'none',
                        maskImage: 'linear-gradient(to bottom, black calc(100% - 120px), transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black calc(100% - 120px), transparent 100%)'
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