import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { motion, AnimatePresence } from 'framer-motion';
import { parsePrivacyPolicy } from '../utils/privacyParser';

export default function PrivacyViewer({ markdownContent, seedColor, strings }) {
  const [data, setData] = useState({ lastUpdated: '', sections: [] });
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (markdownContent) {
      const parsed = parsePrivacyPolicy(markdownContent);
      setData(parsed);
      if (parsed.sections.length > 0) {
        setActiveSection(parsed.sections[0].id);
      }
    }
  }, [markdownContent]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop + 150; 
      
      for (const section of data.sections) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
        }
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [data]);

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element && containerRef.current) {
      containerRef.current.scrollTo({
        top: element.offsetTop - 40,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      
      <div style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid var(--md-sys-color-outline-variant)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', color: seedColor, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>verified_user</span>
              <span>Legal</span>
            </div>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
              {strings.privacy_page.page_title}
            </h1>
            {data.lastUpdated && (
              <p style={{ fontSize: '1rem', color: 'var(--md-sys-color-on-surface-variant)', marginTop: '8px' }}>
                {strings.privacy_page.last_updated} <strong>{data.lastUpdated}</strong>
              </p>
            )}
          </div>
          
          <button 
            onClick={handlePrint}
            className="btn-outline header-action"
            style={{ borderRadius: '12px', padding: '10px 20px', fontSize: '0.9rem' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>print</span>
            {strings.privacy_page.print_btn}
          </button>
        </div>
      </div>

      <div className="privacy-layout" style={{ display: 'flex', gap: '60px', flex: 1, overflow: 'hidden', minHeight: 0 }}>
        
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, height: '100%' }}>
            
            <div className="mobile-toc-trigger" style={{ display: 'none', marginBottom: '24px', flexShrink: 0 }}>
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
                            <div style={{ padding: '8px', maxHeight: '300px', overflowY: 'auto' }}>
                                {data.sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => scrollToSection(section.id)}
                                        style={{
                                            display: 'block', width: '100%', textAlign: 'left',
                                            background: 'transparent', border: 'none',
                                            padding: '12px 16px',
                                            borderBottom: '1px solid var(--md-sys-color-outline-variant)',
                                            color: activeSection === section.id ? seedColor : 'var(--md-sys-color-on-surface)',
                                            fontWeight: activeSection === section.id ? 600 : 400,
                                        }}
                                    >
                                        {section.title === 'Introduction' ? strings.pixel_pulse?.nav?.index || 'Overview' : section.title}
                                    </button>
                                ))}
                            </div>
                            
                            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.05)', borderTop: '1px solid var(--md-sys-color-outline-variant)' }}>
                                <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9rem' }}>{strings.privacy_page.contact_title}</h4>
                                <p style={{ fontSize: '0.8rem', color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '12px' }}>
                                    {strings.privacy_page.contact_desc}
                                </p>
                                <a 
                                    href="mailto:fertwbr@gmail.com"
                                    className="btn-outline"
                                    style={{ width: '100%', justifyContent: 'center', padding: '8px', fontSize: '0.85rem' }}
                                >
                                    {strings.privacy_page.contact_btn}
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div 
                ref={containerRef}
                className="privacy-content-scroll"
                style={{ 
                    flex: 1, 
                    overflowY: 'auto', 
                    paddingRight: '16px', 
                    scrollBehavior: 'smooth',
                    height: '100%' 
                }}
            >
                {data.sections.map((section, index) => (
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
                                color: activeSection === section.id ? seedColor : 'var(--md-sys-color-on-surface)',
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
                ))}

                <div style={{ height: '100px' }}></div>
            </div>
        </div>

        <aside 
          className="desktop-toc"
          style={{ 
            width: '300px', 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            flexShrink: 0
          }}
        >
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
            <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--md-sys-color-on-surface-variant)', letterSpacing: '1px', fontWeight: 700, margin: '0 0 16px 0' }}>
              {strings.privacy_page.table_of_contents}
            </h3>
            
            <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', paddingRight: '8px' }}>
              {data.sections.map((section) => (
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
                    color: activeSection === section.id ? seedColor : 'var(--md-sys-color-on-surface-variant)',
                    fontWeight: activeSection === section.id ? 600 : 400,
                    borderLeft: activeSection === section.id ? `3px solid ${seedColor}` : '3px solid transparent',
                    transition: 'all 0.2s'
                  }}
                >
                  {section.title === 'Introduction' ? strings.pixel_pulse?.nav?.index || 'Overview' : section.title}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card" style={{ padding: '24px', background: `linear-gradient(135deg, ${seedColor}15, rgba(255,255,255,0.02))` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
               <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: seedColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <span className="material-symbols-outlined">mail</span>
               </div>
               <h4 style={{ margin: 0, fontSize: '1rem' }}>{strings.privacy_page.contact_title}</h4>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '16px', lineHeight: 1.5 }}>
              {strings.privacy_page.contact_desc}
            </p>
            <a 
              href="mailto:fertwbr@gmail.com"
              className="btn-outline"
              style={{ width: '100%', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', border: 'none' }}
            >
              {strings.privacy_page.contact_btn}
            </a>
          </div>
        </aside>

        <style>{`
          .rich-text h1, .rich-text h2 { display: none; }
          .rich-text p { margin-bottom: 1.5em; line-height: 1.8; color: var(--md-sys-color-on-surface); }
          .rich-text ul, .rich-text ol { margin-bottom: 1.5em; padding-left: 1.5em; }
          .rich-text li { margin-bottom: 0.8em; color: var(--md-sys-color-on-surface-variant); }
          .rich-text li strong { color: var(--md-sys-color-on-surface); font-weight: 700; }
          .rich-text strong { color: var(--md-sys-color-primary); font-weight: 600; }
          
          @media (max-width: 1000px) {
            .desktop-toc { display: none !important; }
            .privacy-layout { display: block !important; }
            .mobile-toc-trigger { display: block !important; }
            .privacy-content-scroll { overflow: visible !important; height: auto !important; }
          }

          @media print {
            body, html, #root, .app-layout, main { 
                height: auto !important; 
                overflow: visible !important; 
                background: white !important;
                color: black !important;
                display: block !important;
            }
            
            .app-navbar-container, 
            .desktop-toc, 
            .app-footer, 
            .header-action, 
            .mobile-toc-trigger,
            .btn-outline,
            .material-symbols-outlined { 
                display: none !important; 
            }

            .privacy-layout { 
                display: block !important; 
                height: auto !important; 
                overflow: visible !important; 
            }
            
            .privacy-content-scroll { 
                height: auto !important; 
                overflow: visible !important; 
                padding: 0 !important;
                display: block !important;
            }

            .glass-card { 
                box-shadow: none !important; 
                border: none !important; 
                background: none !important; 
                padding: 0 !important;
                margin-bottom: 20px !important;
                color: black !important;
            }

            h1, h2, h3 { 
                color: black !important; 
                page-break-after: avoid; 
            }
            p, li { 
                color: #222 !important; 
                page-break-inside: avoid;
            }
            a { 
                text-decoration: underline; 
                color: black !important; 
            }
          }
        `}</style>
      </div>
    </div>
  );
}