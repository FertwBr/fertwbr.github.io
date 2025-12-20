import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { parsePrivacyPolicy } from '../../utils/privacyParser';

const BackToTop = ({ strings }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: 'fixed', bottom: '30px', right: '30px', zIndex: 99,
            width: '56px', height: '56px', borderRadius: '16px',
            background: 'var(--md-sys-color-primary)', border: 'none',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            color: 'var(--md-sys-color-on-primary)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
          title={strings.back_to_top || "Back to Top"}
        >
          <span className="material-symbols-outlined">arrow_upward</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function PrivacyViewer({ markdownContent, appConfig, strings }) {
  const [data, setData] = useState({ lastUpdated: '', sections: [] });
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (markdownContent) {
      const parsed = parsePrivacyPolicy(markdownContent);
      setData(parsed);
      if (parsed.sections.length > 0) {
        setActiveSection(parsed.sections[0].id);
      }
    }
  }, [markdownContent]);

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);

    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 120;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth'
        });
        setActiveSection(id);
      }
    }, 100);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

      <div style={{ marginBottom: '40px', paddingBottom: '24px', borderBottom: '1px solid var(--md-sys-color-outline-variant)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--md-sys-color-on-surface-variant)', fontSize: '0.95rem', fontWeight: 500 }}>
              <span>{appConfig?.appName}</span>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--md-sys-color-primary)', fontWeight: 700 }}>
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>verified_user</span>
                <span>{strings.privacy_page.page_title}</span>
              </div>
            </div>

            {data.lastUpdated && (
              <p style={{ fontSize: '1rem', color: 'var(--md-sys-color-on-surface-variant)' }}>
                {strings.privacy_page.last_updated} <strong>{data.lastUpdated}</strong>
              </p>
            )}
          </div>

          <button
            onClick={() => window.print()}
            className="btn-outline"
            style={{ borderRadius: '100px', padding: '10px 24px', fontSize: '0.9rem' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>print</span>
            {strings.privacy_page.print_btn}
          </button>
        </div>
      </div>

      <div className="privacy-layout" style={{ display: 'flex', gap: '60px', alignItems: 'flex-start' }}>

        <div style={{ flex: 1, minWidth: 0 }}>

          <div className="mobile-toc-trigger" style={{ display: 'none', marginBottom: '32px' }}>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="glass-card"
              style={{
                width: '100%', padding: '16px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                cursor: 'pointer',
                border: '1px solid var(--md-sys-color-outline-variant)',
                color: 'var(--md-sys-color-on-surface)'
              }}
            >
              <span style={{ fontWeight: 600 }}>{strings.privacy_page.table_of_contents}</span>
              <span className="material-symbols-outlined">{isMobileMenuOpen ? 'expand_less' : 'expand_more'}</span>
            </button>

            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="glass-card"
                  style={{ marginTop: '8px', overflow: 'hidden', border: '1px solid var(--md-sys-color-outline-variant)', padding: 0 }}
                >
                  <div style={{ padding: '8px', maxHeight: '350px', overflowY: 'auto' }}>
                    {data.sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        style={{
                          display: 'block', width: '100%', textAlign: 'left',
                          background: activeSection === section.id ? 'var(--md-sys-color-primary-container)' : 'transparent',
                          border: 'none',
                          padding: '14px 16px',
                          borderRadius: '8px',
                          color: activeSection === section.id ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-surface)',
                          fontWeight: activeSection === section.id ? 700 : 400,
                          marginBottom: '2px'
                        }}
                      >
                        {section.title}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="privacy-sections-container">
            {data.sections.map((section, index) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                style={{ marginBottom: '60px' }}
              >
                <h2 style={{
                  fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', marginBottom: '24px',
                  color: 'var(--md-sys-color-on-surface)',
                  fontWeight: 800,
                  letterSpacing: '-0.5px'
                }}>
                  {section.title}
                </h2>

                <div className="glass-card" style={{ padding: 'clamp(24px, 5vw, 40px)', borderRadius: '28px' }}>
                  <div className="markdown-body rich-text">
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                      {section.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mobile-contact-card" style={{ marginBottom: '60px', display: 'none' }}>
            <div className="glass-card" style={{ padding: '24px', border: '1px solid var(--md-sys-color-primary-container)' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '1.2rem' }}>{strings.privacy_page.contact_title}</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '20px' }}>
                {strings.privacy_page.contact_desc}
              </p>
              <a href="mailto:fertwbr@gmail.com" className="btn-glow" style={{ width: '100%', justifyContent: 'center' }}>
                {strings.privacy_page.contact_btn}
              </a>
            </div>
          </div>
        </div>

        <aside className="desktop-toc" style={{ width: '320px', position: 'sticky', top: '120px', height: 'fit-content', flexShrink: 0 }}>
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--md-sys-color-primary)', letterSpacing: '1px', fontWeight: 700 }}>
              {strings.privacy_page.table_of_contents}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {data.sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  style={{
                    textAlign: 'left', background: 'transparent', border: 'none',
                    padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem',
                    color: activeSection === section.id ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-on-surface-variant)',
                    fontWeight: activeSection === section.id ? 700 : 400,
                    borderLeft: activeSection === section.id ? `3px solid var(--md-sys-color-primary)` : '3px solid transparent',
                    transition: 'all 0.2s'
                  }}
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card" style={{ padding: '24px', marginTop: '24px', background: 'var(--md-sys-color-surface-container-high)' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem' }}>{strings.privacy_page.contact_title}</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '16px' }}>
              {strings.privacy_page.contact_desc}
            </p>
            <a href="mailto:fertwbr@gmail.com" className="btn-outline" style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}>
              {strings.privacy_page.contact_btn}
            </a>
          </div>
        </aside>

        <BackToTop strings={strings.changelog} />

        <style>{`
          .rich-text p { margin-bottom: 1.5em; line-height: 1.8; font-size: 1.05rem; color: var(--md-sys-color-on-surface); }
          .rich-text strong { color: var(--md-sys-color-primary); font-weight: 700; }
          
          .rich-text h3 { 
            font-size: 1.4rem; 
            margin-top: 2.5em; 
            margin-bottom: 1.2em; 
            color: var(--md-sys-color-primary); 
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .rich-text h3::before {
            content: '';
            width: 4px;
            height: 24px;
            background: var(--md-sys-color-primary);
            border-radius: 4px;
          }

          .rich-text ul { margin-bottom: 1.5em; padding-left: 1.2em; }
          .rich-text li { margin-bottom: 0.8em; color: var(--md-sys-color-on-surface-variant); }

          @media (max-width: 1000px) {
            .desktop-toc { display: none !important; }
            .privacy-layout { display: block !important; }
            .mobile-toc-trigger { display: block !important; }
            .mobile-contact-card { display: block !important; }
          }
        `}</style>
      </div>
    </div>
  );
}