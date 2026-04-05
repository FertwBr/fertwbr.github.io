import React, {useState, useEffect, useRef} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {useNavigate, useLocation, Link} from 'react-router-dom';
import {NAV_ITEMS, GLASS_STYLE, SPRING_TRANSITION} from './navShared';
import {SiteConfig} from '../../utils/siteConstants';
import UniversalControls from '../common/UniversalControls';

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
export default function NavbarMobile({config, activePage, onNavigate, strings}) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const lastScrollY = useRef(0);

    const navigate = useNavigate();
    const location = useLocation();
    const is404 = activePage === '404';

    const visibleNavItems = NAV_ITEMS.filter(item => {
        if (item.id === 'feedback') return true;

        if (config?.pages && !config.pages[item.id] && item.id !== 'index') {
            return false;
        }

        if (item.id === 'overview' && !config.enableDocs) return false;

        return strings && (strings[item.id] || item.id === 'feedback');
    });

    useEffect(() => {
        if (isMobileMenuOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isMobileMenuOpen) {
                const clickedMenu = e.target.closest('.mobile-toggle-wrapper');
                const clickedControls = e.target.closest('.floating-controls-wrapper');
                const clickedBackdrop = e.target.classList.contains('mobile-nav-backdrop');

                if (clickedBackdrop || (!clickedMenu && !clickedControls)) {
                    setMobileMenuOpen(false);
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isMobileMenuOpen]);

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
            } else if (isAtBottom && !isMobileMenuOpen) {
                setIsVisible(false);
            } else if (currentScrollY > lastScrollY.current && currentScrollY > 100 && !isMobileMenuOpen) {
                setIsVisible(false);
            } else if (currentScrollY < lastScrollY.current || currentScrollY < 50) {
                setIsVisible(true);
            }
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll, {passive: true});
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobileMenuOpen]);

    /**
     * @param {string} id
     */
    const handleNavClick = (id) => {
        if (id === 'feedback') {
            const sourceParam = config?.scheme ? `?source=${config.scheme}` : '';
            navigate(`/feedback${sourceParam}`);
        } else {
            onNavigate(id);
        }
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

    const displayTitle = is404 ? '404' : (strings?.[activePage] || config.appName);

    return (
        <>
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="mobile-nav-backdrop"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.3}}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.3)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            zIndex: 99,
                            pointerEvents: 'auto'
                        }}
                    />
                )}
            </AnimatePresence>

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
                        layout
                        className="main-glass-nav"
                        transition={SMOOTH_SPRING}
                        style={{
                            ...GLASS_STYLE(isScrolled),
                            pointerEvents: 'auto',
                            borderRadius: '100px',
                            padding: '6px 18px 6px 6px',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            flex: 1,
                            minWidth: 0,
                            overflow: 'hidden'
                        }}
                    >
                        <motion.div layout className="nav-top-row" transition={SMOOTH_SPRING}
                                    style={{
                                        minHeight: '42px',
                                        width: '100%',
                                        justifyContent: 'flex-start',
                                        minWidth: 0
                                    }}>
                            <motion.div layout className="nav-brand-area" transition={SMOOTH_SPRING}
                                        style={{gap: '12px', alignItems: 'center', flex: 1, minWidth: 0}}>
                                <motion.button
                                    layout
                                    onClick={handleBackAction}
                                    className="nav-back-btn"
                                    whileTap={{scale: 0.9}}
                                    transition={SMOOTH_SPRING}
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
                                    style={{gap: '10px', padding: 0, flex: 1, minWidth: 0, overflow: 'hidden'}}
                                >
                                    <motion.div layout transition={SMOOTH_SPRING}
                                                style={{display: 'flex', alignItems: 'center'}}>
                                        {config.materialIcon ? (
                                            <span
                                                className="material-symbols-outlined nav-brand-icon">{config.materialIcon}</span>
                                        ) : (
                                            <img src={config.appIcon} alt="" className="nav-brand-image"/>
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
                                            style={{
                                                display: 'block',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}
                                        >
                                            {displayTitle}
                                        </motion.span>
                                    </AnimatePresence>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {!is404 && (
                        <motion.div
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
                                justifyContent: isMobileMenuOpen ? 'space-between' : 'center',
                                alignItems: 'center',
                                padding: '8px',
                                minWidth: '56px'
                            }}>
                                <AnimatePresence>
                                    {isMobileMenuOpen && (
                                        <motion.div
                                            initial={{opacity: 0, x: -10}}
                                            animate={{opacity: 1, x: 0}}
                                            exit={{opacity: 0, x: -10}}
                                            transition={{duration: 0.2}}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                paddingLeft: '16px'
                                            }}
                                        >
                                            <span style={{
                                                fontSize: '1.05rem',
                                                fontWeight: 700,
                                                lineHeight: '1.2',
                                                color: 'var(--md-sys-color-on-surface)'
                                            }}>
                                                {config.appName}
                                            </span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <motion.button
                                    layout="position"
                                    onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                                    className="nav-icon-btn-mobile-toggle"
                                    style={{
                                        backgroundColor: isMobileMenuOpen ? 'var(--md-sys-color-secondary-container)' : 'transparent',
                                        color: isMobileMenuOpen ? 'var(--md-sys-color-on-secondary-container)' : 'var(--md-sys-color-on-surface)',
                                        marginLeft: isMobileMenuOpen ? 'auto' : '0'
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
                                        {isMobileMenuOpen ? 'keyboard_arrow_down' : 'menu'}
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
                                                <span className="mobile-nav-item-icon">
                                                    <span className="material-symbols-outlined">{item.icon}</span>
                                                </span>
                                                <span>{strings?.[item.id] || (item.id === 'feedback' ? 'Feedback' : item.id)}</span>
                                            </motion.button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </motion.nav>
            </AnimatePresence>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="floating-controls-wrapper"
                        initial={{y: 80, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        exit={{y: 80, opacity: 0}}
                        transition={SMOOTH_SPRING}
                        style={{
                            position: 'fixed',
                            bottom: '24px',
                            left: '24px',
                            right: '24px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            zIndex: 101,
                            pointerEvents: 'auto'
                        }}
                    >
                        <Link
                            to={SiteConfig.routes.siteChangelog}
                            onClick={() => setMobileMenuOpen(false)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '44px',
                                background: 'var(--md-sys-color-surface-container-high)',
                                padding: '0 20px',
                                borderRadius: '22px',
                                textDecoration: 'none',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }}
                        >
                            <span style={{
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                fontFamily: 'monospace',
                                color: 'var(--md-sys-color-on-surface)'
                            }}>
                                v{SiteConfig?.meta?.version || '1.0'}
                            </span>
                        </Link>

                        <UniversalControls compact={true}/>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}