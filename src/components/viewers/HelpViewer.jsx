import React, {useState, useEffect, useMemo} from 'react';
import {createPortal} from 'react-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import {motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';
import {parseHelpFAQ} from '../../utils/helpParser';
import BackToTop from '../common/BackToTop';
import PageTableOfContents from '../common/PageTableOfContents';
import {useSectionScroll} from '../../hooks/useSectionScroll';
import {handleContactSupport} from '../../utils/navigationUtils';
import ViewerHeader from '../common/ViewerHeader';
import ViewerSidebar from '../common/ViewerSidebar';

export default function HelpViewer({markdownContent, strings, appConfig}) {
    const [data, setData] = useState({sections: []});
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const {activeSection, setActiveSection, scrollToSection} = useSectionScroll('');

    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1000);
    const [portalNode, setPortalNode] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const node = document.getElementById('appbar-search-portal');
            if (node) {
                setPortalNode(node);
                clearInterval(interval);
            }
        }, 100);

        const handleResize = () => setIsDesktop(window.innerWidth > 1000);
        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (markdownContent) {
            const parsed = parseHelpFAQ(markdownContent);
            setData(parsed);
            if (parsed.sections.length > 0 && !activeSection) {
                setActiveSection(parsed.sections[0].id);
            }
        }
    }, [markdownContent, setActiveSection]);

    const filteredSections = useMemo(() => {
        if (!searchQuery) return data.sections;
        const lowerQuery = searchQuery.toLowerCase();
        return data.sections.filter(s => s.title.toLowerCase().includes(lowerQuery) || s.content.toLowerCase().includes(lowerQuery));
    }, [data, searchQuery]);

    const renderTocItems = () => (
        filteredSections.map((section) => (
            <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`toc-btn ${activeSection === section.id ? 'active' : 'inactive'}`}
            >
                {section.title === 'Introduction' ? 'Overview' : section.title}
            </button>
        ))
    );

    const onSupportClick = () => {
        handleContactSupport('support', navigate, {
            source: appConfig?.appId || 'pixel_compass',
            platform: 'android'
        });
    };

    const desktopSearchPortal = isDesktop ? (
        <div style={{width: '100%', position: 'relative'}}>
            <span className="material-symbols-outlined" style={{
                position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
                color: 'var(--md-sys-color-on-surface-variant)', zIndex: 2, fontSize: '20px'
            }}>search</span>
            <input
                type="text"
                placeholder={strings.help_page.search_placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                    width: '100%', height: '40px', padding: '0 16px 0 40px',
                    borderRadius: '20px', border: 'none',
                    background: 'var(--md-sys-color-surface-container-highest)',
                    color: 'var(--md-sys-color-on-surface)',
                    fontSize: '0.95rem', outline: 'none'
                }}
            />
        </div>
    ) : null;

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px'
        }}>
            {desktopSearchPortal && portalNode && createPortal(desktopSearchPortal, portalNode)}

            <ViewerHeader
                appName={appConfig?.appName}
                icon="help"
                title={strings.help_page.page_title}
                subtitle={strings.help_page.subtitle}
            />

            <div className="viewer-layout">
                <div className="viewer-main-content">
                    {!isDesktop && (
                        <div className="search-input-wrapper" style={{marginBottom: '40px', position: 'relative'}}>
                            <span className="material-symbols-outlined" style={{
                                position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
                                color: '#ffffff', zIndex: 2
                            }}>search</span>

                            <input
                                type="text"
                                className="search-input-high-contrast"
                                placeholder={strings.help_page.search_placeholder}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    )}

                    <div className="mobile-toc-wrapper" style={{display: 'none'}}>
                        <PageTableOfContents title={strings.help_page.table_of_contents} isMobile={true}>
                            {renderTocItems()}
                        </PageTableOfContents>
                    </div>

                    <div className="help-content-scroll">
                        {filteredSections.length > 0 ? (
                            filteredSections.map((section, index) => (
                                <motion.div
                                    key={section.id}
                                    id={section.id}
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: index * 0.1}}
                                    className={`viewer-section ${index !== filteredSections.length - 1 ? 'viewer-section-bordered' : ''}`}
                                >
                                    {section.id !== 'introduction' && (
                                        <h2 className="viewer-section-title">
                                            {section.title}
                                        </h2>
                                    )}
                                    <div className="markdown-body rich-text">
                                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{section.content}</ReactMarkdown>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div style={{textAlign: 'center', padding: '60px', opacity: 0.7}}>
                                <span className="material-symbols-outlined"
                                      style={{fontSize: '48px', marginBottom: '16px'}}>search_off</span>
                                <p>{strings.help_page.no_results}</p>
                            </div>
                        )}
                    </div>
                </div>

                <ViewerSidebar
                    cardTitle={strings.help_page.contact_title}
                    cardDesc={strings.help_page.contact_desc}
                    cardBtnText={strings.help_page.contact_btn}
                    onBtnClick={onSupportClick}
                >
                    <PageTableOfContents title={strings.help_page.table_of_contents} isMobile={false}>
                        {renderTocItems()}
                    </PageTableOfContents>
                </ViewerSidebar>

                <BackToTop strings={strings.changelog}/>
                <style>{`
                  .rich-text h1 { display: none; }
                  .rich-text h3 { 
                    font-size: 1.3rem; margin-top: 2em; margin-bottom: 1em; 
                    color: var(--md-sys-color-primary); font-weight: 600; 
                  }
                  .rich-text p { margin-bottom: 1.2em; line-height: 1.7; color: var(--md-sys-color-on-surface-variant); font-size: 1.05rem; }
                  .rich-text ul, .rich-text ol { margin-bottom: 1.5em; padding-left: 1.5em; }
                  .rich-text li { margin-bottom: 0.5em; color: var(--md-sys-color-on-surface-variant); }
                  .rich-text strong { color: var(--md-sys-color-on-surface); font-weight: 700; }
                  .rich-text blockquote { 
                    border-left: 4px solid var(--md-sys-color-primary); 
                    margin-left: 0; padding-left: 20px; 
                    background: var(--md-sys-color-surface-container);
                    padding: 16px; border-radius: 0 12px 12px 0;
                    font-style: italic;
                  }
                `}</style>
            </div>
        </div>
    );
}