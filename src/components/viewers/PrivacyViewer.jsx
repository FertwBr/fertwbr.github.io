import {motion} from 'framer-motion';
import {useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import {useNavigate} from 'react-router-dom';
import {parsePrivacyPolicy} from '../../utils/privacyParser';
import BackToTop from '../common/BackToTop';
import PageTableOfContents from '../common/PageTableOfContents';
import {useSectionScroll} from '../../hooks/useSectionScroll';
import {handleContactSupport} from '../../utils/navigationUtils';

export default function PrivacyViewer({markdownContent, appConfig, strings}) {
    const [data, setData] = useState({lastUpdated: '', intro: null, sections: []});
    const navigate = useNavigate();

    const {activeSection, setActiveSection, scrollToSection} = useSectionScroll('');

    useEffect(() => {
        if (markdownContent) {
            const parsed = parsePrivacyPolicy(markdownContent);
            setData(parsed);
            if (parsed.sections.length > 0 && !activeSection) {
                setActiveSection(parsed.sections[0].id);
            }
        }
    }, [markdownContent, setActiveSection]);

    const renderTocItems = () => (
        data.sections.map((section) => (
            <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    background: activeSection === section.id ? 'var(--md-sys-color-secondary-container)' : 'transparent',
                    border: 'none',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    color: activeSection === section.id ? 'var(--md-sys-color-on-secondary-container)' : 'var(--md-sys-color-on-surface-variant)',
                    fontWeight: activeSection === section.id ? 700 : 500,
                    marginBottom: '4px',
                    transition: 'all 0.2s ease'
                }}
            >
                {section.title}
            </button>
        ))
    );

    const onSupportClick = () => {
        handleContactSupport('support', navigate, {
            source: appConfig?.appId || 'pixel_compass',
            platform: 'android'
        });
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            <div style={{
                marginBottom: '40px',
                paddingBottom: '32px',
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
                            display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px',
                            color: 'var(--md-sys-color-on-surface-variant)', fontSize: '0.9rem', fontWeight: 500
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

                        <h1 style={{
                            fontSize: '2.5rem',
                            margin: '0 0 16px 0',
                            fontWeight: 700
                        }}>{strings.privacy_page.page_title}</h1>

                        {data.lastUpdated && (
                            <div className="last-updated-badge">
                                <span className="material-symbols-outlined" style={{fontSize: '18px'}}>update</span>
                                <span>{strings.privacy_page.last_updated} {data.lastUpdated}</span>
                            </div>
                        )}
                    </div>

                    <button onClick={() => window.print()} className="btn-outline"
                            style={{borderRadius: '100px', padding: '10px 24px', fontSize: '0.9rem'}}>
                        <span className="material-symbols-outlined" style={{fontSize: '18px'}}>print</span>
                        {strings.privacy_page.print_btn}
                    </button>
                </div>

                {data.intro && (
                    <div className="header-intro">
                        <div className="markdown-body rich-text">
                            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{data.intro.content}</ReactMarkdown>
                        </div>
                    </div>
                )}
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
                                        style={{
                                            marginBottom: '50px',
                                            paddingBottom: '30px',
                                            borderBottom: index !== data.sections.length - 1 ? '1px solid var(--md-sys-color-outline-variant)' : 'none'
                                        }}>
                                <h2 style={{
                                    fontSize: 'clamp(1.5rem, 4vw, 2rem)', marginBottom: '24px',
                                    color: 'var(--md-sys-color-on-surface)', fontWeight: 700, letterSpacing: '-0.5px'
                                }}>{section.title}</h2>

                                <div className="markdown-body rich-text">
                                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{section.content}</ReactMarkdown>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="desktop-toc-wrapper" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    position: 'sticky',
                    top: '100px',
                    width: '300px'
                }}>
                    <PageTableOfContents title={strings.privacy_page.table_of_contents} isMobile={false}>
                        {renderTocItems()}
                    </PageTableOfContents>

                    <div className="glass-card" style={{
                        padding: '24px',
                        marginTop: '24px',
                        background: 'var(--md-sys-color-surface-container-high)',
                        width: '100%'
                    }}>
                        <h4 style={{margin: '0 0 8px 0', fontSize: '1rem'}}>{strings.privacy_page.contact_title}</h4>
                        <p style={{
                            fontSize: '0.85rem',
                            color: 'var(--md-sys-color-on-surface-variant)',
                            marginBottom: '16px'
                        }}>
                            {strings.privacy_page.contact_desc}
                        </p>
                        <button onClick={onSupportClick} className="btn-outline" style={{
                            width: '100%', justifyContent: 'center', fontSize: '0.85rem', cursor: 'pointer'
                        }}>
                            {strings.privacy_page.contact_btn}
                        </button>
                    </div>
                </div>

                <BackToTop strings={strings.changelog}/>
                <style>{`
                  .rich-text p { margin-bottom: 1.5em; line-height: 1.8; font-size: 1.05rem; color: var(--md-sys-color-on-surface-variant); }
                  .rich-text strong { color: var(--md-sys-color-primary); font-weight: 700; }
                  .rich-text h3 { font-size: 1.3rem; margin-top: 2em; margin-bottom: 1em; color: var(--md-sys-color-primary); font-weight: 600; }
                  .rich-text ul { margin-bottom: 1.5em; padding-left: 1.2em; }
                  .rich-text li { margin-bottom: 0.8em; color: var(--md-sys-color-on-surface-variant); }
                  @media (max-width: 1000px) {
                    .desktop-toc-wrapper { display: none !important; }
                    .privacy-layout { display: block !important; }
                    .mobile-toc-wrapper { display: block !important; }
                  }
                `}</style>
            </div>
        </div>
    );
}