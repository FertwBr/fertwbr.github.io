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
 * Renders the Terms of Use document, parsed from Markdown.
 * Extracted into sections for easier navigation via TOC.
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
        data.sections.map((section) => (
            <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`toc-btn ${activeSection === section.id ? 'active' : 'inactive'}`}
            >
                {section.title}
            </button>
        ))
    );

    const onSupportClick = () => {
        handleContactSupport('support', navigate, {
            source: appConfig?.appId || 'portfolio',
            platform: 'android'
        });
    };

    const t = strings?.terms_page || {};

    return (
        <div className="viewer-container">
            <ViewerHeader
                appName={appConfig?.appName}
                icon="gavel"
                title={t.page_title}
                lastUpdated={data.lastUpdated}
                lastUpdatedText={t.last_updated}
                actionNode={
                    <button onClick={() => window.print()} className="btn-outline"
                            style={{padding: '10px 24px', fontSize: '0.9rem'}}>
                        <span className="material-symbols-outlined" style={{fontSize: '18px'}}>print</span>
                        {t.print_btn}
                    </button>
                }
                introNode={data.intro &&
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{data.intro.content}</ReactMarkdown>}
            />

            <div className="viewer-layout">
                <div className="viewer-main-content">
                    <div className="mobile-toc-wrapper" style={{display: 'none'}}>
                        <PageTableOfContents title={t.table_of_contents} isMobile={true}>
                            {renderTocItems()}
                        </PageTableOfContents>
                    </div>

                    <div className="terms-sections-container">
                        {data.sections.map((section, index) => (
                            <motion.div
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
                            </motion.div>
                        ))}
                    </div>
                </div>

                <ViewerSidebar
                    cardTitle={t.contact_title}
                    cardDesc={t.contact_desc}
                    cardBtnText={t.contact_btn}
                    onBtnClick={onSupportClick}
                >
                    <PageTableOfContents title={t.table_of_contents} isMobile={false}>
                        {renderTocItems()}
                    </PageTableOfContents>
                </ViewerSidebar>

                <BackToTop strings={strings?.changelog}/>
            </div>
        </div>
    );
}