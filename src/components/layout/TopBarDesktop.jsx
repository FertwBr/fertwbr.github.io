import React, {useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {motion, AnimatePresence} from 'framer-motion';

/**
 * TopBarDesktop component.
 * Renders the top application bar for desktop screens, with dynamic search portals.
 *
 * @param {Object} props
 * @param {Object} props.config
 * @param {string} props.activePage
 * @param {Function} props.onNavigate
 * @param {Object} props.strings
 * @param {boolean} props.isVisible
 * @param {boolean} props.isExpanded
 * @param {Function} props.toggleSidebar
 * @returns {JSX.Element}
 */
export default function TopBarDesktop({config, activePage, onNavigate, strings, isVisible, isExpanded, toggleSidebar}) {
    const [hasFilters, setHasFilters] = useState(false);
    const [isFiltersOpen, setFiltersOpen] = useState(false);
    const [hasSearch, setHasSearch] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const searchContainerRef = useRef(null);
    const bottomContainerRef = useRef(null);
    const filterBtnRef = useRef(null);

    const navigate = useNavigate();
    const location = useLocation();
    const is404 = activePage === '404';

    const displayTitle = is404 ? '404' : (strings?.[activePage] || config.appName);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20 && isFiltersOpen) setFiltersOpen(false);
        };
        window.addEventListener('scroll', handleScroll, {passive: true});
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isFiltersOpen]);

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
        const el = document.getElementById('appbar-search-portal');
        const checkSearch = () => {
            if (el) setHasSearch(el.childNodes.length > 0);
        };
        checkSearch();
        if (el) {
            const obs = new MutationObserver(checkSearch);
            obs.observe(el, {childList: true, subtree: true});
            return () => obs.disconnect();
        }
    }, []);

    useEffect(() => {
        const portal = document.getElementById('appbar-search-portal');
        if (!portal) return;

        const handleFocusIn = () => setIsSearchFocused(true);
        const handleFocusOut = () => setIsSearchFocused(false);

        portal.addEventListener('focusin', handleFocusIn);
        portal.addEventListener('focusout', handleFocusOut);

        return () => {
            portal.removeEventListener('focusin', handleFocusIn);
            portal.removeEventListener('focusout', handleFocusOut);
        };
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

    React.useLayoutEffect(() => {
        const searchEl = document.getElementById('appbar-search-portal');
        if (searchEl && searchContainerRef.current) {
            searchEl.className = `appbar-search-portal-desktop ${hasFilters ? 'has-filters' : ''}`;
            searchEl.style.display = 'flex';
            searchEl.style.flex = '1';
            searchContainerRef.current.appendChild(searchEl);
        }
        return () => {
            if (searchEl && searchEl.parentElement === searchContainerRef.current) {
                searchEl.style.display = 'none';
                document.body.appendChild(searchEl);
            }
        };
    }, [hasFilters]);

    React.useLayoutEffect(() => {
        const bottomEl = document.getElementById('appbar-bottom-portal');
        if (bottomEl && bottomContainerRef.current) {
            bottomEl.className = `appbar-bottom-portal ${isFiltersOpen ? 'open' : ''}`;
            bottomEl.style.display = 'flex';
            bottomContainerRef.current.appendChild(bottomEl);
        }
        return () => {
            if (bottomEl && bottomEl.parentElement === bottomContainerRef.current) {
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

    const isDeepPage = activePage !== config.defaultPage && activePage !== 'index' && !is404;

    return (
        <>
            <style>{`
                .top-bar-center:not(.search-focused):not(.filter-active) .desktop-filter-btn:not(:hover) {
                    background-color: var(--md-sys-color-surface-container-highest) !important;
                }
                .top-bar-center:not(.search-focused):not(.filter-active) .appbar-search-portal-desktop input[type="text"]:not(:focus),
                .top-bar-center:not(.search-focused):not(.filter-active) .appbar-search-portal-desktop .desktop-search-input:not(:focus) {
                    background-color: var(--md-sys-color-surface-container-highest) !important;
                }
            `}</style>

            <header
                className="top-bar-desktop"
                style={{
                    background: isVisible ? 'var(--md-sys-color-surface)' : 'rgba(var(--md-sys-color-surface-rgb), 0.75)',
                    backdropFilter: isVisible ? 'none' : 'blur(24px)',
                    WebkitBackdropFilter: isVisible ? 'none' : 'blur(24px)',
                    borderBottom: 'none',
                    transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 16px',
                    width: '100%',
                    boxSizing: 'border-box',
                    pointerEvents: 'auto'
                }}
            >
                <div
                    className="top-bar-left"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        minWidth: isVisible && isExpanded ? '264px' : '0',
                        transition: 'min-width 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                        flexShrink: 0
                    }}
                >
                    {!is404 && (
                        <button onClick={toggleSidebar} className="nav-icon-btn" style={{flexShrink: 0}}>
                            <span className="material-symbols-outlined" style={{
                                transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                                transform: isVisible ? 'scale(1)' : 'scale(0.9)',
                                opacity: isVisible ? 1 : 0.8
                            }}>
                                menu
                            </span>
                        </button>
                    )}

                    {isDeepPage && (
                        <button onClick={handleBackAction} className="nav-icon-btn"
                                style={{width: '36px', height: '36px', flexShrink: 0}}>
                            <span className="material-symbols-outlined" style={{fontSize: '20px'}}>arrow_back</span>
                        </button>
                    )}

                    {!is404 && (
                        <div onClick={() => onNavigate(config.defaultPage)}
                             style={{
                                 cursor: 'pointer',
                                 display: 'flex',
                                 alignItems: 'center',
                                 justifyContent: 'center',
                                 padding: '6px 16px 6px 8px',
                                 borderRadius: '100px',
                                 transition: 'background 0.2s',
                                 flexShrink: 0,
                                 gap: '12px'
                             }}
                             onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(var(--md-sys-color-on-surface-rgb), 0.08)'}
                             onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                            {config.materialIcon ? (
                                <span className="material-symbols-outlined"
                                      style={{fontSize: '28px', color: 'var(--md-sys-color-primary)'}}>
                                    {config.materialIcon}
                                </span>
                            ) : (
                                <img src={config.appIcon} alt=""
                                     style={{width: '28px', height: '28px', objectFit: 'contain', borderRadius: '6px'}}/>
                            )}

                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={displayTitle}
                                    initial={{ opacity: 0, x: -10, filter: "blur(4px)" }}
                                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, x: 10, filter: "blur(4px)" }}
                                    transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
                                    style={{
                                        fontWeight: 700,
                                        fontSize: '1.1rem',
                                        color: 'var(--md-sys-color-on-surface)',
                                        whiteSpace: 'nowrap',
                                        letterSpacing: '-0.01em'
                                    }}
                                >
                                    {displayTitle}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    )}
                </div>

                <div
                    className={`top-bar-center ${isSearchFocused ? 'search-focused' : ''} ${isFiltersOpen ? 'filter-active' : ''}`}
                    style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '0 16px'
                    }}
                >
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        maxWidth: '680px',
                        position: 'relative'
                    }}>
                        <div ref={searchContainerRef} style={{ display: 'flex', flex: 1, minWidth: 0, padding: 0, margin: 0, transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)' }}></div>

                        <button
                            ref={filterBtnRef}
                            className={`desktop-filter-btn ${hasFilters ? 'visible' : ''} ${isFiltersOpen ? 'active' : ''} ${hasSearch ? 'has-search' : ''}`}
                            onClick={() => setFiltersOpen(!isFiltersOpen)}
                            style={{
                                marginLeft: hasFilters && hasSearch ? '-1px' : '0',
                                zIndex: 2
                            }}
                        >
                            <span className="material-symbols-outlined">tune</span>
                        </button>
                    </div>
                </div>

                <div className="top-bar-right" style={{
                    width: '64px',
                    minWidth: '64px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    flexShrink: 0
                }}>
                </div>

                <div ref={bottomContainerRef}></div>
            </header>

            <div className={`desktop-corner-mask ${isVisible ? 'visible' : ''} ${isExpanded ? 'drawer' : 'rail'}`} />
        </>
    );
}