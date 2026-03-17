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

        const handleResize = () => {
            const activeElement = document.activeElement;
            const isInputFocused = activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA');
            if (isInputFocused) return;
            setIsDesktop(window.innerWidth > 1000);
        };
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
            source: appConfig?.appId || 'portfolio',
            platform: 'android'
        });
    };

    const desktopSearchPortal = isDesktop ? (
        <div className="search-input-wrapper">
            <span className="material-symbols-outlined search-icon-absolute">search</span>
            <input
                type="text"
                className="desktop-search-input"
                placeholder={strings.help_page?.search_placeholder || "Search..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    ) : null;

    return (
        <div className="viewer-container">
            {desktopSearchPortal && portalNode && createPortal(desktopSearchPortal, portalNode)}

            <ViewerHeader
                appName={appConfig?.appName}
                icon="help"
                title={strings.help_page?.page_title || "Help"}
                subtitle={strings.help_page?.subtitle}
            />

            <div className="viewer-layout">
                <div className="viewer-main-content">
                    {!isDesktop && (
                        <div className="search-input-wrapper" style={{marginBottom: '40px'}}>
                            <span className="material-symbols-outlined search-icon-absolute">search</span>
                            <input
                                type="text"
                                className="search-input-high-contrast"
                                placeholder={strings.help_page?.search_placeholder || "Search..."}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    )}

                    <div className="mobile-toc-wrapper">
                        <PageTableOfContents title={strings.help_page?.table_of_contents || "Table of Contents"}
                                             isMobile={true}>
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
                                      style={{
                                          fontSize: '48px',
                                          marginBottom: '16px',
                                          color: 'var(--md-sys-color-on-surface-variant)'
                                      }}>search_off</span>
                                <p style={{color: 'var(--md-sys-color-on-surface-variant)'}}>{strings.help_page?.no_results || "No results found."}</p>
                            </div>
                        )}
                    </div>
                </div>

                <ViewerSidebar
                    cardTitle={strings.help_page?.contact_title || "Questions?"}
                    cardDesc={strings.help_page?.contact_desc || "Need more help?"}
                    cardBtnText={strings.help_page?.contact_btn || "Contact Support"}
                    onBtnClick={onSupportClick}
                >
                    <PageTableOfContents title={strings.help_page?.table_of_contents || "Table of Contents"}
                                         isMobile={false}>
                        {renderTocItems()}
                    </PageTableOfContents>
                </ViewerSidebar>

                <BackToTop strings={strings.changelog || {}}/>
                <style>{`
                  .rich-text h1 { display: none; }
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