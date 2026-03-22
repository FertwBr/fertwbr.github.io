import React, {useState, useEffect, useMemo, useRef} from 'react';
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

/**
 * Component to view help and FAQ documentation interactively.
 * Includes scroll-hide mobile search, dynamic desktop portal search, and section tracking.
 *
 * @param {Object} props
 * @param {string} props.markdownContent
 * @param {Object} props.strings
 * @param {Object} props.appConfig
 * @returns {JSX.Element}
 */
export default function HelpViewer({markdownContent, strings, appConfig}) {
    const [data, setData] = useState({sections: []});
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const {activeSection, setActiveSection, scrollToSection} = useSectionScroll('');

    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1000);
    const [portalNode, setPortalNode] = useState(null);
    const [rightPortalNode, setRightPortalNode] = useState(null);

    const [hideOnScroll, setHideOnScroll] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const containerRef = useRef(null);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const searchInterval = setInterval(() => {
            const searchNode = document.getElementById('appbar-search-portal');
            if (searchNode) {
                setPortalNode(searchNode);
                clearInterval(searchInterval);
            }
        }, 100);

        const rightInterval = setInterval(() => {
            const rightNode = document.getElementById('right-sidebar-portal');
            if (rightNode) {
                setRightPortalNode(rightNode);
                clearInterval(rightInterval);
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
            clearInterval(searchInterval);
            clearInterval(rightInterval);
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

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = Math.max(0, window.scrollY);

            setIsSticky(currentScrollY > 150);

            const activeElement = document.activeElement;
            const isInputFocused = activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA');

            const documentHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;
            const isAtBottom = currentScrollY + windowHeight >= documentHeight - 60;

            if (currentScrollY <= 0 || isInputFocused) {
                setHideOnScroll(false);
            } else if (isAtBottom) {
                setHideOnScroll(true);
            } else if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
                setHideOnScroll(true);
            } else if (currentScrollY < lastScrollY.current) {
                setHideOnScroll(false);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, {passive: true});
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const filteredSections = useMemo(() => {
        if (!searchQuery) return data.sections;
        const lowerQuery = searchQuery.toLowerCase();
        return data.sections.filter(s => s.title.toLowerCase().includes(lowerQuery) || s.content.toLowerCase().includes(lowerQuery));
    }, [data, searchQuery]);

    const renderTocItems = () => (
        <div className="toc-scroll-area" data-lenis-prevent="true">
            {filteredSections.map((section) => (
                <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`toc-item-btn ${activeSection === section.id ? 'active' : ''}`}
                >
                    <span className="toc-item-text">
                        {section.title === 'Introduction' ? 'Overview' : section.title}
                    </span>
                </button>
            ))}
        </div>
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

    const sidebarContent = (
        <div style={isDesktop ? {padding: '24px 16px'} : {}}>
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
        </div>
    );

    return (
        <>
            {desktopSearchPortal && portalNode && createPortal(desktopSearchPortal, portalNode)}

            <main className="app-main-content viewer-main-content">
                <ViewerHeader
                    appName={appConfig?.appName}
                    icon="help"
                    title={strings.help_page?.page_title || "Help"}
                    subtitle={strings.help_page?.subtitle}
                />

                {!isDesktop && (
                    <div ref={containerRef} style={{
                        position: 'relative',
                        height: isSticky && window.innerWidth > 1000 ? '96px' : 'auto'
                    }}>
                        <div
                            className={`loose-search-container ${isSticky ? 'is-sticky' : ''} ${hideOnScroll ? 'hide-on-scroll' : ''}`}>
                            <div className="mobile-blur-backdrop"></div>
                            <div className="search-pill">
                                <span className="material-symbols-outlined search-icon">search</span>
                                <input
                                    type="text"
                                    placeholder={strings.help_page?.search_placeholder || "Search..."}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                )}

                <div className="mobile-toc-wrapper">
                    <PageTableOfContents title={strings.help_page?.table_of_contents || "Table of Contents"}
                                         isMobile={true}>
                        {renderTocItems()}
                    </PageTableOfContents>
                </div>

                <div className={`help-content-scroll ${!hideOnScroll && !isDesktop ? 'padded' : ''}`}>
                    {filteredSections.length > 0 ? (
                        filteredSections.map((section, index) => (
                            <motion.article
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
                            </motion.article>
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
            </main>

            {isDesktop && rightPortalNode ? createPortal(sidebarContent, rightPortalNode) : (!isDesktop && sidebarContent)}

            <BackToTop strings={strings.changelog || {}} isShifted={!hideOnScroll}/>
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
        </>
    );
}