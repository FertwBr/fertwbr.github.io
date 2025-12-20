import React from 'react';
import { motion } from 'framer-motion';

export default function HomeFeaturesGrid({ strings, onNavigate }) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", duration: 0.8 } }
  };

  return (
    <motion.section 
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.15 } }
      }}
      style={{ marginBottom: '120px' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', marginBottom: '20px' }}>{strings.title}</h2>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '20px', marginBottom: '40px' }}>
        {strings.items.map((feature, i) => (
          <motion.div 
            key={i} 
            variants={fadeInUp}
            className="glass-card" 
            style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px' }}
            whileHover={{ y: -8 }}
          >
             <div style={{ 
               width: '56px', height: '56px', borderRadius: '16px', 
               background: 'var(--md-sys-color-primary-container)', 
               color: 'var(--md-sys-color-on-primary-container)', 
               display: 'flex', alignItems: 'center', justifyContent: 'center' 
             }}>
                <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>
                   {['graphic_eq', 'history', 'tune', 'palette'][i] || 'star'}
                </span>
             </div>
             <h3 style={{ fontSize: '1.2rem' }}>{feature.title}</h3>
             <p style={{ color: 'var(--md-sys-color-on-surface-variant)', lineHeight: 1.5, fontSize: '0.95rem' }}>{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div variants={fadeInUp} style={{ textAlign: 'center' }}>
        <button 
          onClick={() => onNavigate('overview')} 
          className="btn-outline" 
          style={{ padding: '12px 32px', borderRadius: '100px' }}
        >
          {strings.cta_project} <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </motion.div>
    </motion.section>
  );
}