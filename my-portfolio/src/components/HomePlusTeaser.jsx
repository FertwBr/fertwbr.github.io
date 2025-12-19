import React from 'react';
import { motion } from 'framer-motion';

export default function HomePlusTeaser({ strings, onNavigate }) {
  return (
    <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ 
          borderRadius: '40px', 
          background: 'linear-gradient(180deg, var(--md-sys-color-primary-container) 0%, var(--md-sys-color-surface) 100%)',
          border: '1px solid var(--md-sys-color-outline-variant)',
          padding: '60px 24px',
          textAlign: 'center',
          marginBottom: '120px',
          position: 'relative',
          overflow: 'hidden'
        }}
    >
        <div style={{ position: 'relative', zIndex: 2 }}>
            <span className="material-symbols-outlined" style={{ fontSize: '56px', color: 'var(--md-sys-color-primary)', marginBottom: '24px' }}>diamond</span>
            <h2 style={{ fontSize: 'clamp(2.2rem, 7vw, 3.5rem)', marginBottom: '20px', lineHeight: 1.1 }}>{strings.title}</h2>
            <p style={{ fontSize: 'clamp(1.1rem, 4vw, 1.3rem)', color: 'var(--md-sys-color-on-surface-variant)', maxWidth: '700px', margin: '0 auto 48px' }}>
               {strings.desc}
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '24px', maxWidth: '1000px', margin: '0 auto 48px auto', textAlign: 'left' }}>
                {[
                    { icon: 'shield', title: 'Noise Budget', desc: 'WHO-based weekly tracking' },
                    { icon: 'notifications_active', title: 'Proactive Alerts', desc: 'Get notified before damage' },
                    { icon: 'auto_awesome', title: 'Auto Monitoring', desc: 'Background exposure tracking' },
                    { icon: 'table_chart', title: 'CSV Export', desc: 'Full data ownership' }
                ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <span className="material-symbols-outlined" style={{ color: 'var(--md-sys-color-primary)', fontSize: '20px' }}>{item.icon}</span>
                        <div>
                            <h4 style={{ fontSize: '1rem', marginBottom: '2px' }}>{item.title}</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--md-sys-color-on-surface-variant)' }}>{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={() => onNavigate('plus')} className="btn-glow" style={{ fontSize: '1.1rem', padding: '16px 36px' }}>
               {strings.cta}
            </button>
        </div>
    </motion.section>
  );
}