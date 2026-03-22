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
            <header
                className="top-bar-desktop"
                style={{
                    background: isVisible ? 'var(--md-sys-color-surface-container)' : 'rgba(var(--md-sys-color-surface-rgb), 0.75)',
                    backdropFilter: isVisible ? 'none' : 'blur(24px)',
                    WebkitBackdropFilter: isVisible ? 'none' : 'blur(24px)',
                    borderBottom: 'none',
                    transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
                }}
            >
                <div className="top-bar-left">
                    <div className="top-bar-hamburger-wrapper">
                        {!is404 && (
                            <button onClick={toggleSidebar} className="nav-icon-btn">
                                <span className="material-symbols-outlined" style={{
                                    transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                                    transform: isVisible ? 'scale(1)' : 'scale(0.9)',
                                    opacity: isVisible ? 1 : 0.8
                                }}>
                                    menu
                                </span>
                            </button>
                        )}
                    </div>

                    <div style={{
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'center',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap'
                    }}>
                        {isDeepPage && (
                            <button onClick={handleBackAction} className="nav-icon-btn"
                                    style={{width: '36px', height: '36px'}}>
                                <span className="material-symbols-outlined" style={{fontSize: '20px'}}>arrow_back</span>
                            </button>
                        )}
                        <div onClick={() => !is404 && onNavigate(config.defaultPage)} className="nav-brand-container"
                             style={{paddingLeft: isDeepPage ? 0 : '6px'}}>
                            {config.materialIcon ? (
                                <span className="material-symbols-outlined nav-brand-icon" style={{fontSize: '28px'}}>
                                    {config.materialIcon}
                                </span>
                            ) : (
                                <img src={config.appIcon} alt="" className="nav-brand-image"
                                     style={{width: '28px', height: '28px'}}/>
                            )}
                            <span className="nav-brand-text">{config.appName}</span>
                        </div>
                    </div>
                </div>

                <div
                    className={`top-bar-center ${isSearchFocused ? 'search-focused' : ''} ${isFiltersOpen ? 'filter-active' : ''}`}>
                    <div id="appbar-search-portal" ref={searchPortalRef}
                         className={`appbar-search-portal-desktop ${hasFilters ? 'has-filters' : ''}`}></div>

                    <button
                        ref={filterBtnRef}
                        className={`desktop-filter-btn ${hasFilters ? 'visible' : ''} ${isFiltersOpen ? 'active' : ''} ${hasSearch ? 'has-search' : ''}`}
                        onClick={() => setFiltersOpen(!isFiltersOpen)}
                    >
                        <span className="material-symbols-outlined">tune</span>
                    </button>
                </div>

                <div className="top-bar-right">
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