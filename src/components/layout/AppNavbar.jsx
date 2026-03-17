import React, {useState, useEffect, useRef} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {useNavigate, useLocation} from 'react-router-dom';

/**
 * Configuration for navigation items displayed in the navbar.
 * @constant {Array<{id: string, icon: string}>}
 */
const NAV_ITEMS = [
    {id: 'index', icon: 'home'},
    {id: 'overview', icon: 'description'},
    {id: 'plus', icon: 'diamond'},
    {id: 'changelog', icon: 'history'},
    {id: 'roadmap', icon: 'map'},
];

/**
 * Spring animation configuration for smoother motion transitions.
 * @constant {object}
 */
const SPRING_TRANSITION = {type: "spring", stiffness: 400, damping: 30};

/**
 * Generates the glassmorphism style object based on scroll and active state.
 * @param {boolean} isScrolled - Whether the user has scrolled down past the threshold.
 * @param {boolean} [isActive=false] - Whether the mobile menu is currently active.
 * @returns {React.CSSProperties} The style object.
 */
const GLASS_STYLE = (isScrolled, isActive = false) => ({
    background: isScrolled || isActive
        ? 'rgba(var(--md-sys-color-surface-container-rgb), 0.96)'
        : 'rgba(var(--md-sys-color-surface-container-rgb), 0.7)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid var(--md-sys-color-outline-variant)',
    boxShadow: isScrolled ? '0 10px 40px rgba(0,0,0,0.18)' : '0 4px 16px rgba(0,0,0,0.08)',
    transform: 'translateZ(0)',
    willChange: 'transform, opacity'
});

/**
 * Animation variants for individual menu items.
 * @constant {object}
 */
const MENU_ITEM_VARIANTS = {
    hidden: {y: 10, opacity: 0},
    show: {y: 0, opacity: 1},
    exit: {y: -5, opacity: 0}
};

/**
 * Animation variants for the mobile menu container.
 * @constant {object}
 */
const MENU_CONTAINER_VARIANTS = {
    hidden: {opacity: 0},
    show: {opacity: 1, transition: {staggerChildren: 0.08, delayChildren: 0.1}},
    exit: {opacity: 0, transition: {duration: 0.1}}
};

/**
 * AppNavbar Component.
 * A responsive, glassmorphic navigation bar.
 *
 * @component
 * @param {object} props - Component props.
 * @param {object} props.config - Configuration object for the app.
 * @param {string} props.activePage - The ID of the currently active page.
 * @param {Function} props.onNavigate - Callback function triggered when a nav item is clicked.
 * @param {object} props.strings - Localization strings for labels.
 * @returns {React.ReactElement} The rendered Navbar.
 */
export default function AppNavbar({config, activePage, onNavigate, strings}) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const lastScrollY = useRef(0);
    const mobileMenuRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const is404 = activePage === '404';

    const isDesktopSpace = windowWidth > 1000;

    const visibleNavItems = NAV_ITEMS.filter(item => {
        if (item.id === 'overview' && !config.enableDocs) return false;
        return strings && strings[item.id];
    });

    useEffect(() => {
        const handleResize = () => {
            const activeElement = document.activeElement;
            const isInputFocused = activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA');
            if (isInputFocused) return;
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setMobileMenuOpen(false);
            }
        };
        if (isMobileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 20);

            const activeElement = document.activeElement;
            const isInputFocused = activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA');

            if (currentScrollY > lastScrollY.current && currentScrollY > 100 && !isMobileMenuOpen && !isInputFocused) {
                setIsVisible(false);
            } else if (currentScrollY < lastScrollY.current || currentScrollY < 50 || isInputFocused) {
                setIsVisible(true);
            }
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll, {passive: true});
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobileMenuOpen]);

    const handleNavClick = (id) => {
        onNavigate(id);
        setMobileMenuOpen(false);
    };

    const handleBackAction = () => {
        const isAtAppRoot = activePage === config.defaultPage || activePage === 'index';

        if (location.pathname.includes('/changelog/')) {
            const basePath = location.pathname.split('/changelog/')[0];
            navigate(`${basePath}/changelog`);
            return;
        }

        if (isAtAppRoot) {
            navigate('/');
        } else {
            onNavigate(config.defaultPage || 'index');
        }
    };

    return (
        <AnimatePresence>
            <motion.nav
                role="navigation"
                initial={{y: 0, opacity: 1}}
                animate={{y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0}}
                transition={{duration: 0.3, ease: "easeInOut"}}
                style={{
                    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
                    display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
                    flexWrap: 'wrap', gap: '12px', padding: '16px', pointerEvents: 'none', width: '100%'
                }}
            >
                <motion.div
                    style={{
                        ...GLASS_STYLE(isScrolled),
                        pointerEvents: 'auto',
                        padding: isDesktopSpace ? '10px 24px 10px 12px' : '6px',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: isDesktopSpace ? '100px' : '100px',
                        height: isDesktopSpace ? '64px' : '56px',
                        flexShrink: 1,
                        maxWidth: isDesktopSpace ? '1200px' : '100%',
                        width: isDesktopSpace ? '100%' : 'auto',
                        justifyContent: isDesktopSpace ? 'space-between' : 'flex-start',
                        transition: 'all 0.3s ease'
                    }}
                >
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <motion.button
                            layout="position"
                            onClick={handleBackAction}
                            aria-label={activePage === config.defaultPage ? "Close app" : strings?.back || "Back"}
                            style={{
                                background: isDesktopSpace ? 'var(--md-sys-color-surface-container-high)' : 'var(--md-sys-color-secondary-container)',
                                border: isDesktopSpace ? '1px solid var(--md-sys-color-outline-variant)' : 'none',
                                borderRadius: '50%',
                                width: isDesktopSpace ? 44 : 42,
                                height: isDesktopSpace ? 44 : 42,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: isDesktopSpace ? 'var(--md-sys-color-on-surface)' : 'var(--md-sys-color-on-secondary-container)',
                                flexShrink: 0,
                                marginRight: isDesktopSpace ? 16 : 10,
                                transition: 'background 0.2s, color 0.2s'
                            }}
                            whileHover={isDesktopSpace ? {
                                background: 'var(--md-sys-color-secondary-container)',
                                color: 'var(--md-sys-color-on-secondary-container)'
                            } : {}}
                            whileTap={{scale: 0.9}}
                        >
                            <motion.span
                                key={activePage === config.defaultPage ? 'close' : 'back'}
                                initial={{rotate: -90, opacity: 0}}
                                animate={{rotate: 0, opacity: 1}}
                                className="material-symbols-outlined"
                                style={{fontSize: '22px'}}
                            >
                                {activePage === config.defaultPage ? 'close' : 'arrow_back'}
                            </motion.span>
                        </motion.button>

                        <div
                            onClick={() => !is404 && handleNavClick(config.defaultPage)}
                            role={!is404 ? "button" : undefined}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                                cursor: is404 ? 'default' : 'pointer',
                                paddingRight: isDesktopSpace ? '0' : '14px',
                                paddingLeft: isDesktopSpace ? '0' : '6px'
                            }}
                        >
                            {config.materialIcon ? (
                                <span className="material-symbols-outlined"
                                      style={{
                                          fontSize: isDesktopSpace ? '28px' : '26px',
                                          color: 'var(--md-sys-color-primary)'
                                      }}>
                                    {config.materialIcon}
                                </span>
                            ) : (
                                <img src={config.appIcon} alt="" style={{
                                    width: isDesktopSpace ? 32 : 30,
                                    height: isDesktopSpace ? 32 : 30,
                                    borderRadius: 8
                                }}/>
                            )}
                            <span style={{
                                fontWeight: isDesktopSpace ? 800 : 700,
                                fontSize: isDesktopSpace ? '1.1rem' : '0.95rem',
                                whiteSpace: 'nowrap',
                                color: 'var(--md-sys-color-on-surface)',
                                letterSpacing: isDesktopSpace ? '-0.5px' : '0'
                            }}>
                                {config.appName}
                            </span>
                        </div>
                    </div>

                    <div id="appbar-search-portal" className="appbar-search-portal"></div>

                    {!is404 && (
                        <div className="desktop-menu" style={{display: 'flex', gap: '6px', paddingLeft: '8px'}}>
                            {visibleNavItems.map((item) => {
                                const isActive = activePage === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => handleNavClick(item.id)}
                                        style={{
                                            position: 'relative',
                                            background: 'transparent',
                                            color: isActive ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-surface-variant)',
                                            border: 'none',
                                            borderRadius: '100px',
                                            padding: '10px 18px',
                                            fontSize: '0.9rem',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            zIndex: 1,
                                            minWidth: 'fit-content'
                                        }}
                                    >
                                        {isActive && (
                                            <motion.span
                                                layoutId="nav-pill-background"
                                                transition={{type: "spring", bounce: 0.25, duration: 0.5}}
                                                style={{
                                                    position: 'absolute',
                                                    inset: 0,
                                                    borderRadius: '100px',
                                                    background: 'var(--md-sys-color-primary-container)',
                                                    zIndex: -1
                                                }}
                                            />
                                        )}
                                        <span className="material-symbols-outlined" style={{fontSize: '20px'}}>
                                            {item.icon}
                                        </span>
                                        {strings?.[item.id]}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </motion.div>

                <div id="appbar-bottom-portal" className="appbar-bottom-portal"></div>

                {!is404 && (
                    <motion.div
                        ref={mobileMenuRef}
                        layout
                        className="mobile-toggle-wrapper"
                        transition={SPRING_TRANSITION}
                        style={{
                            ...GLASS_STYLE(isScrolled, isMobileMenuOpen),
                            pointerEvents: 'auto',
                            borderRadius: '28px',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            width: isMobileMenuOpen ? '100%' : '56px',
                            height: isMobileMenuOpen ? 'auto' : '56px',
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: isMobileMenuOpen ? 'flex-end' : 'center',
                            padding: '8px',
                            minWidth: '56px'
                        }}>
                            <motion.button
                                layout="position"
                                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                                style={{
                                    background: isMobileMenuOpen ? 'var(--md-sys-color-secondary-container)' : 'transparent',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: 42,
                                    height: 42,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    color: isMobileMenuOpen ? 'var(--md-sys-color-on-secondary-container)' : 'var(--md-sys-color-on-surface)'
                                }}
                                whileTap={{scale: 0.9}}
                            >
                                <motion.span
                                    key={isMobileMenuOpen ? "close" : "menu"}
                                    initial={{rotate: -90, opacity: 0}}
                                    animate={{rotate: 0, opacity: 1}}
                                    exit={{rotate: 90, opacity: 0}}
                                    className="material-symbols-outlined"
                                >
                                    {isMobileMenuOpen ? 'close' : 'menu'}
                                </motion.span>
                            </motion.button>
                        </div>

                        <AnimatePresence>
                            {isMobileMenuOpen && (
                                <motion.div
                                    id="mobile-menu-items"
                                    variants={MENU_CONTAINER_VARIANTS}
                                    initial="hidden" animate="show" exit="exit"
                                    style={{
                                        padding: '0 8px 10px 8px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '6px'
                                    }}
                                >
                                    {visibleNavItems.map(item => (
                                        <motion.button
                                            key={item.id}
                                            variants={MENU_ITEM_VARIANTS}
                                            onClick={() => handleNavClick(item.id)}
                                            style={{
                                                background: activePage === item.id ? 'var(--md-sys-color-secondary-container)' : 'var(--md-sys-color-surface-container-high)',
                                                color: activePage === item.id ? 'var(--md-sys-color-on-secondary-container)' : 'var(--md-sys-color-on-surface)',
                                                border: 'none',
                                                borderRadius: '18px',
                                                padding: '16px',
                                                fontSize: '1rem',
                                                fontWeight: 500,
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '16px',
                                                textAlign: 'left',
                                                width: '100%'
                                            }}
                                            whileTap={{scale: 0.97}}
                                        >
                                            <span
                                                style={{
                                                    width: 34,
                                                    height: 34,
                                                    borderRadius: '50%',
                                                    background: 'var(--md-sys-color-primary-container)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'var(--md-sys-color-primary)'
                                                }}
                                            >
                                                <span className="material-symbols-outlined">
                                                    {item.icon}
                                                </span>
                                            </span>
                                            <span>{strings?.[item.id]}</span>
                                        </motion.button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}

                <style>{`
                  .appbar-search-portal {
                      display: flex;
                      flex: 1;
                      min-width: 0;
                      margin: 0 24px;
                      justify-content: center;
                  }
                  .appbar-bottom-portal {
                      width: 100%;
                      display: flex;
                      justify-content: center;
                      pointer-events: auto;
                  }
                  @media (max-width: 1000px) {
                    .desktop-menu { display: none !important; }
                    .appbar-search-portal { display: none !important; }
                    .appbar-bottom-portal { display: none !important; }
                    .mobile-toggle-wrapper { display: flex !important; }
                  }
                  @media (min-width: 1001px) {
                    .mobile-toggle-wrapper { display: none !important; }
                  }
                `}</style>
            </motion.nav>
        </AnimatePresence>
    );
}