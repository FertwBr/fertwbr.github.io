import React, {useState, useEffect, useRef} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {useNavigate} from 'react-router-dom';

const NAV_ITEMS = [
    {id: 'index', icon: 'home'},
    {id: 'overview', icon: 'description'},
    {id: 'plus', icon: 'diamond'},
    {id: 'changelog', icon: 'history'},
    {id: 'roadmap', icon: 'map'},
];

const SPRING_TRANSITION = {
    type: "spring",
    stiffness: 400,
    damping: 40,
    mass: 1
};

const GLASS_STYLE = (isScrolled, isActive = false) => ({
    background: isScrolled || isActive
        ? 'rgba(var(--md-sys-color-surface-container-rgb), 0.95)'
        : 'rgba(var(--md-sys-color-surface-container-rgb), 0.6)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: isScrolled ? '0 8px 32px rgba(0,0,0,0.15)' : 'none',
});

const MENU_ITEM_VARIANTS = {
    hidden: {y: 10, opacity: 0},
    show: {y: 0, opacity: 1},
    exit: {y: -5, opacity: 0}
};

const MENU_CONTAINER_VARIANTS = {
    hidden: {opacity: 0},
    show: {
        opacity: 1,
        transition: {staggerChildren: 0.08, delayChildren: 0.1}
    },
    exit: {
        opacity: 0,
        transition: {duration: 0.1}
    }
};

export default function AppNavbar({config, activePage, onNavigate, strings}) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    const mobileMenuRef = useRef(null);
    const navigate = useNavigate();
    const is404 = activePage === '404';

    const visibleNavItems = NAV_ITEMS.filter(item => {

        if (item.id === 'overview' && !config.enableDocs) return false;

        return strings && strings[item.id];
    });

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
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

            if (currentScrollY > lastScrollY && currentScrollY > 100 && !isMobileMenuOpen) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, {passive: true});
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY, isMobileMenuOpen]);

    const handleNavClick = (id) => {
        onNavigate(id);
        setMobileMenuOpen(false);
    };

    const handleBackAction = () => {
        const isAtProjectRoot = activePage === config.defaultPage;

        if (isAtProjectRoot) {
            navigate('/');
        } else {
            onNavigate(config.defaultPage || 'index');
        }
    };

    return (
        <AnimatePresence>
            <motion.nav
                role="navigation"
                aria-label="Main Navigation"
                initial={{y: -100, opacity: 0}}
                animate={{
                    y: isVisible ? 0 : -120,
                    opacity: isVisible ? 1 : 0
                }}
                transition={{duration: 0.4, ease: [0.22, 1, 0.36, 1]}}
                style={{
                    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '12px',
                    padding: '16px',
                    pointerEvents: 'none',
                    width: '100%'
                }}
            >
                <motion.div
                    layout
                    transition={SPRING_TRANSITION}
                    style={{
                        ...GLASS_STYLE(isScrolled),
                        pointerEvents: 'auto',
                        padding: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: '50px',
                        height: '54px',
                        flexShrink: 1,
                        maxWidth: '100%'
                    }}
                >
                    <motion.button
                        layout="position"
                        onClick={handleBackAction}
                        aria-label={activePage === config.defaultPage ? "Close app" : strings?.back || "Back"}
                        style={{
                            background: 'var(--md-sys-color-secondary-container)',
                            border: 'none', borderRadius: '50%',
                            width: 40, height: 40,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', color: 'var(--md-sys-color-on-secondary-container)',
                            flexShrink: 0, marginRight: 8
                        }}
                        whileTap={{scale: 0.9}}
                    >
                        <motion.span
                            key={activePage === config.defaultPage ? 'close' : 'back'}
                            initial={{rotate: -90, opacity: 0}}
                            animate={{rotate: 0, opacity: 1}}
                            transition={{duration: 0.2}}
                            className="material-symbols-outlined"
                            style={{fontSize: '20px'}}
                            aria-hidden="true"
                        >
                            {activePage === config.defaultPage ? 'close' : 'arrow_back'}
                        </motion.span>
                    </motion.button>

                    <motion.div
                        layout="position"
                        onClick={() => !is404 && handleNavClick(config.defaultPage)}
                        role={!is404 ? "button" : undefined}
                        tabIndex={!is404 ? 0 : -1}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 10,
                            cursor: is404 ? 'default' : 'pointer',
                            paddingRight: '12px',
                            paddingLeft: '4px'
                        }}
                    >
                        {config.materialIcon ? (
                            <span className="material-symbols-outlined"
                                  style={{fontSize: '24px', color: 'var(--md-sys-color-primary)'}}>
                {config.materialIcon}
              </span>
                        ) : (
                            <img src={config.appIcon} alt="" style={{width: 28, height: 28, borderRadius: 6}}/>
                        )}
                        <motion.span
                            style={{
                                fontWeight: 700,
                                fontSize: '0.95rem',
                                whiteSpace: 'nowrap',
                                color: 'var(--md-sys-color-on-surface)'
                            }}
                        >
                            {config.appName}
                        </motion.span>
                    </motion.div>

                    {!is404 && (
                        <div className="desktop-menu" style={{display: 'flex', gap: '4px', paddingLeft: '8px'}}>
                            {visibleNavItems.map((item) => {
                                const isActive = activePage === item.id;
                                const label = strings?.[item.id];

                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => handleNavClick(item.id)}
                                        aria-current={isActive ? 'page' : undefined}
                                        style={{
                                            position: 'relative',
                                            background: 'transparent',
                                            color: isActive ? 'var(--md-sys-color-on-primary)' : 'var(--md-sys-color-on-surface-variant)',
                                            border: 'none', borderRadius: '100px',
                                            padding: '10px 20px',
                                            fontSize: '0.85rem', fontWeight: isActive ? 600 : 500,
                                            cursor: 'pointer',
                                            display: 'flex', alignItems: 'center', gap: '8px',
                                            zIndex: 1
                                        }}
                                    >
                                        {isActive && (
                                            <motion.span
                                                layoutId="nav-pill-background"
                                                transition={{type: "spring", bounce: 0.2, duration: 0.6}}
                                                style={{
                                                    position: 'absolute', inset: 0, borderRadius: '100px',
                                                    background: 'var(--md-sys-color-primary)', zIndex: -1
                                                }}
                                            />
                                        )}
                                        <span className="material-symbols-outlined" style={{fontSize: '18px'}}
                                              aria-hidden="true">{item.icon}</span>
                                        {label}
                                    </button>
                                );
                            })}
                        </div>
                    )}
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
                            width: isMobileMenuOpen ? '100%' : '54px',
                            height: isMobileMenuOpen ? 'auto' : '54px',
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: isMobileMenuOpen ? 'flex-end' : 'center',
                            padding: '7px',
                            minWidth: '54px'
                        }}>
                            <motion.button
                                layout="position"
                                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                                aria-expanded={isMobileMenuOpen}
                                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                                style={{
                                    background: isMobileMenuOpen ? 'var(--md-sys-color-secondary-container)' : 'transparent',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: 40,
                                    height: 40,
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
                                    transition={{duration: 0.2}}
                                    className="material-symbols-outlined"
                                    aria-hidden="true"
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
                                    initial="hidden"
                                    animate="show"
                                    exit="exit"
                                    style={{
                                        padding: '0 8px 8px 8px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '4px'
                                    }}
                                >
                                    {visibleNavItems.map(item => {
                                        const isActive = activePage === item.id;
                                        const label = strings?.[item.id];
                                        return (
                                            <motion.button
                                                key={item.id}
                                                variants={MENU_ITEM_VARIANTS}
                                                onClick={() => handleNavClick(item.id)}
                                                style={{
                                                    background: isActive ? 'var(--md-sys-color-secondary-container)' : 'transparent',
                                                    color: isActive ? 'var(--md-sys-color-on-secondary-container)' : 'var(--md-sys-color-on-surface)',
                                                    border: 'none', borderRadius: '16px',
                                                    padding: '16px',
                                                    fontSize: '1rem', fontWeight: 500,
                                                    cursor: 'pointer',
                                                    display: 'flex', alignItems: 'center', gap: '16px',
                                                    textAlign: 'left', width: '100%'
                                                }}
                                                whileTap={{scale: 0.98}}
                                            >
                                                <span className="material-symbols-outlined"
                                                      style={{color: isActive ? 'inherit' : 'var(--md-sys-color-primary)'}}>{item.icon}</span>
                                                <span>{label}</span>
                                            </motion.button>
                                        )
                                    })}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
                <style>{`
                  .desktop-menu { display: flex; }
                  .mobile-toggle-wrapper { display: none !important; }
                  @media (max-width: 850px) {
                    .desktop-menu { display: none !important; }
                    .mobile-toggle-wrapper { display: flex !important; }
                  }
                `}</style>
            </motion.nav>
        </AnimatePresence>
    );
}