import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useState, useEffect } from "react";

export default function Hero({ t }) {
  const { scrollY } = useScroll();
  
  const yFast = useTransform(scrollY, [0, 1000], [0, -300]); 
  const ySlow = useTransform(scrollY, [0, 1000], [0, -150]);
  const yReverse = useTransform(scrollY, [0, 1000], [0, 100]);

  const yTextRange = useTransform(scrollY, [0, 500], [0, 200]);
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
      padding: '0 24px',
      overflow: 'hidden'
    }}>
      
      <motion.div 
        style={{ y: yFast, position: 'absolute', top: '15%', left: '10%', zIndex: 0 }}
      >
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ opacity: 0.15 }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '100px', color: 'var(--md-sys-color-primary)' }}>android</span>
        </motion.div>
      </motion.div>

      <motion.div 
        style={{ y: ySlow, position: 'absolute', bottom: '20%', right: '10%', zIndex: 0 }}
      >
        <motion.div
          animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{ opacity: 0.15 }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '120px', color: 'var(--md-sys-color-tertiary)' }}>terminal</span>
        </motion.div>
      </motion.div>

  
      <motion.div 
        style={{ y: yReverse, position: 'absolute', top: '25%', right: '20%', zIndex: 0 }}
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ opacity: 0.08 }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '140px', color: 'var(--md-sys-color-secondary)' }}>code</span>
        </motion.div>
      </motion.div>


      <motion.div 
        style={{ y: smoothY, opacity, textAlign: 'center', zIndex: 10, maxWidth: '900px' }}
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1.5 }}
          style={{
            width: '160px', height: '160px', margin: '0 auto 40px auto', borderRadius: '50%',
            padding: '4px', background: 'linear-gradient(135deg, var(--md-sys-color-primary), var(--md-sys-color-tertiary))',
            boxShadow: '0 0 60px rgba(var(--md-sys-color-primary-rgb), 0.4)'
          }}
        >
          <img 
            src="https://github.com/fertwbr.png" 
            alt="Fernando Vaz" 
            style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--md-sys-color-surface)' }} 
          />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
            fontWeight: 800, 
            lineHeight: 1.1, 
            marginBottom: '24px' 
          }}
        >
          {t.greeting} <span className="text-gradient">Fernando Vaz</span>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '48px', height: '1.8rem' }}
        >
          {t.role_prefix} <span style={{ color: 'var(--md-sys-color-primary)', fontWeight: 600 }}>{t.roles[roleIndex]}</span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a href="#projects" className="btn-glow">
            {t.cta_primary} <span className="material-symbols-outlined">arrow_downward</span>
          </a>
          <a href="#contact" className="btn-outline">
            {t.cta_secondary} <span className="material-symbols-outlined">mail</span>
          </a>
        </motion.div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ position: 'absolute', bottom: '40px', left: '50%', x: '-50%', opacity: 0.5 }}
      >
        <span className="material-symbols-outlined">expand_more</span>
      </motion.div>
    </section>
  );
}