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
import {geminiExpressiveConfig} from "./gemini-expressive/GeminiExpressiveConfig.js";
import AppLayout from '../components/layout/AppLayout';
import '../styles/feedback.css';

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
        {value: "pixelcompass", label: t.projects?.pixelcompass || "Pixel Compass"},
        {value: "geminiexpressive", label: t.projects?.geminiexpressive || "Gemini Expressive"}
    ];

    const platformOptions = [
        {value: "android", label: t.platforms?.android || "Android (Phone)"},
        {value: "wearos", label: t.platforms?.wearos || "Wear OS"},
        {value: "web", label: t.platforms?.web || "Web / Site"},
        {value: "extension", label: t.platforms?.extension || "Browser Extension"}
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
            case 'geminiexpressive':
                return {
                    config: geminiExpressiveConfig,
                    strings: content.gemini_expressive || {},
                    backPath: '/geminiexpressive',
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
        const sourceFromUrl = searchParams.get('source');

        if (sourceFromUrl) {
            setProject(sourceFromUrl);
        }

        if (savedDraft) {
            try {
                const draft = JSON.parse(savedDraft);
                if (!sourceFromUrl && draft.project) {
                    setProject(draft.project);
                }
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
                    config={projectContext.config}
                />
            }
        >
            <main className="app-main-content feedback-main-wrapper">
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
                                            <label className="input-label type-label-spacing">
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
                                                <div className="guidance-content">
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

                                            <div className="input-wrapper input-wrapper-mt-20">
                                                <label htmlFor="userEmail"
                                                       className={`input-label ${validationErrors.email ? 'is-invalid' : ''}`}>
                                                    {t.form?.email_label || "Email Address"}
                                                </label>
                                                <input
                                                    id="userEmail" name="userEmail" type="email" autoComplete="email"
                                                    className={`custom-input ${validationErrors.email ? 'is-invalid' : ''}`}
                                                    value={email}
                                                    onChange={e => {
                                                        setEmail(e.target.value);
                                                        setValidationErrors(prev => ({...prev, email: false}));
                                                    }}
                                                    placeholder={t.form?.email_placeholder || "your@email.com"}
                                                />
                                                {validationErrors.email && <span
                                                    className="error-text">{t.form?.email_error || "Please enter a valid email address."}</span>}
                                            </div>

                                            <div className="input-wrapper input-wrapper-mt-16">
                                                <label htmlFor="userMessage"
                                                       className={`input-label ${validationErrors.message ? 'is-invalid' : ''}`}>
                                                    {t.form?.description_label || "Message"}
                                                </label>
                                                <div className="textarea-wrapper">
                                                    <textarea
                                                        id="userMessage" name="userMessage"
                                                        className={`custom-input feedback-textarea ${validationErrors.message ? 'is-invalid' : ''}`}
                                                        value={message}
                                                        onChange={e => {
                                                            setMessage(e.target.value);
                                                            setValidationErrors(prev => ({...prev, message: false}));
                                                        }}
                                                        placeholder={t.form?.description_placeholder || "Describe what happened or share your idea..."}
                                                    />
                                                    <span className="char-counter">{message.length} chars</span>
                                                </div>
                                                {validationErrors.message && <span
                                                    className="error-text">{t.form?.description_error || "Message must be at least 15 characters long."}</span>}
                                            </div>

                                            <div className="feedback-attachments-row">
                                                <label className="checkbox-label feedback-flex-item">
                                                    <input
                                                        type="checkbox" checked={includeInfo}
                                                        onChange={e => setIncludeInfo(e.target.checked)}
                                                        className="custom-checkbox"
                                                    />
                                                    <span>{t.form?.include_device_info || "Include device info (Browser/OS)"}</span>
                                                </label>

                                                <button onClick={() => fileInputRef.current?.click()}
                                                        className="btn-outline upload-btn feedback-flex-item">
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
                                                        <div className="summary-value word-break-all">{email}</div>
                                                    </div>
                                                </div>

                                                <div className="summary-item input-wrapper-mt-16">
                                                    <div
                                                        className="summary-label">{t.form?.description_label || "Message"}</div>
                                                    <div className="summary-value summary-message">{message}</div>
                                                </div>

                                                <div className="summary-grid input-wrapper-mt-16">
                                                    <div className="summary-item">
                                                        <div
                                                            className="summary-label">{wizardStrings.device_info || "Device Info"}</div>
                                                        <div
                                                            className="summary-value">{includeInfo ? (wizardStrings.info_included || "Included") : (wizardStrings.info_not_included || "Not Included")}</div>
                                                    </div>
                                                    <div className="summary-item">
                                                        <div
                                                            className="summary-label">{wizardStrings.attachment || "Attachment"}</div>
                                                        <div
                                                            className="summary-value word-break-all">{attachment ? attachment.name : (wizardStrings.none || "None")}</div>
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
                            className={`glass-card result-card ${sendStatus === 'error' ? 'is-error' : 'is-success'}`}
                        >
                            <div
                                className={`result-icon-container ${sendStatus === 'error' ? 'is-error' : 'is-success'}`}>
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
                                <button onClick={() => navigate('/')} className="btn-outline result-btn btn-no-border">
                                    {t.success?.btn_home || "Return Home"}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </AppLayout>
    );
}