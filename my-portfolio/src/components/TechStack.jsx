import { motion } from "framer-motion";

const techs = [
  { name: "Kotlin", icon: "code" },
  { name: "Android", icon: "android" },
  { name: "Compose", icon: "widgets" },
  { name: "Java", icon: "coffee" },
  { name: "Spring Boot", icon: "dns" },
  { name: "PostgreSQL", icon: "database" },
  { name: "React", icon: "html" },
  { name: "Figma", icon: "design_services" },
  { name: "Git", icon: "terminal" },
  { name: "Docker", icon: "layers" }
];

export default function TechStack({ t }) {
  return (
    <section style={{ padding: '80px 0', overflow: 'hidden', background: 'var(--md-sys-color-surface-container)' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2rem' }}>{t.title}</h2>
        <p style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>{t.subtitle}</p>
      </div>

      <div style={{ display: 'flex', position: 'relative', width: '100%' }}>
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          style={{ display: 'flex', gap: '32px', paddingLeft: '24px', whiteSpace: 'nowrap' }}
        >
          {[...techs, ...techs, ...techs].map((tech, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '16px 32px',
              background: 'var(--md-sys-color-surface)',
              border: '1px solid var(--md-sys-color-outline-variant)',
              borderRadius: '100px',
              minWidth: 'max-content'
            }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--md-sys-color-primary)' }}>{tech.icon}</span>
              <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{tech.name}</span>
            </div>
          ))}
        </motion.div>
        
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '100px', background: 'linear-gradient(to right, var(--md-sys-color-surface-container), transparent)', zIndex: 2 }}></div>
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '100px', background: 'linear-gradient(to left, var(--md-sys-color-surface-container), transparent)', zIndex: 2 }}></div>
      </div>
    </section>
  );
}