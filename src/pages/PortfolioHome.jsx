import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
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
import Footer from '../components/layout/Footer';

export default function PortfolioHome() {
    const {content} = useLanguage();
    const location = useLocation();

    const [activeColor] = useState(() => getSeedColor());

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.has('color')) {
            window.history.replaceState({}, '', window.location.pathname);
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

                    <TechStack t={content.tech}/>
                    <GitHubStats t={content.github}/>

                    <section style={{textAlign: 'center', padding: '100px 24px', maxWidth: '800px', margin: '0 auto'}}>
                        <h2 style={{
                            fontSize: 'clamp(2rem, 4vw, 3rem)',
                            marginBottom: '32px'
                        }}>{content.contact.title}</h2>
                        <p style={{
                            fontSize: '1.2rem',
                            color: 'var(--md-sys-color-on-surface-variant)',
                            marginBottom: '48px'
                        }}>
                            {content.contact.desc}
                        </p>
                        <div style={{display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap'}}>
                            <a href="mailto:fertwbr@gmail.com" className="btn-glow">{content.contact.email}</a>
                            <a href="https://linkedin.com/in/fernando-bela" target="_blank" rel="noreferrer"
                               className="btn-outline">{content.contact.linkedin}</a>
                        </div>
                    </section>
                </main>

                <Footer t={content.footer}/>
            </div>
        </PageTransition>
    );
}