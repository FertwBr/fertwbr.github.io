import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HomeHero({ appConfig, strings, onNavigate }) {
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 500], [0, 100]);
  const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      position: 'relative', 
      textAlign: 'center',
      padding: '80px 20px',
      boxSizing: 'border-box'
    }}>
      <motion.div style={{ y: yHero, opacity: opacityHero, maxWidth: '900px', zIndex: 1, width: '100%' }}>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '32px' }}
        >
          <img 
            src={appConfig.appIcon} 
            alt={appConfig.appName}
            style={{ 
              width: 'clamp(100px, 25vw, 140px)', height: 'auto', 
              borderRadius: '28px', 
              boxShadow: '0 20px 60px var(--md-sys-color-primary-fixed-dim)',
              marginBottom: '16px'
            }} 
          />
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ 
            fontSize: 'clamp(2.5rem, 8vw, 5rem)', 
            fontWeight: 800, 
            lineHeight: 1.1, 
            marginBottom: '20px',
            letterSpacing: '-1.5px'
          }}
        >
          {strings.title}
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ 
            fontSize: 'clamp(1.1rem, 4vw, 1.4rem)', 
            color: 'var(--md-sys-color-on-surface-variant)', 
            maxWidth: '650px', 
            margin: '0 auto 40px' 
          }}
        >
          {strings.subtitle}
        </motion.p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a href={appConfig.playStoreLink} target="_blank" rel="noreferrer" className="btn-glow" style={{ fontSize: '1rem', padding: '14px 28px' }}>
            <span className="material-symbols-outlined">download</span>
            {strings.download}
          </a>
          <button onClick={() => onNavigate('plus')} className="btn-outline" style={{ fontSize: '1rem', padding: '14px 28px' }}>
            <span className="material-symbols-outlined">diamond</span>
            {appConfig.appName}+
          </button>
        </motion.div>
      </motion.div>

      <div style={{ position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)', opacity: 0.5, animation: 'bounce 2s infinite' }}>
        <span className="material-symbols-outlined" style={{ color: 'var(--md-sys-color-primary)' }}>expand_more</span>
      </div>
    </section>
  );
}