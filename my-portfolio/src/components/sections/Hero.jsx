import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useState, useEffect } from "react";

export default function Hero({ t }) {
  const { scrollY } = useScroll();
  
  const yFast = useTransform(scrollY, [0, 1000], [0, -300]); 
  const ySlow = useTransform(scrollY, [0, 1000], [0, -150]);
  const yReverse = useTransform(scrollY, [0, 1000], [0, 100]);

  const yTextRange = useTransform(scrollY, [0, 500], [0, 150]);
  const smoothY = useSpring(yTextRange, { stiffness: 100, damping: 20 });
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % t.roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [t.roles]);

  return (
    <section style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      position: 'relative',
      padding: '80px 20px',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      
      <motion.div 
        style={{ y: yFast, position: 'absolute', top: '10%', left: '5%', zIndex: 0, pointerEvents: 'none' }}
      >
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ opacity: 0.1 }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 'clamp(60px, 15vw, 100px)', color: 'var(--md-sys-color-primary)' }}>android</span>
        </motion.div>
      </motion.div>

      <motion.div 
        style={{ y: ySlow, position: 'absolute', bottom: '15%', right: '5%', zIndex: 0, pointerEvents: 'none' }}
      >
        <motion.div
          animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{ opacity: 0.1 }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 'clamp(80px, 18vw, 120px)', color: 'var(--md-sys-color-tertiary)' }}>terminal</span>
        </motion.div>
      </motion.div>

      <motion.div 
        style={{ y: yReverse, position: 'absolute', top: '20%', right: '10%', zIndex: 0, pointerEvents: 'none' }}
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ opacity: 0.05 }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 'clamp(100px, 20vw, 140px)', color: 'var(--md-sys-color-secondary)' }}>code</span>
        </motion.div>
      </motion.div>

      <motion.div 
        style={{ y: smoothY, opacity, textAlign: 'center', zIndex: 10, maxWidth: '900px', width: '100%' }}
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1.2 }}
          style={{
            width: 'clamp(120px, 30vw, 160px)', 
            height: 'clamp(120px, 30vw, 160px)', 
            margin: '0 auto 32px auto', 
            borderRadius: '50%',
            padding: '4px', 
            background: 'linear-gradient(135deg, var(--md-sys-color-primary), var(--md-sys-color-tertiary))',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            position: 'relative'
          }}
        >
          <img 
            src="https://github.com/fertwbr.png" 
            alt="Fernando Vaz" 
            style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--md-sys-color-surface)' }} 
          />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ 
            fontSize: 'clamp(2.2rem, 8vw, 4.5rem)', 
            fontWeight: 800, 
            lineHeight: 1.1, 
            marginBottom: '16px',
            color: 'var(--md-sys-color-on-surface)'
          }}
        >
          {t.greeting} <span className="text-gradient" style={{ display: 'block' }}>Fernando Vaz</span>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ 
            fontSize: 'clamp(1.1rem, 4vw, 1.6rem)', 
            color: 'var(--md-sys-color-on-surface-variant)', 
            marginBottom: '40px', 
            minHeight: '1.8rem' 
          }}
        >
          {t.role_prefix} <span style={{ color: 'var(--md-sys-color-primary)', fontWeight: 600 }}>{t.roles[roleIndex]}</span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a href="#projects" className="btn-glow" style={{ padding: '14px 28px', borderRadius: '100px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {t.cta_primary} <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_downward</span>
          </a>
          <a href="#contact" className="btn-outline" style={{ padding: '14px 28px', borderRadius: '100px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {t.cta_secondary} <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>mail</span>
          </a>
        </motion.div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ position: 'absolute', bottom: '30px', left: '50%', x: '-50%', opacity: 0.5, color: 'var(--md-sys-color-primary)' }}
      >
        <span className="material-symbols-outlined">expand_more</span>
      </motion.div>
    </section>
  );
}