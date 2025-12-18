import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { pixelPulseConfig } from './PixelPulseConfig';

export default function PixelPulseHome({ onNavigate, strings }) {
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { type: "spring", duration: 0.8 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      
      <section style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        position: 'relative', 
        textAlign: 'center',
        padding: '0 24px'
      }}>
        <motion.div style={{ y: yHero, opacity: opacityHero, maxWidth: '900px', zIndex: 1 }}>
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '40px' }}
          >
            <img 
              src={pixelPulseConfig.appIcon} 
              alt="Pixel Pulse" 
              style={{ 
                width: '140px', height: '140px', 
                borderRadius: '32px', 
                boxShadow: '0 20px 60px rgba(59,161,116,0.4)',
                marginBottom: '24px'
              }} 
            />
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ 
              fontSize: 'clamp(3rem, 6vw, 5rem)', 
              fontWeight: 800, 
              lineHeight: 1.1, 
              marginBottom: '24px',
              letterSpacing: '-2px'
            }}
          >
            {strings.hero.title}
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ 
              fontSize: '1.4rem', 
              color: 'var(--md-sys-color-on-surface-variant)', 
              maxWidth: '650px', 
              margin: '0 auto 48px' 
            }}
          >
            {strings.hero.subtitle}
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <a href={pixelPulseConfig.playStoreLink} target="_blank" rel="noreferrer" className="btn-glow" style={{ fontSize: '1.1rem', padding: '16px 32px' }}>
              <span className="material-symbols-outlined">download</span>
              {strings.hero.download}
            </a>
            <button onClick={() => onNavigate('plus')} className="btn-outline" style={{ fontSize: '1.1rem', padding: '16px 32px' }}>
              <span className="material-symbols-outlined">diamond</span>
              Pixel Pulse+
            </button>
          </motion.div>
        </motion.div>

        <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', opacity: 0.5, animation: 'bounce 2s infinite' }}>
          <span className="material-symbols-outlined">expand_more</span>
        </div>
      </section>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        
        <motion.section 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          style={{ marginBottom: '160px' }}
        >
          <motion.div variants={fadeInUp} style={{ textAlign: 'center', marginBottom: '60px' }}>
             <span style={{ color: '#3BA174', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
                {strings.new_features.label}
             </span>
             <h2 style={{ fontSize: '3rem', marginTop: '16px' }}>{strings.new_features.title}</h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '48px' }}>
             {strings.new_features.items.map((item, index) => (
               <motion.div 
                  key={index}
                  variants={fadeInUp} 
                  className="glass-card" 
                  onClick={() => onNavigate('changelog')}
                  style={{ padding: '40px', borderRadius: '32px', cursor: 'pointer' }}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.03)' }}
                  whileTap={{ scale: 0.98 }}
               >
                  <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#3BA174', marginBottom: '24px' }}>
                    {item.icon}
                  </span>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>{item.title}</h3>
                  <p style={{ color: 'var(--md-sys-color-on-surface-variant)', fontSize: '1.1rem' }}>
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
          style={{ marginBottom: '160px' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '24px' }}>{strings.features.title}</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
            {strings.features.items.map((feature, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                className="glass-card" 
                style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              >
                 <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: 'rgba(59,161,116,0.1)', color: '#3BA174', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
                       {['graphic_eq', 'history', 'tune', 'palette'][i]}
                    </span>
                 </div>
                 <h3 style={{ fontSize: '1.4rem' }}>{feature.title}</h3>
                 <p style={{ color: 'var(--md-sys-color-on-surface-variant)', lineHeight: 1.6 }}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeInUp} style={{ textAlign: 'center' }}>
            <button 
              onClick={() => onNavigate('overview')} 
              className="btn-outline" 
              style={{ padding: '14px 32px', borderRadius: '100px' }}
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
              borderRadius: '48px', 
              background: 'linear-gradient(180deg, rgba(59,161,116,0.15) 0%, rgba(15,17,21,1) 100%)',
              border: '1px solid rgba(59,161,116,0.3)',
              padding: '80px 40px',
              textAlign: 'center',
              marginBottom: '160px',
              position: 'relative',
              overflow: 'hidden'
            }}
        >
            <div style={{ position: 'relative', zIndex: 2 }}>
                <span className="material-symbols-outlined" style={{ fontSize: '64px', color: '#3BA174', marginBottom: '32px' }}>diamond</span>
                <h2 style={{ fontSize: '3.5rem', marginBottom: '24px', lineHeight: 1 }}>{strings.plus.title}</h2>
                <p style={{ fontSize: '1.4rem', color: 'var(--md-sys-color-on-surface-variant)', maxWidth: '700px', margin: '0 auto 48px' }}>
                   {strings.plus.desc}
                </p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', maxWidth: '1000px', margin: '0 auto 60px auto', textAlign: 'left' }}>
                    {[
                        { icon: 'shield', title: 'Noise Budget', desc: 'WHO-based weekly tracking' },
                        { icon: 'notifications_active', title: 'Proactive Alerts', desc: 'Get notified before damage' },
                        { icon: 'auto_awesome', title: 'Auto Monitoring', desc: 'Background exposure tracking' },
                        { icon: 'table_chart', title: 'CSV Export', desc: 'Full data ownership' }
                    ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                            <span className="material-symbols-outlined" style={{ color: '#3BA174' }}>{item.icon}</span>
                            <div>
                                <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{item.title}</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--md-sys-color-on-surface-variant)' }}>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <button onClick={() => onNavigate('plus')} className="btn-glow" style={{ fontSize: '1.2rem', padding: '18px 40px', background: '#3BA174' }}>
                   {strings.plus.cta}
                </button>
            </div>
        </motion.section>

        <section style={{ marginBottom: '100px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '60px' }}>{strings.privacy_section.title}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
                {strings.privacy_section.cards.map((card, i) => (
                  <motion.div 
                    key={i} 
                    className="glass-card" 
                    onClick={() => onNavigate('privacy')}
                    whileHover={{ y: -5, cursor: 'pointer', backgroundColor: 'rgba(255,255,255,0.03)' }}
                    style={{ padding: '32px' }}
                  >
                      <span className="material-symbols-outlined" style={{ fontSize: '40px', color: 'var(--md-sys-color-primary)', marginBottom: '16px' }}>
                        {card.icon}
                      </span>
                      <h3>{card.title}</h3>
                      <p style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>{card.desc}</p>
                  </motion.div>
                ))}
            </div>
            
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
               <button 
                 onClick={() => onNavigate('privacy')} 
                 className="btn-outline"
                 style={{ padding: '12px 24px', borderRadius: '100px' }}
               >
                  {strings.privacy_section.cta_policy}
               </button>
               <button 
                 onClick={() => onNavigate('overview')} 
                 className="btn-outline"
                 style={{ padding: '12px 24px', borderRadius: '100px' }}
               >
                  {strings.privacy_section.cta_tech}
               </button>
            </div>
        </section>

      </div>
    </div>
  );
}