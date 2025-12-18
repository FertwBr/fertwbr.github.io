import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function AppNavbar({ config, activePage, onNavigate, strings }) {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const isSubPage = activePage !== 'index';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackClick = () => {
    if (isSubPage) {
      onNavigate('index');
    } else {
      navigate('/');
    }
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      zIndex: 100, 
      display: 'flex', 
      justifyContent: 'center', 
      padding: '20px', 
      pointerEvents: 'none' 
    }}>
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        style={{
          pointerEvents: 'auto',
          background: scrolled ? 'rgba(var(--md-sys-color-surface-rgb), 0.8)' : 'rgba(var(--md-sys-color-surface-container-rgb), 0.5)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '100px',
          padding: '8px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.2)' : 'none',
          transition: 'all 0.3s ease'
        }}
      >
        <button 
          onClick={handleBackClick} 
          style={{ 
            background: 'rgba(255,255,255,0.1)', 
            border: 'none', 
            borderRadius: '50%', 
            width: 40, height: 40, 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--md-sys-color-on-surface)',
            transition: 'background 0.2s'
          }}
          title={isSubPage ? strings.nav?.back_home : strings.nav?.back_portfolio}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
        >
          <span className="material-symbols-outlined">
            {isSubPage ? 'arrow_back' : 'close'}
          </span>
        </button>

        <div 
          onClick={() => isSubPage ? onNavigate('index') : null}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 12, 
            cursor: isSubPage ? 'pointer' : 'default', 
            borderLeft: '1px solid rgba(255,255,255,0.1)', 
            paddingLeft: 24 
          }}
        >
          <img src={config.appIcon} alt="" style={{ width: 32, height: 32, borderRadius: 8 }} />
          <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{config.appName}</span>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <a 
            href={config.playStoreLink} 
            target="_blank" 
            rel="noreferrer"
            className="btn-glow"
            style={{ padding: '8px 20px', fontSize: '0.9rem' }}
          >
            Download
          </a>
        </div>
      </motion.div>
    </div>
  );
}