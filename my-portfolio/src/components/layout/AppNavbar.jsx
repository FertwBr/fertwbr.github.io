import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function AppNavbar({ config, activePage, onNavigate, strings }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navigate = useNavigate();
  
  const isSubPage = activePage !== 'index';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 30);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleBackClick = () => {
    if (isSubPage) {
      if (onNavigate) onNavigate('index');
    } else {
      navigate('/');
    }
  };

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          display: 'flex', justifyContent: 'center',
          padding: '16px', pointerEvents: 'none'
        }}
      >
        <motion.div
          style={{
            pointerEvents: 'auto',
            background: isScrolled
              ? 'rgba(var(--md-sys-color-surface-container-rgb), 0.85)'
              : 'rgba(var(--md-sys-color-surface-container-rgb), 0.5)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '100px',
            padding: '6px 16px 6px 6px',
            display: 'flex', alignItems: 'center',
            gap: '12px',
            boxShadow: isScrolled ? '0 8px 32px rgba(0,0,0,0.2)' : 'none',
            maxWidth: '100%',
            transition: 'background 0.3s ease, box-shadow 0.3s ease'
          }}
        >
          <button
            onClick={handleBackClick}
            style={{
              background: 'var(--md-sys-color-secondary-container)',
              border: 'none', borderRadius: '50%',
              width: 36, height: 36,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--md-sys-color-on-secondary-container)',
              outline: 'none', WebkitTapHighlightColor: 'transparent'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
              {isSubPage ? 'arrow_back' : 'close'}
            </span>
          </button>

          <div
            onClick={() => isSubPage && onNavigate ? onNavigate('index') : null}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              cursor: isSubPage && onNavigate ? 'pointer' : 'default',
              paddingRight: '8px',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            {config.materialIcon ? (
              <span className="material-symbols-outlined" style={{ fontSize: '24px', color: 'var(--md-sys-color-primary)' }}>
                {config.materialIcon}
              </span>
            ) : (
              <img src={config.appIcon} alt="" style={{ width: 28, height: 28, borderRadius: 6 }} />
            )}

            <span style={{
              fontWeight: 700, fontSize: '0.95rem',
              whiteSpace: 'nowrap',
              color: 'var(--md-sys-color-on-surface)'
            }}>
              {config.appName}
            </span>
          </div>
        </motion.div>
      </motion.nav>
    </AnimatePresence>
  );
}