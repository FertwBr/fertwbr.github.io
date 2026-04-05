import React, {useState, useEffect, useRef} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {useNavigate, useLocation} from 'react-router-dom';
import {NAV_ITEMS, GLASS_STYLE} from './navShared';

const SMOOTH_SPRING = {
    type: "spring",
    stiffness: 450,
    damping: 35
};

/**
 * Tablet navigation component.
 * Renders a floating horizontal glassmorphism bar with dynamic active indicators
 * and fluid layout adjustments for search/filter actions.
 *
 * @param {Object} props
 * @param {Object} props.config
 * @param {string} props.activePage
 * @param {Function} props.onNavigate
 * @param {Object} props.strings
 * @returns {JSX.Element}
 */
export default function NavbarTablet({config, activePage, onNavigate, strings}) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [hasFilters, setHasFilters] = useState(false);
    const [isFiltersOpen, setFiltersOpen] = useState(false);
    const [hasSearch, setHasSearch] = useState(false);

    const lastScrollY = useRef(0);
    const bottomPortalRef = useRef(null);
    const searchPortalRef = useRef(null);
    const filterBtnRef = useRef(null);

    const navigate = useNavigate();
    const location = useLocation();
    const is404 = activePage === '404';

    const visibleNavItems = NAV_ITEMS.filter(item => {
        if (item.id === 'feedback') return true;
        if (config?.pages && !config.pages[item.id] && item.id !== 'index') return false;
        if (item.id === 'overview' && !config?.enableDocs) return false;
        return true;
    });

    useEffect(() => {
        if (!bottomPortalRef.current) return;
        const checkFilters = () => setHasFilters(bottomPortalRef.current.childNodes.length > 0);
        checkFilters();
        const obs = new MutationObserver(checkFilters);
        obs.observe(bottomPortalRef.current, {childList: true, subtree: true});
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        if (!searchPortalRef.current) return;
        const checkSearch = () => setHasSearch(searchPortalRef.current.childNodes.length > 0);
        checkSearch();
        const obs = new MutationObserver(checkSearch);
        obs.observe(searchPortalRef.current, {childList: true, subtree: true});
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isFiltersOpen && bottomPortalRef.current && !bottomPortalRef.current.contains(e.target)) {
                if (filterBtnRef.current && filterBtnRef.current.contains(e.target)) return;
                setFiltersOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isFiltersOpen]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = Math.max(0, window.scrollY);
            setIsScrolled(currentScrollY > 20);

            const activeElement = document.activeElement;
            const isInputFocused = activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA');

            const documentHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;
            const isAtBottom = currentScrollY + windowHeight >= documentHeight - 60;

            if (currentScrollY <= 0 || isInputFocused) {
                setIsVisible(true);
            } else if (isAtBottom && !isFiltersOpen) {
                setIsVisible(false);
            } else if (currentScrollY > lastScrollY.current && currentScrollY > 100 && !isFiltersOpen) {
                setIsVisible(false);
            } else if (currentScrollY < lastScrollY.current || currentScrollY < 50) {
                setIsVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll, {passive: true});
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isFiltersOpen]);

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

    const displayTitle = is404 ? '404' : (strings?.[activePage] || config.appName);

    return (
        <motion.nav
            initial={{y: 0, opacity: 1}}
            animate={{y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0}}
            transition={{duration: 0.3, ease: "easeInOut"}}
            style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
                padding: '16px', pointerEvents: 'none', width: '100%',
                display: 'flex', justifyContent: 'center'
            }}
        >
            <motion.div
                layout
                transition={SMOOTH_SPRING}
                className="main-glass-nav"
                style={{
                    ...GLASS_STYLE(isScrolled),
                    pointerEvents: 'auto',
                    borderRadius: '100px',
                    padding: '8px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    maxWidth: '1200px',
                    overflow: 'hidden',
                    gap: '24px'
                }}
            >
                <motion.div layout transition={SMOOTH_SPRING} className="nav-brand-area"
                            style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                    <motion.button
                        layout
                        onClick={handleBackAction}
                        className="nav-icon-btn-tablet"
                        whileTap={{scale: 0.9}}
                        transition={SMOOTH_SPRING}
                        style={{
                            background: 'transparent', border: 'none', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'var(--md-sys-color-on-surface)'
                        }}
                    >
                        <AnimatePresence mode="popLayout" initial={false}>
                            <motion.span
                                layout="position"
                                key={activePage === config.defaultPage ? 'close' : 'back'}
                                initial={{rotate: -90, opacity: 0, scale: 0.5}}
                                animate={{rotate: 0, opacity: 1, scale: 1}}
                                exit={{rotate: 90, opacity: 0, scale: 0.5}}
                                transition={SMOOTH_SPRING}
                                className="material-symbols-outlined"
                                style={{fontSize: '24px', display: 'block'}}
                            >
                                {activePage === config.defaultPage ? 'close' : 'arrow_back'}
                            </motion.span>
                        </AnimatePresence>
                    </motion.button>

                    <motion.div
                        layout
                        onClick={() => !is404 && onNavigate(config.defaultPage)}
                        className="nav-brand-container"
                        whileTap={!is404 ? {scale: 0.97} : {}}
                        transition={SMOOTH_SPRING}
                        style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: 0}}
                    >
                        <motion.div layout transition={SMOOTH_SPRING} style={{display: 'flex', alignItems: 'center'}}>
                            {config.materialIcon ? (
                                <span className="material-symbols-outlined nav-brand-icon">{config.materialIcon}</span>
                            ) : (
                                <img src={config.appIcon} alt="" className="nav-brand-image"
                                     style={{width: '28px', height: '28px'}}/>
                            )}
                        </motion.div>
                        <AnimatePresence mode="popLayout" initial={false}>
                            <motion.span
                                layout="position"
                                key={displayTitle}
                                initial={{opacity: 0, y: 15, filter: "blur(4px)"}}
                                animate={{opacity: 1, y: 0, filter: "blur(0px)"}}
                                exit={{opacity: 0, y: -15, filter: "blur(4px)"}}
                                transition={SMOOTH_SPRING}
                                className="nav-brand-text"
                                style={{display: 'inline-block', whiteSpace: 'nowrap'}}
                            >
                                {displayTitle}
                            </motion.span>
                        </AnimatePresence>
                    </motion.div>
                </motion.div>

                {!is404 && (
                    <motion.div layout transition={SMOOTH_SPRING} className="tablet-menu" style={{
                        display: 'flex',
                        gap: '4px',
                        alignItems: 'center',
                        flex: 1,
                        justifyContent: 'center'
                    }}>
                        {visibleNavItems.map((item) => {
                            const isActive = activePage === item.id;
                            const label = strings?.[item.id] || (item.id === 'index' ? 'Home' : item.id.charAt(0).toUpperCase() + item.id.slice(1));

                            return (
                                <motion.button
                                    layout
                                    key={item.id}
                                    onClick={() => {
                                        if (item.id === 'feedback') {
                                            const sourceParam = config?.scheme ? `?source=${config.scheme}` : '';
                                            navigate(`/feedback${sourceParam}`);
                                        } else {
                                            onNavigate(item.id);
                                        }
                                    }}
                                    whileHover={{backgroundColor: isActive ? 'transparent' : 'rgba(var(--md-sys-color-on-surface-rgb), 0.08)'}}
                                    whileTap={{scale: 0.95}}
                                    style={{
                                        position: 'relative',
                                        padding: '8px 16px',
                                        background: 'transparent',
                                        border: 'none',
                                        color: isActive ? 'var(--md-sys-color-on-secondary-container)' : 'var(--md-sys-color-on-surface-variant)',
                                        fontWeight: isActive ? 600 : 500,
                                        borderRadius: '100px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        fontSize: '0.9rem',
                                        outline: 'none',
                                        whiteSpace: 'nowrap',
                                        transition: 'color 0.2s ease'
                                    }}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="tablet-active-pill"
                                            transition={SMOOTH_SPRING}
                                            style={{
                                                position: 'absolute',
                                                inset: 0,
                                                backgroundColor: 'var(--md-sys-color-secondary-container)',
                                                borderRadius: '100px',
                                                zIndex: 0
                                            }}
                                        />
                                    )}
                                    <span className="material-symbols-outlined"
                                          style={{fontSize: '18px', position: 'relative', zIndex: 1}}>
                                        {item.icon}
                                    </span>
                                    <span style={{position: 'relative', zIndex: 1}}>
                                        {label}
                                    </span>
                                </motion.button>
                            );
                        })}
                    </motion.div>
                )}

                <motion.div layout transition={SMOOTH_SPRING}
                            className={`nav-right-wrapper ${hasSearch ? 'has-search' : 'no-search'}`}
                            style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <div id="appbar-search-portal" ref={searchPortalRef} className="appbar-search-portal"></div>
                    <AnimatePresence>
                        <motion.button
                            layout
                            ref={filterBtnRef}
                            className={`desktop-filter-btn ${hasFilters ? 'visible' : ''} ${isFiltersOpen ? 'active' : ''}`}
                            onClick={() => setFiltersOpen(!isFiltersOpen)}
                            whileTap={{scale: 0.9}}
                            transition={SMOOTH_SPRING}
                        >
                            <span className="material-symbols-outlined">tune</span>
                        </motion.button>
                    </AnimatePresence>
                </motion.div>
            </motion.div>

            <div id="appbar-bottom-portal" ref={bottomPortalRef}
                 className={`appbar-bottom-portal ${isFiltersOpen ? 'open' : ''}`}></div>
        </motion.nav>
    );
}