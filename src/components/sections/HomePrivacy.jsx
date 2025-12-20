import React from 'react';
import { motion } from 'framer-motion';

export default function HomePrivacy({ strings, onNavigate }) {
  return (
    <section style={{ marginBottom: '80px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: '48px' }}>{strings.title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '20px', marginBottom: '40px' }}>
            {strings.cards.map((card, i) => (
              <motion.div 
                key={i} 
                className="glass-card" 
                onClick={() => onNavigate('privacy')}
                style={{ padding: '28px' }}
                whileHover={{ y: -5, cursor: 'pointer', backgroundColor: 'rgba(255,255,255,0.03)' }}
              >
                  <span className="material-symbols-outlined" style={{ fontSize: '36px', color: 'var(--md-sys-color-primary)', marginBottom: '16px' }}>
                    {card.icon}
                  </span>
                  <h3 style={{ fontSize: '1.2rem' }}>{card.title}</h3>
                  <p style={{ color: 'var(--md-sys-color-on-surface-variant)', fontSize: '0.95rem' }}>{card.desc}</p>
              </motion.div>
            ))}
        </div>
        
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
           <button 
             onClick={() => onNavigate('privacy')} 
             className="btn-outline"
             style={{ padding: '10px 24px', borderRadius: '100px' }}
           >
              {strings.cta_policy}
           </button>
           <button 
             onClick={() => onNavigate('overview')} 
             className="btn-outline"
             style={{ padding: '10px 24px', borderRadius: '100px' }}
           >
              {strings.cta_tech}
           </button>
        </div>
    </section>
  );
}