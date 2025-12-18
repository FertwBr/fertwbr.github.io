import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function Projects({ t }) {
  return (
    <section id="projects" style={{ padding: '0 24px 100px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '16px' }}>{t.title}</h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--md-sys-color-on-surface-variant)' }}>{t.subtitle}</p>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        {t.items.map((project, index) => (
          <ProjectCard key={project.id} project={project} t={t} index={index} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, t, index }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px', alignItems: 'center' }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX, rotateY,
          transformStyle: "preserve-3d",
          height: '400px',
          background: `linear-gradient(135deg, var(--md-sys-color-${project.color}-container), var(--md-sys-color-surface-container))`,
          borderRadius: '32px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
          cursor: 'pointer'
        }}
        className="glass-card"
      >
        <div style={{ transform: "translateZ(50px)" }}>
          {project.icon_url ? (
            <img 
              src={project.icon_url} 
              alt={project.title} 
              style={{ 
                width: '140px', 
                height: '140px', 
                filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.3))', 
                objectFit: 'contain'
              }} 
            />
          ) : (
            <span className="material-symbols-outlined" style={{ fontSize: '100px', color: `var(--md-sys-color-${project.color})` }}>
              {project.icon}
            </span>
          )}
        </div>
      </motion.div>

      <div>
        <span style={{ color: `var(--md-sys-color-${project.color})`, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
          {project.category}
        </span>
        <h3 style={{ fontSize: '2.5rem', margin: '8px 0 16px 0' }}>{project.title}</h3>
        <p style={{ fontSize: '1.1rem', color: 'var(--md-sys-color-on-surface-variant)', lineHeight: 1.7, marginBottom: '24px' }}>
          {project.desc}
        </p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
          {project.tags.map(tag => (
            <span key={tag} style={{ 
              padding: '6px 14px', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 500,
              background: 'var(--md-sys-color-surface-container-high)', border: '1px solid var(--md-sys-color-outline-variant)' 
            }}>
              {tag}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <a href={project.link} className="btn-glow">
            {t.view_project} <span className="material-symbols-outlined">arrow_forward</span>
          </a>
          <a href={project.repo} target="_blank" className="btn-outline">
            {t.source_code} <span className="material-symbols-outlined">code</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}