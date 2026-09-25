// file: src/components/layout/NavbarTablet.jsx
import React, {useState, useEffect, useRef} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {useNavigate, useLocation} from 'react-router-dom';
import {NAV_ITEMS} from './navShared';

const SMOOTH_SPRING = {
    type: "spring",
    stiffness: 450,
    damping: 35
};

/**
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

    const lastScrollY = useRef(0);
    const bottomContainerRef = useRef(null);
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
        const el = document.getElementById('appbar-bottom-portal');
        const checkFilters = () => {
            if (el) setHasFilters(el.childNodes.length > 0);
        };
        checkFilters();
        if (el) {
            const obs = new MutationObserver(checkFilters);
            obs.observe(el, {childList: true, subtree: true});
            return () => obs.disconnect();
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            const portal = document.getElementById('appbar-bottom-portal');
            if (isFiltersOpen && portal && !portal.contains(e.target)) {
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

    React.useLayoutEffect(() => {
        const bottomEl = document.getElementById('appbar-bottom-portal');
        if (bottomEl && bottomContainerRef.current) {
            bottomEl.className = `appbar-bottom-portal ${isFiltersOpen ? 'open' : ''}`;
            bottomEl.style.display = 'flex';
            bottomContainerRef.current.appendChild(bottomEl);
        }
        return () => {
            if (bottomEl) {
                bottomEl.style.display = 'none';
                document.body.appendChild(bottomEl);
            }
        };
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
        <nav className="tablet-nav-container">
            <motion.div
                layout
                transition={SMOOTH_SPRING}
                className="main-glass-nav tablet-layout-m3"
                style={{
                    background: isScrolled || isFiltersOpen
                        ? 'rgba(var(--md-sys-color-surface-container-rgb), 0.96)'
                        : 'rgba(var(--md-sys-color-surface-container-rgb), 0.7)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    border: '1px solid var(--md-sys-color-outline-variant)',
                    boxShadow: isScrolled
                        ? '0 10px 40px rgba(var(--md-sys-color-shadow-rgb), 0.18)'
                        : '0 4px 16px rgba(var(--md-sys-color-shadow-rgb), 0.08)',
                    transform: isVisible ? 'translateY(0)' : 'translateY(-100px)',
                    opacity: isVisible ? 1 : 0
                }}
            >
                <motion.div layout transition={SMOOTH_SPRING} className="nav-brand-area tablet-brand-area">
                    <motion.button
                        layout
                        onClick={handleBackAction}
                        className="nav-icon-btn-tablet"
                        whileTap={{scale: 0.9}}
                        transition={SMOOTH_SPRING}
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.span
                                key={activePage === config.defaultPage ? 'close' : 'back'}
                                initial={{rotate: -90, opacity: 0, scale: 0.5}}
                                animate={{rotate: 0, opacity: 1, scale: 1}}
                                exit={{rotate: 90, opacity: 0, scale: 0.5}}
                                transition={SMOOTH_SPRING}
                                className="material-symbols-outlined tablet-back-icon"
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
                    >
                        <motion.div layout transition={SMOOTH_SPRING} className="nav-brand-wrapper">
                            {config.materialIcon ? (
                                <span className="material-symbols-outlined nav-brand-icon">{config.materialIcon}</span>
                            ) : (
                                <img src={config.appIcon} alt="" className="nav-brand-image"/>
                            )}
                        </motion.div>
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.span
                                key={displayTitle}
                                initial={{opacity: 0, x: -10, filter: "blur(4px)"}}
                                animate={{opacity: 1, x: 0, filter: "blur(0px)"}}
                                exit={{opacity: 0, x: 10, filter: "blur(4px)"}}
                                transition={SMOOTH_SPRING}
                                className="nav-brand-text responsive-brand-text"
                            >
                                {displayTitle}
                            </motion.span>
                        </AnimatePresence>
                    </motion.div>
                </motion.div>

                {!is404 && (
                    <motion.div layout transition={SMOOTH_SPRING} className="tablet-menu responsive-tablet-menu">
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
                                    className={`tablet-nav-item ${isActive ? 'active' : ''}`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="tablet-active-pill"
                                            transition={SMOOTH_SPRING}
                                            className="tablet-active-pill"
                                        />
                                    )}
                                    <span className="material-symbols-outlined tablet-nav-icon">
                                        {item.icon}
                                    </span>
                                    <span className="tablet-nav-label">
                                        {label}
                                    </span>
                                </motion.button>
                            );
                        })}
                    </motion.div>
                )}

                <motion.div layout transition={SMOOTH_SPRING} className="nav-right-wrapper tablet-actions-area">
                    <AnimatePresence>
                        <motion.button
                            layout
                            ref={filterBtnRef}
                            className={`m3-filter-btn ${hasFilters ? 'visible' : ''} ${isFiltersOpen ? 'active' : ''}`}
                            onClick={() => setFiltersOpen(!isFiltersOpen)}
                            whileTap={{scale: 0.9}}
                            transition={SMOOTH_SPRING}
                        >
                            <span className="material-symbols-outlined">tune</span>
                        </motion.button>
                    </AnimatePresence>
                </motion.div>
            </motion.div>

            <div ref={bottomContainerRef}></div>
        </nav>
    );
}