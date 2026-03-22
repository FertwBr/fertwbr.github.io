// src/components/layout/NavbarTablet.jsx
import React, {useState, useEffect, useRef} from 'react';
import {motion} from 'framer-motion';
import {useNavigate, useLocation} from 'react-router-dom';
import {NAV_ITEMS, GLASS_STYLE} from './navShared';

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
        if (item.id === 'overview' && !config.enableDocs) return false;
        return strings && strings[item.id];
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

    return (
        <motion.nav
            initial={{y: 0, opacity: 1}}
            animate={{y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0}}
            transition={{duration: 0.3, ease: "easeInOut"}}
            style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
                padding: '16px', pointerEvents: 'none', width: '100%'
            }}
        >
            <div
                className="main-glass-nav"
                style={{
                    ...GLASS_STYLE(isScrolled),
                    pointerEvents: 'auto',
                    borderRadius: '100px',
                    padding: '8px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%'
                }}
            >
                <div className="nav-brand-area">
                    <button onClick={handleBackAction} className="nav-icon-btn-tablet">
                        <span className="material-symbols-outlined">
                            {activePage === config.defaultPage ? 'close' : 'arrow_back'}
                        </span>
                    </button>

                    <div onClick={() => !is404 && onNavigate(config.defaultPage)} className="nav-brand-container">
                        {config.materialIcon ? (
                            <span className="material-symbols-outlined nav-brand-icon">{config.materialIcon}</span>
                        ) : (
                            <img src={config.appIcon} alt="" className="nav-brand-image"/>
                        )}
                    </div>
                </div>

                {!is404 && (
                    <div className="tablet-menu">
                        {visibleNavItems.map((item) => {
                            const isActive = activePage === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => onNavigate(item.id)}
                                    className={`nav-link ${isActive ? 'active' : ''}`}
                                >
                                    {isActive && (
                                        <motion.span layoutId="nav-underline-tablet"
                                                     className="nav-underline-indicator"/>
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
                    >
                        <span className="material-symbols-outlined">tune</span>
                    </button>
                </div>
            </div>
            <div id="appbar-bottom-portal" ref={bottomPortalRef}
                 className={`appbar-bottom-portal ${isFiltersOpen ? 'open' : ''}`}></div>
        </motion.nav>
    );
}