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
 * Generates the glassmorphism style object based on scroll and active state (Mobile mainly).
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
    boxShadow: isScrolled
        ? '0 10px 40px rgba(var(--md-sys-color-shadow-rgb), 0.18)'
        : '0 4px 16px rgba(var(--md-sys-color-shadow-rgb), 0.08)',
    transform: 'translateZ(0)',
    willChange: 'transform, opacity'
});

const MENU_ITEM_VARIANTS = {
    hidden: {y: 10, opacity: 0},
    show: {y: 0, opacity: 1},
    exit: {y: -5, opacity: 0}
};

const MENU_CONTAINER_VARIANTS = {
    hidden: {opacity: 0},
    show: {opacity: 1, transition: {staggerChildren: 0.08, delayChildren: 0.1}},
    exit: {opacity: 0, transition: {duration: 0.1}}
};

export default function AppNavbar({config, activePage, onNavigate, strings}) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const [hasFilters, setHasFilters] = useState(false);
    const [isFiltersOpen, setFiltersOpen] = useState(false);

    const lastScrollY = useRef(0);
    const mobileMenuRef = useRef(null);
    const bottomPortalRef = useRef(null);
    const filterBtnRef = useRef(null);
    const searchPortalRef = useRef(null);
    const [hasSearch, setHasSearch] = useState(false);

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
        if (!bottomPortalRef.current) return;
        const checkChildren = () => {
            if (bottomPortalRef.current) {
                setHasFilters(bottomPortalRef.current.childNodes.length > 0);
            }
        };
        checkChildren();
        const observer = new MutationObserver(checkChildren);
        observer.observe(bottomPortalRef.current, { childList: true, subtree: true });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!searchPortalRef.current) return;
        const checkSearch = () => {
            if (searchPortalRef.current) {
                setHasSearch(searchPortalRef.current.childNodes.length > 0);
            }
        };
        checkSearch();
        const observer = new MutationObserver(checkSearch);
        observer.observe(searchPortalRef.current, { childList: true, subtree: true });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => { document.body.style.overflow = ''; };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setMobileMenuOpen(false);
            }
            if (isFiltersOpen && bottomPortalRef.current && !bottomPortalRef.current.contains(event.target)) {
                if (filterBtnRef.current && filterBtnRef.current.contains(event.target)) return;
                setFiltersOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isMobileMenuOpen, isFiltersOpen]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 20);

            const activeElement = document.activeElement;
            const isInputFocused = activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA');

            if (currentScrollY > lastScrollY.current && currentScrollY > 100 && !isMobileMenuOpen && !isInputFocused && !isFiltersOpen) {
                setIsVisible(false);
            } else if (currentScrollY < lastScrollY.current || currentScrollY < 50 || isInputFocused) {
                setIsVisible(true);
            }
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll, {passive: true});
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobileMenuOpen, isFiltersOpen]);

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
        if (isAtAppRoot) navigate('/');
        else onNavigate(config.defaultPage || 'index');
    };

    const desktopBg = isScrolled ? 'rgba(var(--md-sys-color-surface-container-rgb), 0.85)' : 'rgba(0, 0, 0, 0)';
    const desktopBorder = isScrolled ? '1px solid var(--md-sys-color-outline-variant)' : '1px solid rgba(0, 0, 0, 0)';
    const desktopShadow = isScrolled ? '0 10px 40px rgba(var(--md-sys-color-shadow-rgb), 0.12)' : 'none';
    const desktopBackdrop = isScrolled ? 'blur(24px)' : 'none';

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
                    flexWrap: 'wrap', gap: '12px',
                    padding: isDesktopSpace ? '0' : '16px',
                    pointerEvents: 'none', width: '100%'
                }}
            >
                <motion.div
                    className="main-glass-nav"
                    style={{
                        '--desktop-bg': desktopBg,
                        '--desktop-border': desktopBorder,
                        '--desktop-shadow': desktopShadow,
                        '--desktop-backdrop': desktopBackdrop,
                        ...(!isDesktopSpace ? GLASS_STYLE(isScrolled) : {}),
                        pointerEvents: 'auto',
                    }}
                >
                    <div className="nav-top-row">

                        <div className="nav-brand-area">
                            <motion.button
                                layout="position"
                                onClick={handleBackAction}
                                aria-label={activePage === config.defaultPage ? "Close app" : strings?.back || "Back"}
                                className="nav-back-btn"
                                whileHover={isDesktopSpace ? {
                                    backgroundColor: 'var(--md-sys-color-secondary-container)',
                                    color: 'var(--md-sys-color-on-secondary-container)'
                                } : {}}
                                whileTap={{scale: 0.9}}
                            >
                                <motion.span
                                    key={activePage === config.defaultPage ? 'close' : 'back'}
                                    initial={{rotate: -90, opacity: 0}}
                                    animate={{rotate: 0, opacity: 1}}
                                    className="material-symbols-outlined"
                                    style={{fontSize: '24px'}}
                                >
                                    {activePage === config.defaultPage ? 'close' : 'arrow_back'}
                                </motion.span>
                            </motion.button>

                            <motion.div
                                onClick={() => !is404 && handleNavClick(config.defaultPage)}
                                role={!is404 ? "button" : undefined}
                                className="nav-brand-container"
                                style={{ cursor: is404 ? 'default' : 'pointer' }}
                                whileTap={!is404 ? {scale: 0.97} : {}}
                            >
                                {config.materialIcon ? (
                                    <span className="material-symbols-outlined nav-brand-icon">
                                        {config.materialIcon}
                                    </span>
                                ) : (
                                    <img src={config.appIcon} alt="" className="nav-brand-image" />
                                )}
                                <span className="nav-brand-text">
                                    {config.appName}
                                </span>
                            </motion.div>
                        </div>

                        {!is404 && (
                            <div className="desktop-menu">
                                {visibleNavItems.map((item) => {
                                    const isActive = activePage === item.id;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => handleNavClick(item.id)}
                                            className={`nav-link ${isActive ? 'active' : ''}`}
                                        >
                                            {isActive && (
                                                <motion.span
                                                    layoutId="nav-underline"
                                                    transition={{type: "spring", bounce: 0.2, duration: 0.5}}
                                                    className="nav-underline-indicator"
                                                />
                                            )}
                                            {strings?.[item.id]}
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        <div className={`nav-right-wrapper ${hasSearch ? 'has-search' : 'no-search'}`}>
                            <div id="appbar-search-portal" ref={searchPortalRef} className="appbar-search-portal"></div>

                            <button
                                ref={filterBtnRef}
                                className={`desktop-filter-btn ${hasFilters ? 'visible' : ''} ${isFiltersOpen ? 'active' : ''}`}
                                onClick={() => setFiltersOpen(!isFiltersOpen)}
                                title="Filters"
                            >
                                <span className="material-symbols-outlined">tune</span>
                            </button>
                        </div>
                    </div>

                    <div id="appbar-bottom-portal" ref={bottomPortalRef} className={`appbar-bottom-portal ${isFiltersOpen ? 'open' : ''}`}></div>
                </motion.div>

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
                                    backgroundColor: isMobileMenuOpen ? 'var(--md-sys-color-secondary-container)' : 'rgba(0, 0, 0, 0)',
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
                                            className={`mobile-nav-item ${activePage === item.id ? 'active' : ''}`}
                                            whileTap={{scale: 0.97}}
                                        >
                                            <span
                                                style={{
                                                    width: 34,
                                                    height: 34,
                                                    borderRadius: '50%',
                                                    backgroundColor: 'var(--md-sys-color-primary-container)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'var(--md-sys-color-primary)',
                                                    flexShrink: 0
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
            </motion.nav>
        </AnimatePresence>
    );
}