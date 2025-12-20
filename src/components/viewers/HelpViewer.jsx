import React, { useState, useEffect, useRef, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { motion, AnimatePresence } from 'framer-motion';
import { parseHelpFAQ } from '../../utils/helpParser';

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
          title={strings?.back_to_top || "Back to Top"}
        >
          <span className="material-symbols-outlined">arrow_upward</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function HelpViewer({ markdownContent, strings, appConfig }) {
  const [data, setData] = useState({ sections: [] });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (markdownContent) {
      const parsed = parseHelpFAQ(markdownContent);
      setData(parsed);
      if (parsed.sections.length > 0) {
        setActiveSection(parsed.sections[0].id);
      }
    }
  }, [markdownContent]);

  const filteredSections = useMemo(() => {
    if (!searchQuery) return data.sections;
    const lowerQuery = searchQuery.toLowerCase();
    return data.sections.filter(s => 
      s.title.toLowerCase().includes(lowerQuery) || 
      s.content.toLowerCase().includes(lowerQuery)
    );
  }, [data, searchQuery]);

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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      
      <div style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid var(--md-sys-color-outline-variant)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--md-sys-color-on-surface-variant)', fontSize: '0.95rem', fontWeight: 500 }}>
           <span>{appConfig?.appName}</span>
           <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
           <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--md-sys-color-primary)', fontWeight: 700 }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>help</span>
              <span>{strings.help_page.page_title}</span>
           </div>
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
            {strings.help_page.page_title}
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--md-sys-color-on-surface-variant)', marginTop: '12px', maxWidth: '700px' }}>
            {strings.help_page.subtitle}
        </p>
      </div>

      <div className="help-layout" style={{ display: 'flex', gap: '60px', flex: 1, alignItems: 'flex-start' }}>
        
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            
            <div style={{ marginBottom: '24px', position: 'relative' }}>
                <span className="material-symbols-outlined" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--md-sys-color-on-surface-variant)' }}>search</span>
                <input 
                    type="text" 
                    placeholder={strings.help_page.search_placeholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ 
                        width: '100%', padding: '16px 16px 16px 50px',
                        background: 'rgba(var(--md-sys-color-surface-container-high-rgb), 0.5)', 
                        border: '1px solid var(--md-sys-color-outline-variant)',
                        borderRadius: '16px',
                        color: 'var(--md-sys-color-on-surface)', 
                        fontSize: '1rem', outline: 'none'
                    }}
                />
            </div>

            <div className="mobile-toc-trigger" style={{ display: 'none', marginBottom: '24px' }}>
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
                    <span style={{ fontWeight: 600 }}>{strings.help_page.table_of_contents}</span>
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
                            <div style={{ padding: '8px', maxHeight: '300px', overflowY: 'auto' }}>
                                {filteredSections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => scrollToSection(section.id)}
                                        style={{
                                            display: 'block', width: '100%', textAlign: 'left',
                                            background: activeSection === section.id ? 'var(--md-sys-color-primary-container)' : 'transparent',
                                            border: 'none',
                                            padding: '14px 16px',
                                            borderBottom: '1px solid var(--md-sys-color-outline-variant)',
                                            color: activeSection === section.id ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-surface)',
                                            fontWeight: activeSection === section.id ? 700 : 400,
                                        }}
                                    >
                                        {section.title === 'Introduction' ? 'Overview' : section.title}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="help-content-scroll">
                {filteredSections.length > 0 ? (
                    filteredSections.map((section, index) => (
                        <motion.div
                            key={section.id}
                            id={section.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            style={{ marginBottom: '60px' }}
                        >
                            {section.id !== 'introduction' && (
                                <h2 style={{ 
                                    fontSize: '2rem', marginBottom: '24px', 
                                    color: activeSection === section.id ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-on-surface)',
                                    transition: 'color 0.3s'
                                }}>
                                    {section.title}
                                </h2>
                            )}
                            
                            <div className="glass-card" style={{ padding: '40px', borderRadius: '24px' }}>
                                <div className="markdown-body rich-text">
                                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                        {section.content}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', padding: '60px', opacity: 0.7 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '48px', marginBottom: '16px' }}>search_off</span>
                        <p>{strings.help_page.no_results}</p>
                    </div>
                )}
                
                <div className="mobile-contact-card" style={{ display: 'none', marginBottom: '60px' }}>
                    <div className="glass-card" style={{ padding: '24px', border: '1px solid var(--md-sys-color-primary-container)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--md-sys-color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--md-sys-color-on-primary)' }}>
                                <span className="material-symbols-outlined">support_agent</span>
                            </div>
                            <h4 style={{ margin: 0, fontSize: '1rem' }}>{strings.help_page.contact_title}</h4>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '16px', lineHeight: 1.5 }}>
                            {strings.help_page.contact_desc}
                        </p>
                        <a href="mailto:fertwbr@gmail.com" className="btn-outline" style={{ width: '100%', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', border: 'none' }}>
                            {strings.help_page.contact_btn}
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <aside 
          className="desktop-toc"
          style={{ 
            width: '300px', 
            position: 'sticky',
            top: '120px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            flexShrink: 0,
            maxHeight: 'calc(100vh - 140px)'
          }}
        >
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
            <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--md-sys-color-primary)', letterSpacing: '1px', fontWeight: 700, margin: '0 0 16px 0' }}>
              {strings.help_page.table_of_contents}
            </h3>
            
            <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', paddingRight: '8px' }}>
              {filteredSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  style={{
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    color: activeSection === section.id ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-on-surface-variant)',
                    fontWeight: activeSection === section.id ? 700 : 400,
                    borderLeft: activeSection === section.id ? `3px solid var(--md-sys-color-primary)` : '3px solid transparent',
                    transition: 'all 0.2s'
                  }}
                >
                  {section.title === 'Introduction' ? 'Overview' : section.title}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card" style={{ padding: '24px', background: 'var(--md-sys-color-surface-container-high)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
               <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--md-sys-color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--md-sys-color-on-primary)' }}>
                  <span className="material-symbols-outlined">support_agent</span>
               </div>
               <h4 style={{ margin: 0, fontSize: '1rem' }}>{strings.help_page.contact_title}</h4>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '16px', lineHeight: 1.5 }}>
              {strings.help_page.contact_desc}
            </p>
            <a 
              href="mailto:fertwbr@gmail.com"
              className="btn-outline"
              style={{ width: '100%', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', border: 'none' }}
            >
              {strings.help_page.contact_btn}
            </a>
          </div>
        </aside>

        <BackToTop strings={strings.changelog} />

        <style>{`
          .rich-text h1 { display: none; }
          
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

          .rich-text p { margin-bottom: 1.5em; line-height: 1.8; color: var(--md-sys-color-on-surface-variant); }
          .rich-text ul, .rich-text ol { margin-bottom: 1.5em; padding-left: 1.5em; }
          .rich-text li { margin-bottom: 0.5em; color: var(--md-sys-color-on-surface-variant); }
          .rich-text strong { color: var(--md-sys-color-on-surface); font-weight: 700; }
          
          @media (max-width: 1000px) {
            .desktop-toc { display: none !important; }
            .help-layout { display: block !important; }
            .mobile-toc-trigger { display: block !important; }
            .mobile-contact-card { display: block !important; }
          }
        `}</style>
      </div>
    </div>
  );
}