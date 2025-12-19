import { motion } from "framer-motion";

export default function About({ t }) {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <section style={{ 
      maxWidth: '1200px', 
      margin: '0 auto 100px auto', 
      padding: '0 20px',
      boxSizing: 'border-box' 
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ marginBottom: '40px' }}
      >
        <span style={{ 
          color: 'var(--md-sys-color-primary)', 
          textTransform: 'uppercase', 
          letterSpacing: '2px', 
          fontWeight: 700, 
          fontSize: '0.75rem' 
        }}>
          {t.title}
        </span>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginTop: '8px', color: 'var(--md-sys-color-on-surface)' }}>
          {t.subtitle}
        </h2>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px'
        }}
      >
        <motion.div variants={item} className="glass-card" style={{ 
          padding: 'clamp(24px, 5vw, 32px)', 
          borderRadius: '32px',
          gridColumn: '1 / -1',
          background: 'var(--md-sys-color-surface-container-low)',
          border: '1px solid var(--md-sys-color-outline-variant)'
        }}>
          <p style={{ fontSize: 'clamp(1rem, 4vw, 1.1rem)', color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '16px', lineHeight: 1.6 }}>{t.bio_1}</p>
          <p style={{ fontSize: 'clamp(1rem, 4vw, 1.1rem)', color: 'var(--md-sys-color-on-surface-variant)', lineHeight: 1.6 }}>{t.bio_2}</p>
        </motion.div>

        <InfoCard data={t.cards.education} icon="school" />
        <InfoCard data={t.cards.location} icon="location_on" />
        <InfoCard data={t.cards.stack} icon="layers" />
      </motion.div>
    </section>
  );
}

function InfoCard({ data, icon }) {
  return (
    <motion.div 
      className="glass-card"
      whileHover={{ y: -5, background: 'var(--md-sys-color-surface-container-high)' }}
      style={{ 
        padding: '24px', 
        borderRadius: '24px', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        background: 'var(--md-sys-color-surface-container-low)',
        border: '1px solid var(--md-sys-color-outline-variant)'
      }}
    >
      <div style={{ 
        width: '44px', height: '44px', borderRadius: '12px', 
        background: 'var(--md-sys-color-secondary-container)', 
        color: 'var(--md-sys-color-on-secondary-container)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px'
      }}>
        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{icon}</span>
      </div>
      <h3 style={{ fontSize: '0.9rem', color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '4px' }}>{data.title}</h3>
      <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--md-sys-color-on-surface)' }}>{data.value}</p>
      <small style={{ color: 'var(--md-sys-color-primary)', fontWeight: 500 }}>{data.sub}</small>
    </motion.div>
  );
}