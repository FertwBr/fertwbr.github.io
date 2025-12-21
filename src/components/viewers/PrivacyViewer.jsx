import {motion} from 'framer-motion';
import {useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import {parsePrivacyPolicy} from '../../utils/privacyParser';
import BackToTop from '../common/BackToTop';
import PageTableOfContents from '../common/PageTableOfContents';

export default function PrivacyViewer({markdownContent, appConfig, strings}) {
    const [data, setData] = useState({lastUpdated: '', sections: []});
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        if (markdownContent) {
            const parsed = parsePrivacyPolicy(markdownContent);
            setData(parsed);
            if (parsed.sections.length > 0) setActiveSection(parsed.sections[0].id);
        }
    }, [markdownContent]);

    const scrollToSection = (id) => {
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                const offset = 160;
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({top: elementPosition - offset, behavior: 'smooth'});
                setActiveSection(id);
            }
        }, 100);
    };

    const renderTocItems = () => (
        data.sections.map((section) => (
            <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    background: activeSection === section.id ? 'var(--md-sys-color-primary-container)' : 'transparent',
                    border: 'none',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    color: activeSection === section.id ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-surface-variant)',
                    fontWeight: activeSection === section.id ? 700 : 400,
                    marginBottom: '2px',
                    borderLeft: activeSection === section.id ? `3px solid var(--md-sys-color-primary)` : '3px solid transparent'
                }}
            >
                {section.title}
            </button>
        ))
    );

    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            <div style={{
                marginBottom: '40px',
                paddingBottom: '24px',
                borderBottom: '1px solid var(--md-sys-color-outline-variant)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '16px'
                }}>
                    <div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '16px',
                            color: 'var(--md-sys-color-on-surface-variant)',
                            fontSize: '0.95rem',
                            fontWeight: 500
                        }}>
                            <span>{appConfig?.appName}</span>
                            <span className="material-symbols-outlined" style={{fontSize: '16px'}}>chevron_right</span>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                color: 'var(--md-sys-color-primary)',
                                fontWeight: 700
                            }}>
                                <span className="material-symbols-outlined"
                                      style={{fontSize: '18px'}}>verified_user</span>
                                <span>{strings.privacy_page.page_title}</span>
                            </div>
                        </div>
                        {data.lastUpdated && (
                            <p style={{fontSize: '1rem', color: 'var(--md-sys-color-on-surface-variant)'}}>
                                {strings.privacy_page.last_updated} <strong>{data.lastUpdated}</strong>
                            </p>
                        )}
                    </div>
                    <button onClick={() => window.print()} className="btn-outline"
                            style={{borderRadius: '100px', padding: '10px 24px', fontSize: '0.9rem'}}>
                        <span className="material-symbols-outlined" style={{fontSize: '18px'}}>print</span>
                        {strings.privacy_page.print_btn}
                    </button>
                </div>
            </div>

            <div className="privacy-layout" style={{display: 'flex', gap: '60px', alignItems: 'flex-start'}}>
                <div style={{flex: 1, minWidth: 0}}>
                    <div className="mobile-toc-wrapper" style={{display: 'none'}}>
                        <PageTableOfContents title={strings.privacy_page.table_of_contents}
                                             isMobile={true}>{renderTocItems()}</PageTableOfContents>
                    </div>

                    <div className="privacy-sections-container">
                        {data.sections.map((section, index) => (
                            <motion.div key={section.id} id={section.id} initial={{opacity: 0, y: 20}}
                                        whileInView={{opacity: 1, y: 0}} viewport={{once: true, margin: "-100px"}}
                                        style={{marginBottom: '60px'}}>
                                <h2 style={{
                                    fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
                                    marginBottom: '24px',
                                    color: 'var(--md-sys-color-on-surface)',
                                    fontWeight: 800,
                                    letterSpacing: '-0.5px'
                                }}>{section.title}</h2>
                                <div className="glass-card"
                                     style={{padding: 'clamp(24px, 5vw, 40px)', borderRadius: '28px'}}>
                                    <div className="markdown-body rich-text">
                                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{section.content}</ReactMarkdown>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mobile-contact-card" style={{marginBottom: '60px', display: 'none'}}>
                        <div className="glass-card"
                             style={{padding: '24px', border: '1px solid var(--md-sys-color-primary-container)'}}>
                            <h4 style={{
                                margin: '0 0 12px 0',
                                fontSize: '1.2rem'
                            }}>{strings.privacy_page.contact_title}</h4>
                            <p style={{
                                fontSize: '0.95rem',
                                color: 'var(--md-sys-color-on-surface-variant)',
                                marginBottom: '20px'
                            }}>{strings.privacy_page.contact_desc}</p>
                            <a href="mailto:fertwbr@gmail.com" className="btn-glow"
                               style={{width: '100%', justifyContent: 'center'}}>{strings.privacy_page.contact_btn}</a>
                        </div>
                    </div>
                </div>

                <div className="desktop-toc-wrapper" style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                    <PageTableOfContents title={strings.privacy_page.table_of_contents} isMobile={false}>
                        {renderTocItems()}
                    </PageTableOfContents>

                    <div className="glass-card" style={{
                        padding: '24px',
                        marginTop: '24px',
                        background: 'var(--md-sys-color-surface-container-high)',
                        width: '300px'
                    }}>
                        <h4 style={{margin: '0 0 8px 0', fontSize: '1rem'}}>{strings.privacy_page.contact_title}</h4>
                        <p style={{
                            fontSize: '0.85rem',
                            color: 'var(--md-sys-color-on-surface-variant)',
                            marginBottom: '16px'
                        }}>{strings.privacy_page.contact_desc}</p>
                        <a href="mailto:fertwbr@gmail.com" className="btn-outline" style={{
                            width: '100%',
                            justifyContent: 'center',
                            fontSize: '0.85rem'
                        }}>{strings.privacy_page.contact_btn}</a>
                    </div>
                </div>

                <BackToTop strings={strings.changelog}/>

                <style>{`
          .rich-text p { margin-bottom: 1.5em; line-height: 1.8; font-size: 1.05rem; color: var(--md-sys-color-on-surface); }
          .rich-text strong { color: var(--md-sys-color-primary); font-weight: 700; }
          .rich-text h3 { font-size: 1.4rem; margin-top: 2.5em; margin-bottom: 1.2em; color: var(--md-sys-color-primary); font-weight: 700; display: flex; align-items: center; gap: 12px; }
          .rich-text h3::before { content: ''; width: 4px; height: 24px; background: var(--md-sys-color-primary); border-radius: 4px; }
          .rich-text ul { margin-bottom: 1.5em; padding-left: 1.2em; }
          .rich-text li { margin-bottom: 0.8em; color: var(--md-sys-color-on-surface-variant); }
          @media (max-width: 1000px) {
            .desktop-toc-wrapper { display: none !important; }
            .privacy-layout { display: block !important; }
            .mobile-toc-wrapper { display: block !important; }
            .mobile-contact-card { display: block !important; }
          }
        `}</style>
            </div>
        </div>
    );
}