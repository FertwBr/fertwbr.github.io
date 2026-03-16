/**
 * @file FeedbackPage.jsx
 * @description A dedicated page for users to send structured feedback, including email validation and file attachments.
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { applyMaterialTheme, getSeedColor, getSurfaceColor } from '../theme/themeUtils';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { getGuidanceKey } from '../utils/feedbackUtils';
import { SiteConfig } from '../utils/siteConstants';
import PageBackground from '../components/layout/PageBackground';
import AppNavbar from '../components/layout/AppNavbar';
import AppFooter from '../components/layout/AppFooter';
import CustomSelect from "../components/ui/CustomSelect.jsx";
import { siteProjectConfig } from "../config.js";
import { pixelCompassConfig } from "./pixel-compass/PixelCompassConfig.js";
import { pixelPulseConfig } from "./pixel-pulse/PixelPulseConfig.js";

/**
 * Converts a File object to a Base64 string.
 * @param {File} file
 * @returns {Promise<string>}
 */
const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
});

export default function FeedbackPage() {
    const { content, language } = useLanguage();
    const t = content.feedback || {};
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const projectOptions = [
        { value: "portfolio", label: t.projects?.portfolio || "Portfolio" },
        { value: "pixelpulse", label: t.projects?.pixelpulse || "Pixel Pulse" },
        { value: "pixelcompass", label: t.projects?.pixelcompass || "Pixel Compass" }
    ];

    const platformOptions = [
        { value: "android", label: t.platforms?.android || "Android" },
        { value: "wearos", label: t.platforms?.wearos || "Wear OS" },
        { value: "web", label: t.platforms?.web || "Web" }
    ];

    const [project, setProject] = useState(searchParams.get('source') || 'portfolio');
    const [platform, setPlatform] = useState(searchParams.get('platform') || 'web');
    const [type, setType] = useState('general');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [includeInfo, setIncludeInfo] = useState(true);
    const [attachment, setAttachment] = useState(null);
    const [sendStatus, setSendStatus] = useState('idle');
    const [guidanceKey, setGuidanceKey] = useState('default_general');
    const [validationErrors, setValidationErrors] = useState({ email: false, message: false });

    const projectContext = useMemo(() => {
        switch (project) {
            case 'pixelpulse':
                return { config: pixelPulseConfig, strings: content.pixel_pulse, backPath: '/pixelpulse', isPortfolio: false };
            case 'pixelcompass':
                return { config: pixelCompassConfig, strings: content.pixel_compass, backPath: '/pixelcompass', isPortfolio: false };
            case 'portfolio':
            default:
                return { config: { ...siteProjectConfig, materialIcon: 'chat_bubble' }, strings: content, backPath: '/', isPortfolio: true };
        }
    }, [project, content]);

    const seedColor = getSeedColor();
    const surfaceColor = getSurfaceColor(seedColor, true);

    usePageMetadata({
        title: "Feedback - Fernando Vaz",
        description: "Send feedback, bug reports, or feature requests.",
        themeColor: surfaceColor,
        favicon: SiteConfig.assets.avatar,
        type: 'website'
    });

    useEffect(() => {
        applyMaterialTheme(seedColor, true);
    }, [seedColor]);

    useEffect(() => {
        const savedDraft = localStorage.getItem('feedback_draft');
        if (savedDraft) {
            try {
                const draft = JSON.parse(savedDraft);
                if (!searchParams.get('source')) setProject(draft.project || 'portfolio');
                setType(draft.type || 'general');
                setMessage(draft.message || '');
                setPlatform(draft.platform || 'web');
                setEmail(draft.email || '');
            } catch (e) {
                localStorage.removeItem('feedback_draft');
            }
        }
    }, [searchParams]);

    useEffect(() => {
        if (sendStatus === 'success' || sendStatus === 'error') return;
        const draft = { project, type, message, platform, email };
        localStorage.setItem('feedback_draft', JSON.stringify(draft));
    }, [project, type, message, platform, email, sendStatus]);

    useEffect(() => {
        setGuidanceKey(getGuidanceKey(type, message, t));
    }, [type, message, t]);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setAttachment(e.target.files[0]);
        }
    };

    const validateForm = () => {
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
        const isMessageValid = message.trim().length >= 15;
        setValidationErrors({ email: !isEmailValid, message: !isMessageValid });
        return isEmailValid && isMessageValid;
    };

    const handleSend = async () => {
        if (!validateForm()) return;

        setSendStatus('sending');

        let attachmentBase64 = null;
        let attachmentName = null;

        if (attachment) {
            try {
                attachmentBase64 = await toBase64(attachment);
                attachmentName = attachment.name;
            } catch (e) {
                setSendStatus('error');
                return;
            }
        }

        const debugInfo = includeInfo ? `User Agent: ${navigator.userAgent}\nLanguage: ${navigator.language}\nScreen: ${window.screen.width}x${window.screen.height}` : null;

        const payload = {
            project,
            platform,
            type,
            email: email.trim(),
            message: message.trim(),
            debugInfo,
            languageCode: language || 'en',
            attachmentBase64,
            attachmentName
        };

        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setSendStatus('success');
                localStorage.removeItem('feedback_draft');
                setMessage('');
                setAttachment(null);
            } else {
                setSendStatus('error');
            }
        } catch (error) {
            setSendStatus('error');
        }
    };

    const handleClear = () => {
        if (window.confirm(t.form?.discard_draft || "Delete draft?")) {
            setMessage('');
            setEmail('');
            setAttachment(null);
            setValidationErrors({ email: false, message: false });
            localStorage.removeItem('feedback_draft');
        }
    };

    const handleNavigation = (target) => {
        if (target === 'index' || target === 'back') {
            navigate(projectContext.backPath);
            return;
        }
        if (projectContext.isPortfolio) {
            navigate(`/${target}`);
        } else {
            navigate(`/${project}/${target}`);
        }
    };

    const isResultState = sendStatus === 'success' || sendStatus === 'error';

    return (
        <div className="page-wrapper">
            <PageBackground />
            <AppNavbar config={projectContext.config} activePage="feedback" onNavigate={handleNavigation} strings={{ back: t.success?.btn_home || "Back" }} />

            <main className="page-content-wrapper" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                paddingTop: '120px', paddingBottom: '120px', minHeight: '80vh'
            }}>
                <AnimatePresence mode="wait">
                    {!isResultState ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="glass-card"
                            style={{
                                maxWidth: '600px', width: '90%', padding: 'clamp(24px, 5vw, 40px)',
                                margin: '0 auto', borderRadius: '32px', display: 'flex',
                                flexDirection: 'column', gap: '24px', border: '1px solid rgba(255, 255, 255, 0.08)'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.2rem)', margin: 0, fontWeight: 700 }}>{t.title || "Feedback"}</h1>
                                    <p style={{ margin: '4px 0 0 0', color: 'var(--md-sys-color-on-surface-variant)', fontSize: '0.95rem' }}>{t.subtitle || "Help us improve"}</p>
                                </div>
                                {(message.length > 0 || email.length > 0 || attachment) && (
                                    <button onClick={handleClear} title={t.form?.discard_draft}
                                            style={{
                                                background: 'rgba(var(--md-sys-color-error-rgb), 0.1)', border: 'none',
                                                borderRadius: '50%', width: '40px', height: '40px', display: 'flex',
                                                alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                                                color: 'var(--md-sys-color-error)'
                                            }}>
                                        <span className="material-symbols-outlined">delete</span>
                                    </button>
                                )}
                            </div>

                            <motion.div
                                layout
                                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                                style={{
                                    background: 'var(--md-sys-color-tertiary-container)', color: 'var(--md-sys-color-on-tertiary-container)',
                                    padding: '20px', borderRadius: '20px', display: 'flex', gap: '16px',
                                    alignItems: 'flex-start', border: '1px solid rgba(255,255,255,0.1)'
                                }}
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>lightbulb</span>
                                <div style={{ flex: 1 }}>
                                    <strong style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.8, marginBottom: '6px', letterSpacing: '1px' }}>
                                        {t.guidance?.label || "Tip"}
                                    </strong>
                                    <AnimatePresence mode="wait">
                                        <motion.div key={guidanceKey} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.2 }}>
                                            <span style={{ fontSize: '1rem', lineHeight: 1.5, display: 'block', fontWeight: 500 }}>
                                                {t.guidance?.[guidanceKey] || "Please provide as much detail as possible."}
                                            </span>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </motion.div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <CustomSelect label={t.form?.project_label || "Project"} value={project} onChange={setProject} options={projectOptions} />
                                <CustomSelect label={t.form?.platform_label || "Platform"} value={platform} onChange={setPlatform} options={platformOptions} />
                            </div>

                            <div>
                                <label className="input-label" style={{ display: 'block', marginBottom: '12px' }}>{t.form?.type_label || "Feedback Type"}</label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                    {['general', 'bug', 'feature', 'translation', 'ui'].map(key => (
                                        <button
                                            key={key} onClick={() => setType(key)}
                                            style={{
                                                padding: '12px 20px', borderRadius: '16px',
                                                background: type === key ? 'var(--md-sys-color-secondary-container)' : 'rgba(255,255,255,0.05)',
                                                color: type === key ? 'var(--md-sys-color-on-secondary-container)' : 'var(--md-sys-color-on-surface-variant)',
                                                border: type === key ? '1px solid var(--md-sys-color-secondary)' : '1px solid var(--md-sys-color-outline-variant)',
                                                cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500, transition: 'all 0.2s', flexGrow: 1, textAlign: 'center'
                                            }}
                                        >
                                            {t.types?.[key] || key}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="input-wrapper">
                                <label htmlFor="userEmail" className="input-label" style={{ color: validationErrors.email ? 'var(--md-sys-color-error)' : 'var(--md-sys-color-on-surface-variant)' }}>
                                    {t.form?.email_label || "Email Address"}
                                </label>
                                <input
                                    id="userEmail"
                                    name="userEmail"
                                    type="email"
                                    autoComplete="email"
                                    className="custom-input"
                                    value={email}
                                    onChange={e => { setEmail(e.target.value); setValidationErrors(prev => ({...prev, email: false})); }}
                                    placeholder={t.form?.email_placeholder || "your@email.com"}
                                    style={{
                                        paddingRight: '16px',
                                        borderColor: validationErrors.email ? 'var(--md-sys-color-error)' : 'var(--md-sys-color-outline-variant)',
                                        boxShadow: validationErrors.email ? '0 0 0 1px var(--md-sys-color-error)' : 'none'
                                    }}
                                />
                                {validationErrors.email && <span style={{ color: 'var(--md-sys-color-error)', fontSize: '0.8rem', marginTop: '4px', marginLeft: '4px' }}>{t.form?.email_error || "Invalid email"}</span>}
                            </div>

                            <div className="input-wrapper">
                                <label htmlFor="userMessage" className="input-label" style={{ color: validationErrors.message ? 'var(--md-sys-color-error)' : 'var(--md-sys-color-on-surface-variant)' }}>
                                    {t.form?.description_label || "Description"}
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <textarea
                                        id="userMessage"
                                        name="userMessage"
                                        className="custom-input"
                                        value={message}
                                        onChange={e => { setMessage(e.target.value); setValidationErrors(prev => ({...prev, message: false})); }}
                                        placeholder={t.form?.description_placeholder || "What's on your mind?"}
                                        style={{
                                            height: '200px', resize: 'none', paddingBottom: '36px',
                                            borderColor: validationErrors.message ? 'var(--md-sys-color-error)' : 'var(--md-sys-color-outline-variant)',
                                            boxShadow: validationErrors.message ? '0 0 0 1px var(--md-sys-color-error)' : 'none'
                                        }}
                                    />
                                    <span className="char-counter">{message.length} chars</span>
                                </div>
                                {validationErrors.message && <span style={{ color: 'var(--md-sys-color-error)', fontSize: '0.8rem', marginTop: '4px', marginLeft: '4px' }}>{t.form?.description_error || "Too short"}</span>}
                            </div>

                            <label htmlFor="includeInfo" style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', padding: '16px', background: 'rgba(var(--md-sys-color-surface-container-high-rgb), 0.5)', borderRadius: '16px', border: '1px solid var(--md-sys-color-outline-variant)' }}>
                                <input
                                    id="includeInfo"
                                    name="includeInfo"
                                    type="checkbox"
                                    checked={includeInfo}
                                    onChange={e => setIncludeInfo(e.target.checked)}
                                    style={{ width: '22px', height: '22px', accentColor: 'var(--md-sys-color-primary)' }}
                                />
                                <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{t.form?.include_device_info || "Include device info"}</span>
                            </label>

                            <AnimatePresence>
                                {attachment && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '12px 16px', borderRadius: '16px', gap: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                            <span className="material-symbols-outlined" style={{ color: 'var(--md-sys-color-primary)' }}>image</span>
                                            <span style={{ flex: 1, fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{attachment.name}</span>
                                            <button onClick={() => setAttachment(null)} style={{ background: 'transparent', border: 'none', color: 'var(--md-sys-color-on-surface-variant)', cursor: 'pointer', display: 'flex' }}>
                                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>delete</span>
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <input
                                id="attachmentFile"
                                name="attachmentFile"
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />

                            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                                <button onClick={() => fileInputRef.current?.click()} className="btn-outline" style={{ padding: '0', width: '60px', height: '60px', borderRadius: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <span className="material-symbols-outlined">attach_file</span>
                                </button>
                                <button onClick={handleSend} disabled={sendStatus === 'sending'} className="btn-glow" style={{ flex: 1, height: '60px', justifyContent: 'center', opacity: sendStatus === 'sending' ? 0.5 : 1 }}>
                                    {sendStatus === 'sending' ? (
                                        <span className="material-symbols-outlined" style={{ animation: 'spin 1s linear infinite' }}>autorenew</span>
                                    ) : (
                                        <><span className="material-symbols-outlined">send</span>{t.form?.send_button || "Send"}</>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                            className="glass-card"
                            style={{
                                maxWidth: '500px', width: '90%', padding: '48px 32px', margin: '20px', borderRadius: '32px', textAlign: 'center',
                                border: sendStatus === 'error' ? '1px solid var(--md-sys-color-error)' : '1px solid var(--md-sys-color-primary-container)'
                            }}
                        >
                            <div style={{
                                width: '80px', height: '80px', borderRadius: '50%',
                                background: sendStatus === 'error' ? 'var(--md-sys-color-error-container)' : 'var(--md-sys-color-primary-container)',
                                color: sendStatus === 'error' ? 'var(--md-sys-color-on-error-container)' : 'var(--md-sys-color-on-primary-container)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto'
                            }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '40px' }}>
                                    {sendStatus === 'error' ? 'warning' : 'mark_email_read'}
                                </span>
                            </div>

                            <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>
                                {sendStatus === 'error' ? (t.success?.error_title || "Error") : (t.success?.title || "Success")}
                            </h2>
                            <p style={{ lineHeight: 1.6, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '48px', fontSize: '1.1rem' }}>
                                {sendStatus === 'error' ? (t.success?.error_message || "Delivery failed.") : ((t.success?.message && t.success.message.replace('{email}', email)) || `Sent successfully. A copy was sent to ${email}.`)}
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <button onClick={() => sendStatus === 'error' ? handleSend() : setSendStatus('idle')} className="btn-glow" style={{ justifyContent: 'center', width: '100%' }}>
                                    <span className="material-symbols-outlined">{sendStatus === 'error' ? 'refresh' : 'add'}</span>
                                    {sendStatus === 'error' ? (t.success?.btn_retry || "Retry") : "Send another"}
                                </button>
                                {sendStatus === 'error' && (
                                    <button onClick={() => setSendStatus('idle')} className="btn-outline" style={{ justifyContent: 'center', width: '100%', border: '1px solid var(--md-sys-color-outline-variant)' }}>
                                        <span className="material-symbols-outlined">edit</span> {t.success?.btn_edit || "Edit"}
                                    </button>
                                )}
                                <button onClick={() => navigate('/')} className="btn-outline" style={{ justifyContent: 'center', width: '100%', border: 'none', marginTop: '8px' }}>
                                    {t.success?.btn_home || "Return Home"}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <AppFooter strings={projectContext.strings} onNavigate={handleNavigation} activePage="feedback" isPortfolio={projectContext.isPortfolio} />
            <style>{`
                .mobile-toggle-wrapper { display: none !important; }
                .input-wrapper { display: flex; flexDirection: column; gap: 8px; }
                .input-label { font-size: 0.9rem; font-weight: 600; margin-left: 4px; transition: color 0.3s; }
                .custom-select-container { position: relative; width: 100%; }
                .custom-input {
                    width: 100%; background: rgba(var(--md-sys-color-surface-container-high-rgb), 0.5);
                    border: 1px solid; color: var(--md-sys-color-on-surface);
                    padding: 16px; border-radius: 16px; font-size: 1rem; font-family: inherit;
                    appearance: none; -webkit-appearance: none; outline: none; transition: border-color 0.3s, box-shadow 0.3s;
                }
                .custom-input:focus { border-color: var(--md-sys-color-primary) !important; box-shadow: 0 0 0 4px rgba(var(--md-sys-color-primary-rgb), 0.15) !important; }
                .char-counter { position: absolute; bottom: 12px; right: 12px; font-size: 0.75rem; font-weight: 600; color: var(--md-sys-color-on-surface-variant); background: var(--md-sys-color-surface-container); padding: 4px 8px; border-radius: 6px; pointer-events: none; opacity: 0.8; }
                @keyframes spin { 100% { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
}