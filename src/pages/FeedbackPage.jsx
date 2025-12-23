import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { applyMaterialTheme, getSeedColor, getSurfaceColor } from '../theme/themeUtils';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { getGuidanceKey, generateMailto } from '../utils/feedbackUtils';
import { SiteConfig } from '../utils/siteConstants';
import PageBackground from '../components/layout/PageBackground';
import AppNavbar from '../components/layout/AppNavbar';
import AppFooter from '../components/layout/AppFooter';
import CustomSelect from "../components/ui/CustomSelect.jsx";
import {siteProjectConfig} from "../config.js";
import {pixelCompassConfig} from "./pixel-compass/PixelCompassConfig.js";
import {pixelPulseConfig} from "./pixel-pulse/PixelPulseConfig.js";
import { useMemo } from 'react';

/**
 * FeedbackPage Component.
 *
 * A dedicated page for users to send structured feedback.
 * Refined for mobile UX with better spacing, custom inputs, and smooth animations.
 */
export default function FeedbackPage() {
    const { content } = useLanguage();
    const t = content.feedback;
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const projectOptions = [
        { value: "portfolio", label: t.projects.portfolio },
        { value: "pixelpulse", label: t.projects.pixelpulse },
        { value: "pixelcompass", label: t.projects.pixelcompass }
    ];

    const platformOptions = [
        { value: "android", label: t.platforms.android },
        { value: "wearos", label: t.platforms.wearos },
        { value: "web", label: t.platforms.web }
    ];

    const [project, setProject] = useState(searchParams.get('source') || 'portfolio');
    const [platform, setPlatform] = useState(searchParams.get('platform') || 'web');
    const [type, setType] = useState('general');
    const [message, setMessage] = useState('');
    const [includeInfo, setIncludeInfo] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [guidanceKey, setGuidanceKey] = useState('default_general');

    const projectContext = useMemo(() => {
        switch (project) {
            case 'pixelpulse':
                return {
                    config: pixelPulseConfig,
                    strings: content.pixel_pulse,
                    backPath: '/pixelpulse',
                    isPortfolio: false
                };
            case 'pixelcompass':
                return {
                    config: pixelCompassConfig,
                    strings: content.pixel_compass,
                    backPath: '/pixelcompass',
                    isPortfolio: false
                };
            case 'portfolio':
            default:
                return {
                    config: { ...siteProjectConfig, materialIcon: 'chat_bubble' },
                    strings: content,
                    backPath: '/',
                    isPortfolio: true
                };
        }
    }, [project, content]);

    const seedColor = getSeedColor();
    const surfaceColor = getSurfaceColor(seedColor, true);

    usePageMetadata({
        title: "Feedback - Fernando Vaz",
        themeColor: surfaceColor,
        favicon: SiteConfig.assets.avatar
    });

    useEffect(() => {
        applyMaterialTheme(seedColor, true);
    }, []);

    useEffect(() => {
        const savedDraft = localStorage.getItem('feedback_draft');
        if (savedDraft) {
            try {
                const draft = JSON.parse(savedDraft);
                if (!searchParams.get('source')) setProject(draft.project);
                setType(draft.type);
                setMessage(draft.message);
                setPlatform(draft.platform);
            } catch (e) { console.error("Error loading draft", e); }
        }
    }, []);

    useEffect(() => {
        if (isSuccess) return;
        const draft = { project, type, message, platform };
        localStorage.setItem('feedback_draft', JSON.stringify(draft));
    }, [project, type, message, platform, isSuccess]);

    useEffect(() => {
        setGuidanceKey(getGuidanceKey(type, message, t));
    }, [type, message, t]);

    const handleSend = () => {
        const mailtoLink = generateMailto({ project, platform, type, message, includeInfo });
        window.location.href = mailtoLink;
        setIsSuccess(true);
        localStorage.removeItem('feedback_draft');
    };

    const handleClear = () => {
        if (window.confirm("Delete draft?")) {
            setMessage('');
            localStorage.removeItem('feedback_draft');
        }
    };

    /**
     * Handles navigation for Footer and Navbar back button.
     * Uses the context-aware paths.
     */
    const handleNavigation = (target) => {
        if (target === 'index' || target === 'back') {
            navigate(projectContext.backPath);
            return;
        }

        if (projectContext.isPortfolio) {
            navigate(`/${target}`);
        }
        else {
            navigate(`/${project}/${target}`);
        }
    };

    return (
        <div className="page-wrapper">
            <PageBackground />

            <AppNavbar
                config={projectContext.config}
                activePage="feedback"
                onNavigate={handleNavigation}
                strings={{ back: t.success.btn_home || "Back" }}
            />

            <main className="page-content-wrapper" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '120px',
                paddingBottom: '120px',
                minHeight: '80vh'
            }}>
                <AnimatePresence mode="wait">
                    {!isSuccess ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="glass-card"
                            style={{
                                maxWidth: '600px',
                                width: '90%',
                                padding: 'clamp(24px, 5vw, 40px)',
                                margin: '0 auto',
                                borderRadius: '32px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '24px',
                                border: '1px solid rgba(255, 255, 255, 0.08)'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.2rem)', margin: 0, fontWeight: 700 }}>{t.title}</h1>
                                    <p style={{ margin: '4px 0 0 0', color: 'var(--md-sys-color-on-surface-variant)', fontSize: '0.95rem' }}>
                                        {t.subtitle}
                                    </p>
                                </div>
                                {message.length > 0 && (
                                    <button onClick={handleClear} title={t.form.discard_draft}
                                            style={{
                                                background: 'rgba(var(--md-sys-color-error-rgb), 0.1)',
                                                border: 'none', borderRadius: '50%',
                                                width: '40px', height: '40px',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                cursor: 'pointer', color: 'var(--md-sys-color-error)'
                                            }}>
                                        <span className="material-symbols-outlined">delete</span>
                                    </button>
                                )}
                            </div>

                            <motion.div
                                layout
                                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                                style={{
                                    background: 'var(--md-sys-color-tertiary-container)',
                                    color: 'var(--md-sys-color-on-tertiary-container)',
                                    padding: '20px', borderRadius: '20px',
                                    display: 'flex', gap: '16px', alignItems: 'flex-start',
                                    border: '1px solid rgba(255,255,255,0.1)'
                                }}
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>lightbulb</span>
                                <div style={{ flex: 1 }}>
                                    <strong style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.8, marginBottom: '6px', letterSpacing: '1px' }}>
                                        {t.guidance.label}
                                    </strong>
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={guidanceKey}
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <span style={{ fontSize: '1rem', lineHeight: 1.5, display: 'block', fontWeight: 500 }}>
                                                {t.guidance[guidanceKey]}
                                            </span>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </motion.div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                                <CustomSelect
                                    label={t.form.project_label}
                                    value={project}
                                    onChange={setProject}
                                    options={projectOptions}
                                />

                                <CustomSelect
                                    label={t.form.platform_label}
                                    value={platform}
                                    onChange={setPlatform}
                                    options={platformOptions}
                                />

                            </div>

                            <div>
                                <label className="input-label" style={{ display: 'block', marginBottom: '12px' }}>
                                    {t.form.type_label}
                                </label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                    {['general', 'bug', 'feature', 'translation', 'ui'].map(key => (
                                        <button
                                            key={key}
                                            onClick={() => setType(key)}
                                            style={{
                                                padding: '12px 20px', borderRadius: '16px',
                                                background: type === key ? 'var(--md-sys-color-secondary-container)' : 'rgba(255,255,255,0.05)',
                                                color: type === key ? 'var(--md-sys-color-on-secondary-container)' : 'var(--md-sys-color-on-surface-variant)',
                                                border: type === key ? '1px solid var(--md-sys-color-secondary)' : '1px solid var(--md-sys-color-outline-variant)',
                                                cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500,
                                                transition: 'all 0.2s', flexGrow: 1, textAlign: 'center'
                                            }}
                                        >
                                            {t.types[key]}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="input-wrapper">
                                <label className="input-label">{t.form.description_label}</label>
                                <div style={{ position: 'relative' }}>
                                    <textarea
                                        className="custom-input"
                                        value={message}
                                        onChange={e => setMessage(e.target.value)}
                                        placeholder={t.form.description_placeholder}
                                        style={{
                                            height: '200px',
                                            resize: 'none',
                                            paddingBottom: '36px'
                                        }}
                                    />
                                    <span className="char-counter">
                                        {message.length} chars
                                    </span>
                                </div>
                            </div>

                            <label style={{
                                display: 'flex', alignItems: 'center', gap: '16px',
                                cursor: 'pointer', padding: '16px',
                                background: 'rgba(var(--md-sys-color-surface-container-high-rgb), 0.5)',
                                borderRadius: '16px', border: '1px solid var(--md-sys-color-outline-variant)'
                            }}>
                                <input
                                    type="checkbox"
                                    checked={includeInfo}
                                    onChange={e => setIncludeInfo(e.target.checked)}
                                    style={{ width: '22px', height: '22px', accentColor: 'var(--md-sys-color-primary)' }}
                                />
                                <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{t.form.include_device_info}</span>
                            </label>

                            <button
                                onClick={handleSend}
                                disabled={message.length < 5}
                                className="btn-glow"
                                style={{
                                    justifyContent: 'center',
                                    marginTop: '16px',
                                    opacity: message.length < 5 ? 0.5 : 1,
                                    width: '100%',
                                    padding: '20px'
                                }}
                            >
                                <span className="material-symbols-outlined">send</span>
                                {t.form.send_button}
                            </button>

                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="glass-card"
                            style={{
                                maxWidth: '500px', width: '90%', padding: '48px 32px',
                                margin: '20px', borderRadius: '32px', textAlign: 'center',
                                border: '1px solid var(--md-sys-color-primary-container)'
                            }}
                        >
                            <div style={{
                                width: '80px', height: '80px', borderRadius: '50%',
                                background: 'var(--md-sys-color-primary-container)',
                                color: 'var(--md-sys-color-on-primary-container)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto 24px auto'
                            }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '40px' }}>mark_email_read</span>
                            </div>

                            <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>{t.success.title}</h2>
                            <p style={{ lineHeight: 1.6, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '48px', fontSize: '1.1rem' }}>
                                {t.success.message}
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <button onClick={handleSend} className="btn-glow" style={{ justifyContent: 'center', width: '100%' }}>
                                    <span className="material-symbols-outlined">open_in_new</span> {t.success.btn_retry}
                                </button>
                                <button onClick={() => setIsSuccess(false)} className="btn-outline" style={{ justifyContent: 'center', width: '100%', border: '1px solid var(--md-sys-color-outline-variant)' }}>
                                    <span className="material-symbols-outlined">edit</span> {t.success.btn_edit}
                                </button>
                                <button onClick={() => navigate('/')} className="btn-outline" style={{ justifyContent: 'center', width: '100%', border: 'none', marginTop: '8px' }}>
                                    {t.success.btn_home}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <AppFooter
                strings={projectContext.strings}
                onNavigate={handleNavigation}
                activePage="feedback"
                isPortfolio={projectContext.isPortfolio}
            />
            <style>{`
                .mobile-toggle-wrapper { display: none !important; }
                .input-wrapper { display: flex; flexDirection: column; gap: 8px; }
                .input-label { font-size: 0.9rem; font-weight: 600; color: var(--md-sys-color-on-surface-variant); margin-left: 4px; }
                .custom-select-container { position: relative; width: 100%; }
                .custom-input {
                    width: 100%;
                    background: rgba(var(--md-sys-color-surface-container-high-rgb), 0.5);
                    border: 1px solid var(--md-sys-color-outline-variant);
                    color: var(--md-sys-color-on-surface);
                    padding: 16px; padding-right: 40px;
                    border-radius: 16px;
                    font-size: 1rem;
                    font-family: inherit;
                    appearance: none; -webkit-appearance: none;
                    outline: none;
                    transition: border-color 0.2s, box-shadow 0.2s;
                }
                .custom-input:focus { border-color: var(--md-sys-color-primary); box-shadow: 0 0 0 4px rgba(var(--md-sys-color-primary-rgb), 0.15); }
                .custom-input option { background: var(--md-sys-color-surface-container); color: var(--md-sys-color-on-surface); padding: 12px; }
                .select-icon { position: absolute; right: 16px; top: 50%; transform: translateY(-50%); pointer-events: none; color: var(--md-sys-color-on-surface-variant); font-size: 24px; }
                .char-counter { position: absolute; bottom: 12px; right: 12px; font-size: 0.75rem; font-weight: 600; color: var(--md-sys-color-on-surface-variant); background: var(--md-sys-color-surface-container); padding: 4px 8px; border-radius: 6px; pointer-events: none; opacity: 0.8; }
                .btn-icon { background: transparent; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; }
                .btn-icon:hover { background: rgba(var(--md-sys-color-error-rgb), 0.1); }
            `}</style>
        </div>
    );
}