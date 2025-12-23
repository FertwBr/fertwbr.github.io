import React, {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import {loadPageContent} from '../../utils/contentLoader';
import {parseChangelog} from '../../utils/changelogParser';
import {useLanguage} from '../../context/LanguageContext';

/**
 * Determines the appropriate Material Symbol icon based on the feature description text.
 *
 * @param {string} text - The title or description of the feature.
 * @returns {string} The name of the Material Symbol icon.
 */
const getIconForText = (text) => {
    const lower = text.toLowerCase();

    // Specific features
    if (lower.includes('widget')) return 'widgets';
    if (lower.includes('clock') || lower.includes('time')) return 'schedule';
    if (lower.includes('weather') || lower.includes('forecast') || lower.includes('rain')) return 'cloud';
    if (lower.includes('compass') || lower.includes('north') || lower.includes('magnet')) return 'explore';
    if (lower.includes('gps') || lower.includes('location') || lower.includes('coordinate')) return 'pin_drop';
    if (lower.includes('level') || lower.includes('calibration') || lower.includes('sensor')) return 'sensors';
    if (lower.includes('watch') || lower.includes('wear')) return 'watch';

    // Design & UI
    if (lower.includes('theme') || lower.includes('color') || lower.includes('amoled') || lower.includes('visual')) return 'palette';
    if (lower.includes('layout') || lower.includes('design') || lower.includes('ui') || lower.includes('polish')) return 'brush';
    if (lower.includes('toolbar') || lower.includes('edit')) return 'edit_attributes';

    // Actions & Features
    if (lower.includes('share') || lower.includes('export') || lower.includes('image')) return 'share';
    if (lower.includes('feedback') || lower.includes('report')) return 'chat_bubble';
    if (lower.includes('language') || lower.includes('translation') || lower.includes('localization')) return 'translate';

    // Plus/Premium
    if (lower.includes('subscription') || lower.includes('plus') || lower.includes('plan')) return 'diamond';

    // Data & Stats
    if (lower.includes('chart') || lower.includes('graph')) return 'monitoring';
    if (lower.includes('budget') || lower.includes('shield')) return 'shield';

    // System
    if (lower.includes('notification') || lower.includes('alert')) return 'notifications';
    if (lower.includes('performance') || lower.includes('speed') || lower.includes('stability')) return 'speed';
    if (lower.includes('fix') || lower.includes('bug') || lower.includes('error')) return 'build';

    return 'star';
};

/**
 * Component that displays the latest features from the changelog.
 *
 * Attempts to load the localized changelog first. If that fails (e.g., file doesn't exist),
 * it falls back to the English version ('en'). If both fail, it renders nothing
 * (or falls back to props provided strings via the parent component logic).
 *
 * @param {Object} props - Component props.
 * @param {Object} props.appConfig - Configuration object for the app (used to locate Markdown files).
 * @param {Object} props.strings - Fallback strings if no changelog is found or for labels.
 * @param {Function} props.onNavigate - Callback to handle navigation to the full changelog page.
 */
export default function HomeNewFeatures({appConfig, strings, onNavigate}) {
    const {language} = useLanguage();
    const [latestUpdate, setLatestUpdate] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchChangelog = async () => {
            try {
                let markdown = await loadPageContent('changelog', appConfig, language);

                if (!markdown && language !== 'en') {
                    try {
                        markdown = await loadPageContent('changelog', appConfig, 'en');
                    } catch (err) {
                        console.warn("English fallback also failed", err);
                    }
                }

                if (!markdown || !isMounted) return;

                const versions = parseChangelog(markdown);

                if (versions.length > 0) {
                    const latest = versions[0];
                    const lines = latest.content.split('\n');
                    const features = [];

                    for (const line of lines) {
                        const match = line.trim().match(/^\*\s*\*\*(.*?)\*\*\s*(.*)$/);

                        if (match) {
                            let title = match[1].replace(':', '').trim();
                            let desc = match[2].trim();

                            if (title.toLowerCase().startsWith('new:')) title = title.substring(4).trim();
                            if (title.toLowerCase().startsWith('fix:')) title = title.substring(4).trim();
                            if (title.toLowerCase().startsWith('improvement:')) title = title.substring(12).trim();

                            features.push({
                                title,
                                desc,
                                icon: getIconForText(title + ' ' + desc)
                            });
                        }
                        if (features.length >= 4) break;
                    }

                    setLatestUpdate({
                        version: latest.version.replace('Version ', 'v'),
                        features
                    });
                }
            } catch (e) {
                console.error("Error fetching features:", e);
            }
        };

        fetchChangelog().catch(err => {
            console.error("Failed to execute fetchChangelog", err);
        });

        return () => {
            isMounted = false;
        };
    }, [appConfig, language]);

    const displayFeatures = latestUpdate ? latestUpdate.features : (strings.items || []);
    const versionLabel = latestUpdate ? `New in ${latestUpdate.version}` : strings.label;

    const fadeInUp = {
        hidden: {opacity: 0, y: 30},
        show: {opacity: 1, y: 0, transition: {type: "spring", duration: 0.8}}
    };

    return (
        <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{once: true, margin: "-50px"}}
            variants={{
                hidden: {opacity: 0},
                show: {opacity: 1, transition: {staggerChildren: 0.15}}
            }}
            style={{marginBottom: '120px'}}
        >
            <motion.div variants={fadeInUp} style={{textAlign: 'center', marginBottom: '48px'}}>
         <span style={{
             color: 'var(--md-sys-color-primary)',
             fontWeight: 700,
             letterSpacing: '1.5px',
             textTransform: 'uppercase'
         }}>
            {versionLabel}
         </span>
                <h2 style={{fontSize: 'clamp(2rem, 6vw, 3rem)', marginTop: '12px'}}>{strings.title}</h2>
            </motion.div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: '20px',
                marginBottom: '40px'
            }}>
                {displayFeatures.map((item, index) => (
                    <motion.div
                        key={index}
                        variants={fadeInUp}
                        className="glass-card"
                        onClick={() => onNavigate('changelog')}
                        style={{
                            padding: '32px',
                            borderRadius: '28px',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start'
                        }}
                        whileHover={{scale: 1.02, backgroundColor: 'rgba(255,255,255,0.03)'}}
                        whileTap={{scale: 0.98}}
                    >
             <span className="material-symbols-outlined"
                   style={{fontSize: '40px', color: 'var(--md-sys-color-primary)', marginBottom: '20px'}}>
               {item.icon}
             </span>
                        <h3 style={{fontSize: '1.3rem', marginBottom: '12px', lineHeight: 1.3}}>{item.title}</h3>

                        <div style={{
                            color: 'var(--md-sys-color-on-surface-variant)',
                            fontSize: '1rem',
                            lineHeight: 1.6
                        }}>
                            <ReactMarkdown components={{p: 'span'}}>{item.desc}</ReactMarkdown>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div variants={fadeInUp} style={{textAlign: 'center'}}>
                <button
                    onClick={() => onNavigate('changelog')}
                    className="btn-outline"
                    style={{padding: '12px 32px'}}
                >
                    {strings.view_history} <span className="material-symbols-outlined">history</span>
                </button>
            </motion.div>
        </motion.section>
    );
}