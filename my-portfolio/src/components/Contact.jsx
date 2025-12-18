import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" style={{ 
      padding: '60px 24px', 
      background: 'var(--md-sys-color-surface-container)',
      borderRadius: '32px',
      margin: '0 24px 40px 24px',
      textAlign: 'center'
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--md-sys-color-primary)', marginBottom: '16px' }}>
          mail
        </span>
        
        <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Let's Connect</h2>
        
        <p style={{ 
          maxWidth: '500px', 
          margin: '0 auto 32px auto', 
          color: 'var(--md-sys-color-on-surface-variant)',
          fontSize: '1.1rem'
        }}>
          Have a project idea or just want to discuss Android development? I'm always open to new opportunities.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <a href="mailto:fertwbr@gmail.com" style={{
            padding: '12px 24px',
            borderRadius: '100px',
            background: 'var(--md-sys-color-primary)',
            color: 'var(--md-sys-color-on-primary)',
            fontWeight: '600',
            textDecoration: 'none'
          }}>
            Send Email
          </a>
          
          <a href="https://linkedin.com/in/fernando-bela" target="_blank" style={{
            padding: '12px 24px',
            borderRadius: '100px',
            border: '1px solid var(--md-sys-color-outline)',
            color: 'var(--md-sys-color-primary)',
            fontWeight: '600',
            textDecoration: 'none'
          }}>
            LinkedIn
          </a>
        </div>
      </motion.div>
    </section>
  );
}