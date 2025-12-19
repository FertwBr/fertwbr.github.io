import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function AppNavbar({ config, activePage, onNavigate, strings }) {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const isSubPage = activePage !== 'index';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackClick = () => {
    isSubPage ? onNavigate('index') : navigate('/');
  };

  return (
    <nav style={{ 
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, 
      display: 'flex', justifyContent: 'center', 
      padding: '16px', pointerEvents: 'none' 
    }}>
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          pointerEvents: 'auto',
          background: scrolled ? 'var(--md-sys-color-surface-container-highest)' : 'var(--md-sys-color-surface-container-low)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid var(--md-sys-color-outline-variant)',
          borderRadius: '100px',
          padding: '6px 16px 6px 6px',
          display: 'flex', alignItems: 'center',
          gap: '12px',
          boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.15)' : 'none',
          maxWidth: '100%',
          transition: 'all 0.3s ease'
        }}
      >
        <button 
          onClick={handleBackClick} 
          style={{ 
            background: 'var(--md-sys-color-secondary-container)', 
            border: 'none', borderRadius: '50%', 
            width: 36, height: 36, 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--md-sys-color-on-secondary-container)'
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
            {isSubPage ? 'arrow_back' : 'close'}
          </span>
        </button>

        <div 
          onClick={() => isSubPage ? onNavigate('index') : null}
          style={{ 
            display: 'flex', alignItems: 'center', gap: 10, 
            cursor: isSubPage ? 'pointer' : 'default',
            paddingRight: '8px' 
          }}
        >
          <img src={config.appIcon} alt="" style={{ width: 28, height: 28, borderRadius: 6 }} />
          <span style={{ 
            fontWeight: 700, fontSize: '0.95rem', 
            whiteSpace: 'nowrap',
            color: 'var(--md-sys-color-on-surface)'
          }}>
            {config.appName}
          </span>
        </div>
      </motion.div>
    </nav>
  );
}