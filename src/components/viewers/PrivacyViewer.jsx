import React, {useEffect, useState} from 'react';
import {createPortal} from 'react-dom';
import {motion} from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import {useNavigate} from 'react-router-dom';
import {parsePrivacyPolicy} from '../../utils/privacyParser';
import BackToTop from '../common/BackToTop';
import PageTableOfContents from '../common/PageTableOfContents';
import {useSectionScroll} from '../../hooks/useSectionScroll';
import {handleContactSupport} from '../../utils/navigationUtils';
import ViewerHeader from '../common/ViewerHeader';
import ViewerSidebar from '../common/ViewerSidebar';

/**
 * Component to view the privacy policy documentation interactively.
 * Includes scroll-hide mobile search, dynamic desktop portal search, and section tracking.
 *
 * @param {Object} props
 * @returns {JSX.Element}
 */
export default function PrivacyViewer({markdownContent, appConfig, strings}) {
    const [data, setData] = useState({lastUpdated: '', intro: null, sections: []});
    const navigate = useNavigate();

    const {activeSection, setActiveSection, scrollToSection} = useSectionScroll('');
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1000);
    const [rightPortalNode, setRightPortalNode] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const rightNode = document.getElementById('right-sidebar-portal');
            if (rightNode) {
                setRightPortalNode(rightNode);
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
            const parsed = parsePrivacyPolicy(markdownContent);
            setData(parsed);
            if (parsed.sections.length > 0 && !activeSection) {
                setActiveSection(parsed.sections[0].id);
            }
        }
    }, [markdownContent, setActiveSection]);

    const renderTocItems = () => (
        <div className="toc-scroll-area" data-lenis-prevent="true">
            {data.sections.map((section) => (
                <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`toc-item-btn ${activeSection === section.id ? 'active' : ''}`}
                >
                    <span className="toc-item-text">
                        {section.title}
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

    const t = strings?.privacy_page || {};

    const sidebarContent = (
        <div style={isDesktop ? {padding: '24px 16px'} : {}}>
            <ViewerSidebar
                cardTitle={t.contact_title || "Privacy Questions?"}
                cardDesc={t.contact_desc || "Contact us for privacy related questions."}
                cardBtnText={t.contact_btn || "Contact Support"}
                onBtnClick={onSupportClick}
            >
                <PageTableOfContents title={t.table_of_contents || "Table of Contents"} isMobile={false}>
                    {renderTocItems()}
                </PageTableOfContents>
            </ViewerSidebar>
        </div>
    );

    return (
        <>
            <main className="app-main-content viewer-main-content">
                <ViewerHeader
                    appName={appConfig?.appName}
                    icon="verified_user"
                    title={t.page_title || "Privacy Policy"}
                    lastUpdated={data.lastUpdated}
                    lastUpdatedText={t.last_updated || "Last Updated:"}
                    actionNode={
                        <div className="header-action-buttons">
                            <button onClick={() => window.print()} className="header-ghost-btn"
                                    title={t.print_btn || "Print Policy"}>
                                <span className="material-symbols-outlined" style={{fontSize: '20px'}}>print</span>
                                <span className="header-btn-text">{t.print_btn || "Print Policy"}</span>
                            </button>
                        </div>
                    }
                    introNode={data.intro &&
                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{data.intro.content}</ReactMarkdown>}
                />

                <div className="mobile-toc-wrapper">
                    <PageTableOfContents title={t.table_of_contents || "Table of Contents"} isMobile={true}>
                        {renderTocItems()}
                    </PageTableOfContents>
                </div>

                <div className="privacy-sections-container">
                    {data.sections.map((section, index) => (
                        <motion.article key={section.id} id={section.id} initial={{opacity: 0, y: 20}}
                                        whileInView={{opacity: 1, y: 0}} viewport={{once: true, margin: "-100px"}}
                                        className={`viewer-section ${index !== data.sections.length - 1 ? 'viewer-section-bordered' : ''}`}>
                            <h2 className="viewer-section-title">{section.title}</h2>

                            <div className="markdown-body rich-text">
                                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{section.content}</ReactMarkdown>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </main>

            {isDesktop && rightPortalNode ? createPortal(sidebarContent, rightPortalNode) : (!isDesktop && sidebarContent)}

            <BackToTop strings={strings?.changelog}/>
        </>
    );
}