import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function Projects({ t }) {
  return (
    <section id="projects" style={{ 
      padding: '0 20px 100px 24px', 
      maxWidth: '1200px', 
      margin: '0 auto',
      boxSizing: 'border-box' 
    }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '16px', color: 'var(--md-sys-color-on-surface)' }}>
          {t.title}
        </h2>
        <p style={{ fontSize: 'clamp(1rem, 4vw, 1.2rem)', color: 'var(--md-sys-color-on-surface-variant)' }}>
          {t.subtitle}
        </p>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(60px, 10vw, 80px)' }}>
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

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', 
        gap: '32px', 
        alignItems: 'center' 
      }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX, rotateY,
          transformStyle: "preserve-3d",
          height: 'clamp(280px, 40vw, 400px)',
          background: `linear-gradient(135deg, var(--md-sys-color-${project.color}-container), var(--md-sys-color-surface-container))`,
          borderRadius: '32px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
          cursor: 'pointer',
          border: '1px solid var(--md-sys-color-outline-variant)',
          overflow: 'hidden'
        }}
        className="glass-card"
      >
        <div style={{ transform: "translateZ(50px)", pointerEvents: 'none' }}>
          {project.icon_url ? (
            <img 
              src={project.icon_url} 
              alt={project.title} 
              style={{ 
                width: 'clamp(100px, 20vw, 140px)', 
                height: 'auto', 
                filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.3))', 
                objectFit: 'contain'
              }} 
            />
          ) : (
            <span className="material-symbols-outlined" style={{ fontSize: 'clamp(60px, 15vw, 100px)', color: `var(--md-sys-color-${project.color})` }}>
              {project.icon}
            </span>
          )}
        </div>
      </motion.div>

      <div style={{ padding: '0 8px' }}>
        <span style={{ 
          color: `var(--md-sys-color-${project.color})`, 
          fontWeight: 700, 
          letterSpacing: '1.5px', 
          textTransform: 'uppercase',
          fontSize: '0.85rem'
        }}>
          {project.category}
        </span>
        <h3 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', margin: '12px 0' }}>{project.title}</h3>
        <p style={{ 
          fontSize: 'clamp(1rem, 3.5vw, 1.1rem)', 
          color: 'var(--md-sys-color-on-surface-variant)', 
          lineHeight: 1.6, 
          marginBottom: '24px' 
        }}>
          {project.desc}
        </p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
          {project.tags.map(tag => (
            <span key={tag} style={{ 
              padding: '6px 14px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 500,
              background: 'var(--md-sys-color-surface-container-high)', 
              color: 'var(--md-sys-color-on-surface-variant)',
              border: '1px solid var(--md-sys-color-outline-variant)' 
            }}>
              {tag}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a href={project.link} className="btn-glow" style={{ padding: '12px 24px', borderRadius: '100px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
            {t.view_project} <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
          </a>
          <a href={project.repo} target="_blank" rel="noreferrer" className="btn-outline" style={{ padding: '12px 24px', borderRadius: '100px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
            {t.source_code} <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>code</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}