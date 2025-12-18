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
    <section style={{ maxWidth: '1200px', margin: '0 auto 100px auto', padding: '0 24px' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ marginBottom: '40px' }}
      >
        <span style={{ color: 'var(--md-sys-color-primary)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, fontSize: '0.8rem' }}>
          {t.title}
        </span>
        <h2 style={{ fontSize: '2.5rem', marginTop: '8px' }}>{t.subtitle}</h2>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="bento-grid"
      >
        <motion.div variants={item} className="glass-card" style={{ padding: '32px', borderRadius: '32px', gridColumn: 'span 2' }}>
          <p style={{ fontSize: '1.1rem', color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '16px' }}>{t.bio_1}</p>
          <p style={{ fontSize: '1.1rem', color: 'var(--md-sys-color-on-surface-variant)' }}>{t.bio_2}</p>
        </motion.div>

        <InfoCard t={t.cards.education} icon="school" delay={0.2} />
        <InfoCard t={t.cards.location} icon="location_on" delay={0.3} />
        <InfoCard t={t.cards.stack} icon="layers" delay={0.4} />
      </motion.div>
    </section>
  );
}

function InfoCard({ t, icon, delay }) {
  return (
    <motion.div 
      className="glass-card"
      whileHover={{ y: -5, background: 'rgba(255,255,255,0.05)' }}
      style={{ padding: '24px', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      <div style={{ 
        width: '48px', height: '48px', borderRadius: '12px', 
        background: 'var(--md-sys-color-secondary-container)', 
        color: 'var(--md-sys-color-on-secondary-container)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px'
      }}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <h3 style={{ fontSize: '1rem', color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '4px' }}>{t.title}</h3>
      <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>{t.value}</p>
      <small style={{ color: 'var(--md-sys-color-primary)' }}>{t.sub}</small>
    </motion.div>
  )
}