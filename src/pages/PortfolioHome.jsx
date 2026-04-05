import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate, Link} from 'react-router-dom';
import {useLanguage} from '../context/LanguageContext';
import {applyMaterialTheme, getSurfaceColor, getSeedColor} from '../theme/themeUtils';
import {usePageMetadata} from '../hooks/usePageMetadata';
import {SiteConfig} from '../utils/siteConstants';

import PageTransition from '../components/layout/PageTransition';
import PageBackground from '../components/layout/PageBackground';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Projects from '../components/sections/Projects';
import TechStack from '../components/sections/TechStack';
import GitHubStats from '../components/sections/GitHubStats';
import AppFooter from '../components/layout/AppFooter';
import AppLayout from '../components/layout/AppLayout';

/**
 * @returns {JSX.Element}
 */
export default function PortfolioHome() {
    const {content} = useLanguage();
    const location = useLocation();
    const navigate = useNavigate();

    const [activeColor] = useState(() => getSeedColor());

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.has('color')) {
            const newUrl = window.location.pathname + window.location.hash;
            window.history.replaceState({}, '', newUrl);
        }
    }, [location.search]);

    const surfaceColor = getSurfaceColor(activeColor);

    useEffect(() => {
        applyMaterialTheme(activeColor);
    }, [activeColor]);

    usePageMetadata({
        title: "Fernando Vaz | Software Engineer",
        description: "Portfolio of Fernando Vaz, a Software Engineer specializing in Android and Web Development.",
        themeColor: surfaceColor,
        favicon: SiteConfig.assets.avatar,
        type: 'profile'
    });

    /**
     * @param {string} key
     */
    const handleFooterNavigation = (key) => {
        navigate(`/${key}`);
    };

    return (
        <AppLayout
            background={<PageBackground/>}
            footer={
                <AppFooter
                    strings={{
                        ...content,
                        nav: content.nav || {
                            overview: content.overview_page?.title || 'Overview',
                            changelog: content.changelog?.title || 'Changelog',
                            roadmap: content.roadmap_page?.title || 'Roadmap',
                            privacy: content.privacy_page?.page_title || 'Privacy Policy',
                            terms: content.terms_page?.page_title || 'Terms of Use',
                            help: content.help_page?.page_title || 'Help & FAQ'
                        }
                    }}
                    onNavigate={handleFooterNavigation}
                    activePage="index"
                    isPortfolio={true}
                />
            }
        >
            <PageTransition>
                <main className="app-main-content app-main-content-full">
                    <Hero t={content.hero}/>

                    <About t={content.about}/>

                    <div id="projects-section">
                        <Projects t={content.projects}/>
                    </div>

                    <GitHubStats t={content.github}/>

                    <section className="contact-section-container">
                        <div className="contact-card">
                            <div className="contact-glow-primary"></div>
                            <div className="contact-glow-tertiary"></div>

                            <div className="contact-content">
                                <h2 className="contact-title">
                                    {content.contact.title}
                                </h2>

                                <p className="contact-desc">
                                    {content.contact.desc}
                                </p>

                                <div className="contact-actions">
                                    <Link to={SiteConfig.routes.feedback} className="btn-glow contact-btn-primary">
                                        {content.contact.email}
                                    </Link>
                                    <a href={SiteConfig.links.linkedin} target="_blank" rel="noreferrer"
                                       className="btn-outline contact-btn-outline">
                                        {content.contact.linkedin}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>

                    <TechStack t={content.tech}/>
                </main>
            </PageTransition>
        </AppLayout>
    );
}