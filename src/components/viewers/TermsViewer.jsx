import React, {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import {useNavigate} from 'react-router-dom';
import {parseTermsOfUse} from '../../utils/termsParser';
import BackToTop from '../common/BackToTop';
import PageTableOfContents from '../common/PageTableOfContents';
import {useSectionScroll} from '../../hooks/useSectionScroll';
import {handleContactSupport} from '../../utils/navigationUtils';
import ViewerHeader from '../common/ViewerHeader';
import ViewerSidebar from '../common/ViewerSidebar';

/**
 * Component to view the Terms of Use documentation interactively.
 * Implements a synchronized Table of Contents and responsive layout.
 *
 * @param {Object} props
 * @param {string} props.markdownContent
 * @param {Object} props.appConfig
 * @param {Object} props.strings
 * @returns {JSX.Element}
 */
export default function TermsViewer({markdownContent, appConfig, strings}) {
    const [data, setData] = useState({lastUpdated: '', intro: null, sections: []});
    const navigate = useNavigate();

    const {activeSection, setActiveSection, scrollToSection} = useSectionScroll('');

    useEffect(() => {
        if (markdownContent) {
            const parsed = parseTermsOfUse(markdownContent);
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

    const t = strings?.terms_page || {};

    return (
        <>
            <main className="app-main-content viewer-main-content">
                <ViewerHeader
                    appName={appConfig?.appName}
                    icon="gavel"
                    title={t.page_title || "Terms of Use"}
                    lastUpdated={data.lastUpdated}
                    lastUpdatedText={t.last_updated || "Last Updated:"}
                    actionNode={
                        <div className="header-action-buttons">
                            <button onClick={() => window.print()} className="header-ghost-btn" title={t.print_btn || "Print Terms"}>
                                <span className="material-symbols-outlined" style={{fontSize: '20px'}}>print</span>
                                <span className="header-btn-text">{t.print_btn || "Print Terms"}</span>
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

                <div className="terms-sections-container">
                    {data.sections.map((section, index) => (
                        <motion.article
                            key={section.id}
                            id={section.id}
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true, margin: "-100px"}}
                            className={`viewer-section ${index !== data.sections.length - 1 ? 'viewer-section-bordered' : ''}`}
                        >
                            <h2 className="viewer-section-title">{section.title}</h2>

                            <div className="markdown-body rich-text">
                                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{section.content}</ReactMarkdown>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </main>

            <ViewerSidebar
                cardTitle={t.contact_title || "Questions about these Terms?"}
                cardDesc={t.contact_desc || "If you have any questions or concerns regarding these Terms of Use, please contact our support team."}
                cardBtnText={t.contact_btn || "Contact Support"}
                onBtnClick={onSupportClick}
            >
                <PageTableOfContents title={t.table_of_contents || "Table of Contents"} isMobile={false}>
                    {renderTocItems()}
                </PageTableOfContents>
            </ViewerSidebar>

            <BackToTop strings={strings?.changelog}/>
        </>
    );
}