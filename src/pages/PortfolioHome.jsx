import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useLanguage} from '../context/LanguageContext';
import {applyMaterialTheme, getSurfaceColor, getSeedColor} from '../theme/themeUtils';
import {usePageMetadata} from '../hooks/usePageMetadata';

import PageTransition from '../components/layout/PageTransition';
import PageBackground from '../components/layout/PageBackground';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Projects from '../components/sections/Projects';
import TechStack from '../components/sections/TechStack';
import GitHubStats from '../components/sections/GitHubStats';
import AppFooter from '../components/layout/AppFooter';

/**
 * PortfolioHome component
 *
 * Main entry page for the portfolio. Responsibilities:
 * - Retrieves localized content via `useLanguage`.
 * - Cleans `color` query parameter from the URL on mount.
 * - Selects and applies a Material seed color theme (`applyMaterialTheme`).
 * - Computes surface color and supplies metadata via `usePageMetadata`.
 * - Renders page layout and sections: Hero, About, Projects, GitHubStats, Contact callout, TechStack.
 * - Uses AppFooter configured for portfolio (Docs/Changelog only).
 *
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

    const surfaceColor = getSurfaceColor(activeColor, true);

    useEffect(() => {
        applyMaterialTheme(activeColor, true);
    }, [activeColor]);

    usePageMetadata({
        title: "Fernando Vaz | Software Engineer",
        themeColor: surfaceColor,
        favicon: "https://github.com/fertwbr.png"
    });

    /**
     * Handles footer navigation.
     * Redirects internal documentation links to the /site route.
     * @param {string} key - The footer link key (overview, changelog, etc.)
     */
    const handleFooterNavigation = (key) => {
        navigate(`/site?page=${key}`);
    };

    return (
        <PageTransition>
            <PageBackground/>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100dvh',
                width: '100%'
            }}>
                <main style={{flex: 1, width: '100%'}}>
                    <Hero t={content.hero}/>

                    <About t={content.about}/>

                    <div id="projects-section">
                        <Projects t={content.projects}/>
                    </div>

                    <GitHubStats t={content.github}/>

                    <section style={{
                        padding: '0 20px 80px 20px',
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '40px'
                    }}>
                        <div style={{
                            width: '100%',
                            maxWidth: '1200px',
                            background: 'linear-gradient(135deg, var(--md-sys-color-primary-container), var(--md-sys-color-surface-container))',
                            borderRadius: '40px',
                            padding: 'clamp(60px, 10vw, 100px) 40px',
                            textAlign: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                            border: '1px solid rgba(255,255,255,0.1)',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
                        }}>
                            <div style={{
                                position: 'absolute', top: '-20%', left: '-10%',
                                width: '400px', height: '400px', borderRadius: '50%',
                                background: 'var(--md-sys-color-primary)', opacity: 0.1, filter: 'blur(80px)'
                            }}></div>
                            <div style={{
                                position: 'absolute', bottom: '-20%', right: '-10%',
                                width: '300px', height: '300px', borderRadius: '50%',
                                background: 'var(--md-sys-color-tertiary)', opacity: 0.1, filter: 'blur(60px)'
                            }}></div>

                            <div style={{position: 'relative', zIndex: 2}}>
                                <h2 style={{
                                    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                                    fontWeight: 800,
                                    lineHeight: 1.1,
                                    marginBottom: '24px',
                                    color: 'var(--md-sys-color-on-surface)'
                                }}>
                                    {content.contact.title}
                                </h2>

                                <p style={{
                                    fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                                    color: 'var(--md-sys-color-on-surface-variant)',
                                    maxWidth: '600px',
                                    margin: '0 auto 50px auto',
                                    lineHeight: 1.6
                                }}>
                                    {content.contact.desc}
                                </p>

                                <div style={{
                                    display: 'flex',
                                    gap: '16px',
                                    justifyContent: 'center',
                                    flexWrap: 'wrap'
                                }}>
                                    <a href="mailto:fertwbr@gmail.com" className="btn-glow"
                                       style={{
                                           fontSize: '1.2rem',
                                           padding: '18px 40px',
                                           borderRadius: '100px'
                                       }}>
                                        {content.contact.email}
                                    </a>
                                    <a href="https://linkedin.com/in/fernando-bela" target="_blank" rel="noreferrer"
                                       className="btn-outline"
                                       style={{
                                           fontSize: '1.2rem',
                                           padding: '18px 40px',
                                           borderRadius: '100px',
                                           background: 'rgba(255,255,255,0.05)',
                                           backdropFilter: 'blur(10px)',
                                           border: '1px solid rgba(255,255,255,0.2)'
                                       }}>
                                        {content.contact.linkedin}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>

                    <TechStack t={content.tech}/>
                </main>

                <AppFooter
                    strings={content}
                    onNavigate={handleFooterNavigation}
                    activePage="index"
                    isPortfolio={true}
                />
            </div>
        </PageTransition>
    );
}