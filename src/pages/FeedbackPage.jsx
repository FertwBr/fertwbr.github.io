import React, {useState, useEffect, useMemo, useRef} from 'react';
import {useSearchParams, useNavigate} from 'react-router-dom';
import {motion, AnimatePresence} from 'framer-motion';
import {useLanguage} from '../context/LanguageContext';
import {applyMaterialTheme, getSeedColor, getSurfaceColor} from '../theme/themeUtils';
import {usePageMetadata} from '../hooks/usePageMetadata';
import {getGuidanceKey} from '../utils/feedbackUtils';
import {SiteConfig} from '../utils/siteConstants';
import PageBackground from '../components/layout/PageBackground';
import AppNavbar from '../components/layout/AppNavbar';
import AppFooter from '../components/layout/AppFooter';
import CustomSelect from "../components/ui/CustomSelect.jsx";
import {siteProjectConfig} from "../config.js";
import {pixelCompassConfig} from "./pixel-compass/PixelCompassConfig.js";
import {pixelPulseConfig} from "./pixel-pulse/PixelPulseConfig.js";
import AppLayout from '../components/layout/AppLayout';

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
    const {content, language} = useLanguage();
    const t = content.feedback || {};
    const wizardStrings = t.wizard || {};
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const projectOptions = [
        {value: "portfolio", label: t.projects?.portfolio || "Portfolio Site"},
        {value: "pixelpulse", label: t.projects?.pixelpulse || "Pixel Pulse"},
        {value: "pixelcompass", label: t.projects?.pixelcompass || "Pixel Compass"}
    ];

    const platformOptions = [
        {value: "android", label: t.platforms?.android || "Android (Phone)"},
        {value: "wearos", label: t.platforms?.wearos || "Wear OS"},
        {value: "web", label: t.platforms?.web || "Web / Site"}
    ];

    const [step, setStep] = useState(1);
    const [project, setProject] = useState(searchParams.get('source') || 'portfolio');
    const [platform, setPlatform] = useState(searchParams.get('platform') || 'web');
    const [type, setType] = useState('general');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [includeInfo, setIncludeInfo] = useState(true);
    const [attachment, setAttachment] = useState(null);
    const [sendStatus, setSendStatus] = useState('idle');
    const [guidanceKey, setGuidanceKey] = useState('default_general');
    const [validationErrors, setValidationErrors] = useState({email: false, message: false});

    const projectContext = useMemo(() => {
        switch (project) {
            case 'pixelpulse':
                return {
                    config: pixelPulseConfig,
                    strings: content.pixel_pulse || {},
                    backPath: '/pixelpulse',
                    isPortfolio: false
                };
            case 'pixelcompass':
                return {
                    config: pixelCompassConfig,
                    strings: content.pixel_compass || {},
                    backPath: '/pixelcompass',
                    isPortfolio: false
                };
            case 'portfolio':
            default:
                return {
                    config: {...siteProjectConfig, materialIcon: 'chat_bubble'},
                    strings: content,
                    backPath: '/',
                    isPortfolio: true
                };
        }
    }, [project, content]);

    const seedColor = getSeedColor();
    const surfaceColor = getSurfaceColor(seedColor);

    usePageMetadata({
        title: "Feedback - Fernando Vaz",
        description: "Send feedback, bug reports, or feature requests.",
        themeColor: surfaceColor,
        favicon: SiteConfig.assets.avatar,
        type: 'website'
    });

    useEffect(() => {
        applyMaterialTheme(seedColor);
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
        const draft = {project, type, message, platform, email};
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
        setValidationErrors({email: !isEmailValid, message: !isMessageValid});
        return isEmailValid && isMessageValid;
    };

    const handleNextStep = () => {
        if (step === 3) {
            if (!validateForm()) return;
        }
        setStep(prev => Math.min(prev + 1, 4));
    };

    const handlePrevStep = () => {
        setStep(prev => Math.max(prev - 1, 1));
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
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setSendStatus('success');
                localStorage.removeItem('feedback_draft');
                setMessage('');
                setAttachment(null);
                setStep(1);
            } else {
                setSendStatus('error');
            }
        } catch (error) {
            setSendStatus('error');
        }
    };

    const handleClear = () => {
        if (window.confirm(t.form?.discard_draft || "Discard Draft?")) {
            setMessage('');
            setEmail('');
            setAttachment(null);
            setStep(1);
            setValidationErrors({email: false, message: false});
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

    const getStepTitle = () => {
        switch (step) {
            case 1:
                return wizardStrings.step_1 || "Step 1 of 4 • Getting Started";
            case 2:
                return wizardStrings.step_2 || "Step 2 of 4 • Quick Choice";
            case 3:
                return wizardStrings.step_3 || "Step 3 of 4 • Almost There (~1 min left)";
            case 4:
                return wizardStrings.step_4 || "Step 4 of 4 • Review & Send";
            default:
                return "";
        }
    };

    const getProjectLabel = (val) => projectOptions.find(p => p.value === val)?.label || val;
    const getPlatformLabel = (val) => platformOptions.find(p => p.value === val)?.label || val;
    const getTypeLabel = (val) => t.types?.[val] || val;

    return (
        <AppLayout
            background={<PageBackground/>}
            navbar={<AppNavbar config={projectContext.config} activePage="feedback" onNavigate={handleNavigation}
                               strings={{back: t.success?.btn_home || "Back"}}/>}
            footer={
                <AppFooter
                    strings={{
                        ...projectContext.strings,
                        footer: projectContext.strings?.footer || content.footer,
                        nav: projectContext.strings?.nav || content.nav || {
                            overview: content.overview_page?.title || 'Overview',
                            changelog: content.changelog?.title || 'Changelog',
                            roadmap: content.roadmap_page?.title || 'Roadmap',
                            privacy: content.privacy_page?.page_title || 'Privacy Policy',
                            terms: content.terms_page?.page_title || 'Terms of Use',
                            help: content.help_page?.page_title || 'Help & FAQ'
                        }
                    }}
                    onNavigate={handleNavigation}
                    activePage="feedback"
                    isPortfolio={projectContext.isPortfolio}
                />
            }
        >
            <main className="app-main-content" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '120px 16px 60px 16px', flex: 1
            }}>
                <AnimatePresence mode="wait">
                    {!isResultState ? (
                        <motion.div
                            key="form-wizard"
                            initial={{opacity: 0, scale: 0.95}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0.95}}
                            className="glass-card form-wizard-card"
                        >
                            <div className="wizard-header">
                                <div className="wizard-title-row">
                                    <div>
                                        <h1 className="wizard-title">{t.title || "Send Feedback"}</h1>
                                        <p className="wizard-subtitle">{t.subtitle || "Help us improve. Bug reports, feature requests, or just say hi."}</p>
                                    </div>
                                    {(message.length > 0 || email.length > 0 || attachment) && (
                                        <button onClick={handleClear} title={t.form?.discard_draft}
                                                className="btn-icon-danger">
                                            <span className="material-symbols-outlined">delete</span>
                                        </button>
                                    )}
                                </div>
                                <div className="progress-container">
                                    <div className="progress-text">{getStepTitle()}</div>
                                    <div className="progress-bar-bg">
                                        <motion.div
                                            className="progress-bar-fill"
                                            initial={{width: 0}}
                                            animate={{width: `${(step / 4) * 100}%`}}
                                            transition={{duration: 0.3}}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="wizard-content-area">
                                <AnimatePresence mode="wait">
                                    {step === 1 && (
                                        <motion.div
                                            key="step1"
                                            initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}}
                                            exit={{opacity: 0, x: -20}}
                                            className="step-content"
                                        >
                                            <div className="input-group">
                                                <CustomSelect label={t.form?.project_label || "Project"} value={project}
                                                              onChange={setProject} options={projectOptions}/>
                                                <CustomSelect label={t.form?.platform_label || "Platform"}
                                                              value={platform}
                                                              onChange={setPlatform} options={platformOptions}/>
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 2 && (
                                        <motion.div
                                            key="step2"
                                            initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}}
                                            exit={{opacity: 0, x: -20}}
                                            className="step-content"
                                        >
                                            <label className="input-label"
                                                   style={{display: 'block', marginBottom: '16px'}}>
                                                {t.form?.type_label || "Topic"}
                                            </label>
                                            <div className="type-grid">
                                                {['general', 'bug', 'feature', 'translation', 'ui'].map(key => (
                                                    <button
                                                        key={key} onClick={() => {
                                                        setType(key);
                                                        handleNextStep();
                                                    }}
                                                        className={`type-btn ${type === key ? 'active' : ''}`}
                                                    >
                                                        {t.types?.[key] || key}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 3 && (
                                        <motion.div
                                            key="step3"
                                            initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}}
                                            exit={{opacity: 0, x: -20}}
                                            className="step-content"
                                        >
                                            <motion.div
                                                layout
                                                className="guidance-box"
                                            >
                                                <span
                                                    className="material-symbols-outlined guidance-icon">lightbulb</span>
                                                <div style={{flex: 1}}>
                                                    <strong
                                                        className="guidance-label">{t.guidance?.label || "Tip"}</strong>
                                                    <AnimatePresence mode="wait">
                                                        <motion.div key={guidanceKey} initial={{opacity: 0}}
                                                                    animate={{opacity: 1}} exit={{opacity: 0}}>
                                                            <span className="guidance-text">
                                                                {t.guidance?.[guidanceKey] || "Please provide as much detail as possible."}
                                                            </span>
                                                        </motion.div>
                                                    </AnimatePresence>
                                                </div>
                                            </motion.div>

                                            <div className="input-wrapper" style={{marginTop: '20px'}}>
                                                <label htmlFor="userEmail" className="input-label"
                                                       style={{color: validationErrors.email ? 'var(--md-sys-color-error)' : 'var(--md-sys-color-on-surface-variant)'}}>
                                                    {t.form?.email_label || "Email Address"}
                                                </label>
                                                <input
                                                    id="userEmail" name="userEmail" type="email" autoComplete="email"
                                                    className="custom-input" value={email}
                                                    onChange={e => {
                                                        setEmail(e.target.value);
                                                        setValidationErrors(prev => ({...prev, email: false}));
                                                    }}
                                                    placeholder={t.form?.email_placeholder || "your@email.com"}
                                                    style={{
                                                        borderColor: validationErrors.email ? 'var(--md-sys-color-error)' : 'var(--md-sys-color-outline-variant)',
                                                        boxShadow: validationErrors.email ? '0 0 0 1px var(--md-sys-color-error)' : 'none'
                                                    }}
                                                />
                                                {validationErrors.email && <span
                                                    className="error-text">{t.form?.email_error || "Please enter a valid email address."}</span>}
                                            </div>

                                            <div className="input-wrapper" style={{marginTop: '16px'}}>
                                                <label htmlFor="userMessage" className="input-label"
                                                       style={{color: validationErrors.message ? 'var(--md-sys-color-error)' : 'var(--md-sys-color-on-surface-variant)'}}>
                                                    {t.form?.description_label || "Message"}
                                                </label>
                                                <div style={{
                                                    position: 'relative',
                                                    flex: 1,
                                                    display: 'flex',
                                                    flexDirection: 'column'
                                                }}>
                                                    <textarea
                                                        id="userMessage" name="userMessage" className="custom-input"
                                                        value={message}
                                                        onChange={e => {
                                                            setMessage(e.target.value);
                                                            setValidationErrors(prev => ({...prev, message: false}));
                                                        }}
                                                        placeholder={t.form?.description_placeholder || "Describe what happened or share your idea..."}
                                                        style={{
                                                            flex: 1,
                                                            minHeight: '120px',
                                                            resize: 'vertical',
                                                            paddingBottom: '36px',
                                                            borderColor: validationErrors.message ? 'var(--md-sys-color-error)' : 'var(--md-sys-color-outline-variant)',
                                                            boxShadow: validationErrors.message ? '0 0 0 1px var(--md-sys-color-error)' : 'none'
                                                        }}
                                                    />
                                                    <span className="char-counter">{message.length} chars</span>
                                                </div>
                                                {validationErrors.message && <span
                                                    className="error-text">{t.form?.description_error || "Message must be at least 15 characters long."}</span>}
                                            </div>

                                            <div style={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: '16px',
                                                marginTop: '16px'
                                            }}>
                                                <label className="checkbox-label" style={{flex: 1, minWidth: '200px'}}>
                                                    <input
                                                        type="checkbox" checked={includeInfo}
                                                        onChange={e => setIncludeInfo(e.target.checked)}
                                                        className="custom-checkbox"
                                                    />
                                                    <span>{t.form?.include_device_info || "Include device info (Browser/OS)"}</span>
                                                </label>

                                                <button onClick={() => fileInputRef.current?.click()}
                                                        className="btn-outline upload-btn"
                                                        style={{flex: 1, minWidth: '200px'}}>
                                                    <span className="material-symbols-outlined">attach_file</span>
                                                    {attachment ? (wizardStrings.change_file || "Change File") : (wizardStrings.attach_image || "Attach Image")}
                                                </button>
                                                <input
                                                    type="file" accept="image/*" ref={fileInputRef}
                                                    style={{display: 'none'}}
                                                    onChange={handleFileChange}
                                                />
                                            </div>

                                            <AnimatePresence>
                                                {attachment && (
                                                    <motion.div initial={{opacity: 0, height: 0}}
                                                                animate={{opacity: 1, height: 'auto'}}
                                                                exit={{opacity: 0, height: 0}}>
                                                        <div className="attachment-preview">
                                                            <span
                                                                className="material-symbols-outlined image-icon">image</span>
                                                            <span className="attachment-name">{attachment.name}</span>
                                                            <button onClick={() => setAttachment(null)}
                                                                    className="btn-icon-clear">
                                                                <span
                                                                    className="material-symbols-outlined">delete</span>
                                                            </button>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    )}

                                    {step === 4 && (
                                        <motion.div
                                            key="step4"
                                            initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}}
                                            exit={{opacity: 0, x: -20}}
                                            className="step-content"
                                        >
                                            <div className="summary-card">
                                                <div
                                                    className="summary-header">{wizardStrings.review_title || "Review Your Feedback"}</div>
                                                <div className="summary-grid">
                                                    <div className="summary-item">
                                                        <div
                                                            className="summary-label">{t.form?.project_label || "Project"}</div>
                                                        <div className="summary-value">{getProjectLabel(project)}</div>
                                                    </div>
                                                    <div className="summary-item">
                                                        <div
                                                            className="summary-label">{t.form?.platform_label || "Platform"}</div>
                                                        <div
                                                            className="summary-value">{getPlatformLabel(platform)}</div>
                                                    </div>
                                                    <div className="summary-item">
                                                        <div
                                                            className="summary-label">{t.form?.type_label || "Topic"}</div>
                                                        <div className="summary-value">{getTypeLabel(type)}</div>
                                                    </div>
                                                    <div className="summary-item">
                                                        <div
                                                            className="summary-label">{t.form?.email_label || "Email"}</div>
                                                        <div className="summary-value"
                                                             style={{wordBreak: 'break-all'}}>{email}</div>
                                                    </div>
                                                </div>

                                                <div className="summary-item" style={{marginTop: '16px'}}>
                                                    <div
                                                        className="summary-label">{t.form?.description_label || "Message"}</div>
                                                    <div className="summary-value summary-message">{message}</div>
                                                </div>

                                                <div className="summary-grid" style={{marginTop: '16px'}}>
                                                    <div className="summary-item">
                                                        <div
                                                            className="summary-label">{wizardStrings.device_info || "Device Info"}</div>
                                                        <div
                                                            className="summary-value">{includeInfo ? (wizardStrings.info_included || "Included") : (wizardStrings.info_not_included || "Not Included")}</div>
                                                    </div>
                                                    <div className="summary-item">
                                                        <div
                                                            className="summary-label">{wizardStrings.attachment || "Attachment"}</div>
                                                        <div className="summary-value"
                                                             style={{wordBreak: 'break-all'}}>{attachment ? attachment.name : (wizardStrings.none || "None")}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="wizard-footer">
                                <button
                                    onClick={handlePrevStep}
                                    className="btn-outline wizard-nav-btn"
                                    style={{visibility: step > 1 ? 'visible' : 'hidden'}}
                                >
                                    {wizardStrings.back || "Back"}
                                </button>

                                {step < 4 ? (
                                    <button onClick={handleNextStep} className="btn-glow wizard-nav-btn">
                                        {wizardStrings.next || "Next"} <span
                                        className="material-symbols-outlined">arrow_forward</span>
                                    </button>
                                ) : (
                                    <button onClick={handleSend} disabled={sendStatus === 'sending'}
                                            className="btn-glow wizard-nav-btn">
                                        {sendStatus === 'sending' ? (
                                            <span className="material-symbols-outlined spin">autorenew</span>
                                        ) : (
                                            <><span
                                                className="material-symbols-outlined">send</span>{t.form?.send_button || "Send Feedback"}</>
                                        )}
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{scale: 0.9, opacity: 0}} animate={{scale: 1, opacity: 1}}
                            className="glass-card result-card"
                            style={{border: sendStatus === 'error' ? '1px solid var(--md-sys-color-error)' : '1px solid var(--md-sys-color-primary-container)'}}
                        >
                            <div className="result-icon-container" style={{
                                background: sendStatus === 'error' ? 'var(--md-sys-color-error-container)' : 'var(--md-sys-color-primary-container)',
                                color: sendStatus === 'error' ? 'var(--md-sys-color-on-error-container)' : 'var(--md-sys-color-on-primary-container)',
                            }}>
                                <span className="material-symbols-outlined result-icon">
                                    {sendStatus === 'error' ? 'warning' : 'mark_email_read'}
                                </span>
                            </div>

                            <h2 className="result-title">
                                {sendStatus === 'error' ? (t.success?.error_title || "Delivery Failed") : (t.success?.title || "Message Sent!")}
                            </h2>
                            <p className="result-message">
                                {sendStatus === 'error' ? (t.success?.error_message || "We encountered a network error while trying to send your message. Please try again.") : ((t.success?.message && t.success.message.replace('{email}', email)) || `Your message was successfully sent to support@fertwbr.com. A confirmation copy has been sent to ${email}.`)}
                            </p>

                            <div className="result-actions">
                                <button onClick={() => sendStatus === 'error' ? handleSend() : setSendStatus('idle')}
                                        className="btn-glow result-btn">
                                    <span
                                        className="material-symbols-outlined">{sendStatus === 'error' ? 'refresh' : 'add'}</span>
                                    {sendStatus === 'error' ? (t.success?.btn_retry || "Try Again") : "Send another"}
                                </button>
                                {sendStatus === 'error' && (
                                    <button onClick={() => setSendStatus('idle')} className="btn-outline result-btn">
                                        <span
                                            className="material-symbols-outlined">edit</span> {t.success?.btn_edit || "Edit Message"}
                                    </button>
                                )}
                                <button onClick={() => navigate('/')} className="btn-outline result-btn"
                                        style={{border: 'none'}}>
                                    {t.success?.btn_home || "Return Home"}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <style>{`
                .mobile-toggle-wrapper { display: none !important; }
                
                .form-wizard-card {
                    width: 100%;
                    max-width: 700px;
                    display: flex;
                    flex-direction: column;
                    border-radius: 32px;
                    border: var(--glass-border);
                }
                
                .wizard-header {
                    padding: 32px 32px 24px 32px;
                    border-bottom: 1px solid rgba(var(--md-sys-color-on-surface-rgb), 0.08);
                }
                
                .wizard-title-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 24px;
                }
                
                .wizard-title {
                    font-size: clamp(1.6rem, 4vw, 2rem);
                    margin: 0;
                    font-weight: 700;
                }
                
                .wizard-subtitle {
                    margin: 8px 0 0 0;
                    color: var(--md-sys-color-on-surface-variant);
                    font-size: 0.95rem;
                }
                
                .btn-icon-danger {
                    background: rgba(var(--md-sys-color-error-rgb), 0.1);
                    border: none;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    color: var(--md-sys-color-error);
                    flex-shrink: 0;
                }
                
                .progress-container {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                
                .progress-text {
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: var(--md-sys-color-primary);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                
                .progress-bar-bg {
                    width: 100%;
                    height: 6px;
                    background: rgba(var(--md-sys-color-on-surface-rgb), 0.1);
                    border-radius: 3px;
                    overflow: hidden;
                }
                
                .progress-bar-fill {
                    height: 100%;
                    background: var(--md-sys-color-primary);
                    border-radius: 3px;
                }
                
                .wizard-content-area {
                    padding: 32px;
                    display: flex;
                    flex-direction: column;
                }
                
                .step-content {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                }
                
                .wizard-footer {
                    padding: 24px 32px;
                    border-top: 1px solid rgba(var(--md-sys-color-on-surface-rgb), 0.08);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: rgba(var(--md-sys-color-surface-container-rgb), 0.3);
                    flex-wrap: wrap; /* Permite que os botões quebrem linha se necessário */
                    gap: 16px;
                }
                
                .wizard-nav-btn {
                    min-height: 56px;
                    padding: 0 32px;
                    font-size: 1rem;
                    flex: 1; /* Faz os botões crescerem igualmente */
                    min-width: 140px; /* Garante que não fiquem minúsculos antes de quebrar */
                    justify-content: center;
                }
                
                .input-group {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }
                
                .type-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
                    gap: 12px;
                }
                
                .type-btn {
                    padding: 16px;
                    border-radius: 16px;
                    background: rgba(var(--md-sys-color-on-surface-rgb), 0.05);
                    color: var(--md-sys-color-on-surface-variant);
                    border: 1px solid var(--md-sys-color-outline-variant);
                    cursor: pointer;
                    font-size: 0.95rem;
                    font-weight: 500;
                    transition: all 0.2s;
                    text-align: center;
                }
                
                .type-btn:hover {
                    background: rgba(var(--md-sys-color-on-surface-rgb), 0.08);
                }
                
                .type-btn.active {
                    background: var(--md-sys-color-secondary-container);
                    color: var(--md-sys-color-on-secondary-container);
                    border: 1px solid var(--md-sys-color-secondary);
                }
                
                .guidance-box {
                    background: var(--md-sys-color-tertiary-container);
                    color: var(--md-sys-color-on-tertiary-container);
                    padding: 20px;
                    border-radius: 20px;
                    display: flex;
                    gap: 16px;
                    align-items: flex-start;
                    border: 1px solid rgba(var(--md-sys-color-on-surface-rgb), 0.1);
                }
                
                .guidance-icon {
                    font-size: 24px;
                }
                
                .guidance-label {
                    display: block;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    opacity: 0.8;
                    margin-bottom: 6px;
                    letter-spacing: 1px;
                }
                
                .guidance-text {
                    font-size: 1rem;
                    line-height: 1.5;
                    display: block;
                    font-weight: 500;
                }
                
                .input-wrapper { display: flex; flex-direction: column; gap: 8px; flex: 1; }
                .input-label { font-size: 0.9rem; font-weight: 600; margin-left: 4px; transition: color 0.3s; }
                
                .custom-input {
                    width: 100%; background: rgba(var(--md-sys-color-surface-container-high-rgb), 0.5);
                    border: 1px solid; color: var(--md-sys-color-on-surface);
                    padding: 16px; border-radius: 16px; font-size: 1rem; font-family: inherit;
                    appearance: none; -webkit-appearance: none; outline: none; transition: border-color 0.3s, box-shadow 0.3s;
                }
                
                .custom-input:focus { 
                    border-color: var(--md-sys-color-primary) !important; 
                    box-shadow: 0 0 0 4px rgba(var(--md-sys-color-primary-rgb), 0.15) !important; 
                }
                
                .char-counter {
                    position: absolute; bottom: 12px; right: 12px; font-size: 0.75rem; 
                    font-weight: 600; color: var(--md-sys-color-on-surface-variant); 
                    background: var(--md-sys-color-surface-container); padding: 4px 8px; 
                    border-radius: 6px; pointer-events: none; opacity: 0.8;
                }
                
                .error-text {
                    color: var(--md-sys-color-error);
                    font-size: 0.8rem;
                    margin-top: 4px;
                    margin-left: 4px;
                }
                
                .checkbox-label {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    cursor: pointer;
                    padding: 16px;
                    background: rgba(var(--md-sys-color-surface-container-high-rgb), 0.5);
                    border-radius: 16px;
                    border: 1px solid var(--md-sys-color-outline-variant);
                    font-size: 0.95rem;
                    font-weight: 500;
                }
                
                .custom-checkbox {
                    width: 22px; 
                    height: 22px; 
                    accent-color: var(--md-sys-color-primary);
                }
                
                .upload-btn {
                    padding: 16px;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                }
                
                .attachment-preview {
                    display: flex;
                    align-items: center;
                    background: rgba(var(--md-sys-color-on-surface-rgb), 0.05);
                    padding: 12px 16px;
                    border-radius: 16px;
                    gap: 12px;
                    border: 1px solid rgba(var(--md-sys-color-on-surface-rgb), 0.1);
                    margin-top: 16px;
                }
                
                .image-icon { color: var(--md-sys-color-primary); }
                .attachment-name { flex: 1; font-size: 0.9rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                .btn-icon-clear { background: transparent; border: none; color: var(--md-sys-color-on-surface-variant); cursor: pointer; display: flex; }
                
                .summary-card {
                    background: rgba(var(--md-sys-color-surface-container-highest-rgb), 0.3);
                    border-radius: 24px;
                    padding: 24px;
                    border: 1px solid var(--md-sys-color-outline-variant);
                }
                
                .summary-header {
                    font-size: 1.2rem;
                    font-weight: 700;
                    margin-bottom: 20px;
                    color: var(--md-sys-color-primary);
                }
                
                .summary-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 16px;
                }
                
                .summary-item {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
                
                .summary-label {
                    font-size: 0.8rem;
                    color: var(--md-sys-color-on-surface-variant);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    font-weight: 600;
                }
                
                .summary-value {
                    font-size: 1rem;
                    color: var(--md-sys-color-on-surface);
                    font-weight: 500;
                }
                
                .summary-message {
                    background: rgba(var(--md-sys-color-on-surface-rgb), 0.05);
                    padding: 16px;
                    border-radius: 12px;
                    white-space: pre-wrap;
                    word-break: break-word;
                }
                
                .result-card {
                    max-width: 500px;
                    width: 100%;
                    padding: 48px 32px;
                    border-radius: 32px;
                    text-align: center;
                }
                
                .result-icon-container {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 24px auto;
                }
                
                .result-icon { font-size: 40px; }
                .result-title { font-size: 2rem; margin-bottom: 16px; }
                .result-message { line-height: 1.6; color: var(--md-sys-color-on-surface-variant); margin-bottom: 48px; font-size: 1.1rem; }
                .result-actions { display: flex; flex-direction: column; gap: 16px; }
                .result-btn { justify-content: center; width: 100%; }
                
                .spin { animation: spin 1s linear infinite; }
                @keyframes spin { 100% { transform: rotate(360deg); } }
                
                @media (max-width: 600px) {
                    .wizard-header { padding: 24px 20px 16px 20px; }
                    .wizard-content-area { padding: 20px; }
                    .wizard-footer { 
                        padding: 20px; 
                        flex-direction: column-reverse; /* Coloca o "Próximo" em cima do "Voltar" no mobile */
                    }
                    .wizard-nav-btn {
                        width: 100%;
                        flex: none;
                    }
                    .type-grid { grid-template-columns: 1fr; }
                    .checkbox-label { width: 100%; }
                    .upload-btn { width: 100%; }
                }
            `}</style>
        </AppLayout>
    );
}