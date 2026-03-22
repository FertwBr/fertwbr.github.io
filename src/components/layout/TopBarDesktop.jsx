// src/components/layout/TopBarDesktop.jsx
import React, {useState, useEffect, useRef} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';

/**
 * TopBarDesktop component.
 * Renders the top application bar for desktop screens.
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

    const bottomPortalRef = useRef(null);
    const searchPortalRef = useRef(null);
    const filterBtnRef = useRef(null);

    const navigate = useNavigate();
    const location = useLocation();
    const is404 = activePage === '404';

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20 && isFiltersOpen) setFiltersOpen(false);
        };
        window.addEventListener('scroll', handleScroll, {passive: true});
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isFiltersOpen]);

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
        const portal = searchPortalRef.current;
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
            if (isFiltersOpen && bottomPortalRef.current && !bottomPortalRef.current.contains(e.target)) {
                if (filterBtnRef.current && filterBtnRef.current.contains(e.target)) return;
                setFiltersOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
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
                    background: isVisible ? 'var(--md-sys-color-surface-container)' : 'rgba(var(--md-sys-color-surface-rgb), 0.75)',
                    backdropFilter: isVisible ? 'none' : 'blur(24px)',
                    WebkitBackdropFilter: isVisible ? 'none' : 'blur(24px)',
                    borderBottom: 'none',
                    transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 16px',
                    width: '100%',
                    boxSizing: 'border-box'
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
                                 padding: '6px',
                                 borderRadius: '50%',
                                 transition: 'background 0.2s',
                                 flexShrink: 0
                             }}
                             onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(var(--md-sys-color-on-surface-rgb), 0.08)'}
                             onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                            {config.materialIcon ? (
                                <span className="material-symbols-outlined"
                                      style={{fontSize: '24px', color: 'var(--md-sys-color-primary)'}}>
                                    {config.materialIcon}
                                </span>
                            ) : (
                                <img src={config.appIcon} alt=""
                                     style={{width: '24px', height: '24px', objectFit: 'contain'}}/>
                            )}
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
                        <div id="appbar-search-portal" ref={searchPortalRef}
                             className={`appbar-search-portal-desktop ${hasFilters ? 'has-filters' : ''}`}
                             style={{flex: 1}}></div>

                        <button
                            ref={filterBtnRef}
                            className={`desktop-filter-btn ${hasFilters ? 'visible' : ''} ${isFiltersOpen ? 'active' : ''} ${hasSearch ? 'has-search' : ''}`}
                            onClick={() => setFiltersOpen(!isFiltersOpen)}
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

                <div id="appbar-bottom-portal" ref={bottomPortalRef}
                     className={`appbar-bottom-portal ${isFiltersOpen ? 'open' : ''}`}></div>
            </header>

            <div style={{
                position: 'fixed',
                top: 64,
                left: !isVisible ? 0 : (isExpanded ? 280 : 80),
                width: 32,
                height: 32,
                pointerEvents: 'none',
                zIndex: 195,
                background: 'radial-gradient(circle at 100% 100%, transparent 32px, var(--md-sys-color-surface-container) 32px)',
                opacity: isVisible ? 1 : 0,
                transition: 'left 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
            }}/>
        </>
    );
}