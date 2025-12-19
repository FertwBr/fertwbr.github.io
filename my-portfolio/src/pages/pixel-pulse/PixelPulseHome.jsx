import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { pixelPulseConfig } from './PixelPulseConfig';

export default function PixelPulseHome({ onNavigate, strings }) {
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 500], [0, 100]);
  const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", duration: 0.8 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div style={{ width: '100%', overflowX: 'hidden', boxSizing: 'border-box' }}>
      
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
              src={pixelPulseConfig.appIcon} 
              alt="Pixel Pulse" 
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
            {strings.hero.title}
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
            {strings.hero.subtitle}
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <a href={pixelPulseConfig.playStoreLink} target="_blank" rel="noreferrer" className="btn-glow" style={{ fontSize: '1rem', padding: '14px 28px' }}>
              <span className="material-symbols-outlined">download</span>
              {strings.hero.download}
            </a>
            <button onClick={() => onNavigate('plus')} className="btn-outline" style={{ fontSize: '1rem', padding: '14px 28px' }}>
              <span className="material-symbols-outlined">diamond</span>
              Pixel Pulse+
            </button>
          </motion.div>
        </motion.div>

        <div style={{ position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)', opacity: 0.5, animation: 'bounce 2s infinite' }}>
          <span className="material-symbols-outlined" style={{ color: 'var(--md-sys-color-primary)' }}>expand_more</span>
        </div>
      </section>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', boxSizing: 'border-box' }}>
        
        <motion.section 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          style={{ marginBottom: '120px' }}
        >
          <motion.div variants={fadeInUp} style={{ textAlign: 'center', marginBottom: '48px' }}>
             <span style={{ color: 'var(--md-sys-color-primary)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                {strings.new_features.label}
             </span>
             <h2 style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', marginTop: '12px' }}>{strings.new_features.title}</h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '20px', marginBottom: '40px' }}>
             {strings.new_features.items.map((item, index) => (
               <motion.div 
                  key={index}
                  variants={fadeInUp} 
                  className="glass-card" 
                  onClick={() => onNavigate('changelog')}
                  style={{ padding: '32px', borderRadius: '28px', cursor: 'pointer' }}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.03)' }}
                  whileTap={{ scale: 0.98 }}
               >
                  <span className="material-symbols-outlined" style={{ fontSize: '40px', color: 'var(--md-sys-color-primary)', marginBottom: '20px' }}>
                    {item.icon}
                  </span>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>{item.title}</h3>
                  <p style={{ color: 'var(--md-sys-color-on-surface-variant)', fontSize: '1rem' }}>
                    {item.desc}
                  </p>
               </motion.div>
             ))}
          </div>

          <motion.div variants={fadeInUp} style={{ textAlign: 'center' }}>
            <button 
              onClick={() => onNavigate('changelog')} 
              className="btn-outline" 
              style={{ padding: '12px 32px' }}
            >
              {strings.new_features.view_history} <span className="material-symbols-outlined">history</span>
            </button>
          </motion.div>
        </motion.section>

        <motion.section 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          style={{ marginBottom: '120px' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', marginBottom: '20px' }}>{strings.features.title}</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '20px', marginBottom: '40px' }}>
            {strings.features.items.map((feature, i) => (
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
                       {['graphic_eq', 'history', 'tune', 'palette'][i]}
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
              {strings.features.cta_project} <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </motion.div>
        </motion.section>

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
                <h2 style={{ fontSize: 'clamp(2.2rem, 7vw, 3.5rem)', marginBottom: '20px', lineHeight: 1.1 }}>{strings.plus.title}</h2>
                <p style={{ fontSize: 'clamp(1.1rem, 4vw, 1.3rem)', color: 'var(--md-sys-color-on-surface-variant)', maxWidth: '700px', margin: '0 auto 48px' }}>
                   {strings.plus.desc}
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
                   {strings.plus.cta}
                </button>
            </div>
        </motion.section>

        <section style={{ marginBottom: '80px', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: '48px' }}>{strings.privacy_section.title}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '20px', marginBottom: '40px' }}>
                {strings.privacy_section.cards.map((card, i) => (
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
                  {strings.privacy_section.cta_policy}
               </button>
               <button 
                 onClick={() => onNavigate('overview')} 
                 className="btn-outline"
                 style={{ padding: '10px 24px', borderRadius: '100px' }}
               >
                  {strings.privacy_section.cta_tech}
               </button>
            </div>
        </section>

      </div>
    </div>
  );
}