import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ProjectCard({ project, t }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["0 1", "0.7 1"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale,
        opacity,
        marginBottom: '100px',
        padding: '0 24px',
        maxWidth: '1200px',
        margin: '0 auto 100px auto'
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '40px',
        alignItems: 'center',
        background: 'var(--md-sys-color-surface-container-low)',
        borderRadius: '40px',
        padding: '40px',
        border: '1px solid var(--md-sys-color-outline-variant)',
        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)'
      }}>
        
        {/* Visual Content */}
        <div style={{
          height: '350px',
          background: `linear-gradient(135deg, var(--md-sys-color-${project.color}-container), var(--md-sys-color-surface))`,
          borderRadius: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
           <div style={{ position: 'absolute', inset: 0, opacity: 0.3, backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
           
           <motion.img 
             whileHover={{ scale: 1.1, rotate: 5 }}
             transition={{ type: "spring", stiffness: 300 }}
             src={project.icon_url} 
             alt={project.title} 
             style={{ width: '140px', height: '140px', zIndex: 2, dropShadow: '0 20px 40px rgba(0,0,0,0.3)', objectFit: 'contain' }} 
             onError={(e) => { e.target.style.display='none'; }} 
           />
           { !project.icon_url && 
             <span className="material-symbols-outlined" style={{ fontSize: '120px', color: `var(--md-sys-color-${project.color})` }}>{project.icon}</span> 
           }
        </div>

        {/* Text Content */}
        <div>
          <h3 style={{ fontSize: '2.5rem', marginBottom: '16px', fontWeight: 700 }}>{project.title}</h3>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '32px' }}>
            {project.desc}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '40px' }}>
            {project.tags.map(tag => (
              <span key={tag} className="tech-tag">{tag}</span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href={project.link} className="btn-glow">
              {t.view_project} <span className="material-symbols-outlined">arrow_forward</span>
            </a>
            
            <a href={project.repo} target="_blank" className="btn-outline">
              GitHub <span className="material-symbols-outlined">code</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}