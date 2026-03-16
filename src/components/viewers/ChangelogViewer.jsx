import React, {useState, useEffect, useMemo} from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import {motion, AnimatePresence} from 'framer-motion';
import {useParams, useNavigate} from 'react-router-dom';
import {parseChangelog} from '../../utils/changelogParser';
import {loadPageContent} from '../../utils/contentLoader';
import {useLanguage} from '../../context/LanguageContext';
import BackToTop from '../common/BackToTop';
import PageTableOfContents from '../common/PageTableOfContents';
import AutoTranslateBadge from '../common/AutoTranslateBadge';

import {
    LatestReleaseCard,
    BetaProgramCard,
    WearOSCard,
    PlusPromoCard
} from './changelog/SidebarCards';

/**
 * Configuration object defining styles for various changelog tags.
 * @constant
 * @type {Object.<string, {bg: string, color: string, border: string, highlight: string}>}
 */
const TAG_STYLE_CONFIG = {
    stable: {
        bg: 'var(--md-sys-color-primary)',
        color: 'var(--md-sys-color-on-primary)',
        border: 'transparent',
        highlight: 'var(--md-sys-color-primary)'
    },
    beta: {bg: 'rgba(255, 183, 77, 0.15)', color: '#FFB74D', border: '#FFB74D', highlight: '#FFB74D'},
    alpha: {bg: 'rgba(239, 83, 80, 0.15)', color: '#EF5350', border: '#EF5350', highlight: '#EF5350'},
    rc: {bg: 'rgba(171, 71, 188, 0.15)', color: '#AB47BC', border: '#AB47BC', highlight: '#AB47BC'},
    'pre-release': {bg: 'rgba(79, 195, 247, 0.15)', color: '#4FC3F7', border: '#4FC3F7', highlight: '#4FC3F7'},
    default: {
        bg: 'var(--md-sys-color-primary-container)',
        color: 'var(--md-sys-color-primary)',
        border: 'var(--md-sys-color-primary)',
        highlight: 'var(--md-sys-color-primary)'
    }
};

/**
 * Retrieves the associated style object for a given tag type.
 * @param {string} tagKey - The key or name of the tag (e.g., 'beta', 'stable').
 * @returns {{bg: string, color: string, border: string, highlight: string}} The computed style configuration.
 */
const getTagStyle = (tagKey) => {
    const key = tagKey?.toLowerCase() || 'default';
    if (TAG_STYLE_CONFIG[key]) return TAG_STYLE_CONFIG[key];
    if (key.includes('beta')) return TAG_STYLE_CONFIG.beta;
    if (key.includes('alpha')) return TAG_STYLE_CONFIG.alpha;
    if (key.includes('rc')) return TAG_STYLE_CONFIG.rc;
    if (key.includes('pre-release')) return TAG_STYLE_CONFIG['pre-release'];
    return TAG_STYLE_CONFIG.default;
};

/**
 * Renders a stylized badge indicating the version type or platform tag.
 * @param {Object} props - The component props.
 * @param {string} props.type - The release type used to determine the badge style.
 * @param {string} [props.text] - The display text. Falls back to the 'type' if not provided.
 * @returns {JSX.Element} The rendered version badge.
 */
const VersionBadge = ({type, text}) => {
    const style = getTagStyle(type);
    return (
        <span style={{
            fontSize: '0.65rem', fontWeight: 700, padding: '4px 8px', borderRadius: '6px',
            background: style.bg, color: style.color, border: `1px solid ${style.border}`,
            textTransform: 'uppercase', letterSpacing: '0.5px', display: 'inline-flex',
            alignItems: 'center', whiteSpace: 'nowrap'
        }}>
            {text || type}
        </span>
    );
};

/**
 * Renders an expandable card displaying the details of a single changelog release.
 * @param {Object} props - The component props.
 * @param {Object} props.v - The version data object containing id, type, tags, date, and content.
 * @param {number} props.index - The current index of this item in the rendered list.
 * @param {boolean} props.isActive - Whether this specific card is currently active/highlighted.
 * @param {Object} props.strings - Localized string definitions.
 * @param {Function} props.onOpenSingle - Callback triggered when the full-screen action is clicked.
 * @param {Function} props.onShare - Callback triggered to initiate the share flow.
 * @returns {JSX.Element} The changelog item card component.
 */
const ChangelogItem = ({v, index, isActive, strings, onOpenSingle, onShare}) => {
    const [isOpen, setIsOpen] = useState(index === 0);
    const badgeStyle = getTagStyle(v.type);
    const timelineColor = badgeStyle.highlight;

    const platformTags = ['Wear OS', 'Android XR', 'Phone', 'Tablet', 'Web', 'Website'];
    const excludeTags = [...platformTags, 'Beta', 'Alpha', 'RC', 'Pre-release'];

    return (
        <motion.div
            id={`ver-${v.id}`}
            layoutId={`changelog-card-${v.id}`}
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: index * 0.05}}
            style={{marginBottom: '40px', position: 'relative'}}
        >
            <div style={{
                position: 'absolute', left: '-46px', top: '24px',
                width: '14px', height: '14px', borderRadius: '50%',
                background: v.type === 'stable' ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-surface)',
                border: `3px solid ${timelineColor}`,
                zIndex: 2, boxShadow: `0 0 0 4px var(--md-sys-color-surface)`,
                transition: 'all 0.3s ease'
            }}/>

            <div className="glass-card" style={{
                borderRadius: '32px',
                border: isActive ? `1px solid var(--md-sys-color-primary)` : '1px solid var(--md-sys-color-outline-variant)',
                overflow: 'hidden', transition: 'border-color 0.3s',
                backgroundColor: isActive ? 'rgba(var(--md-sys-color-primary-rgb), 0.05)' : 'var(--md-sys-color-surface-container)'
            }}>
                <div onClick={() => setIsOpen(!isOpen)} className={`changelog-item-header ${isOpen ? 'open' : ''}`}>
                    <div style={{flex: 1, minWidth: 0}}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            marginBottom: '8px',
                            flexWrap: 'wrap'
                        }}>
                            <h2 style={{
                                fontSize: '1.5rem',
                                fontWeight: 800,
                                margin: 0,
                                letterSpacing: '-0.5px',
                                wordBreak: 'break-word',
                                color: isActive ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-on-surface)'
                            }}>
                                {v.version.replace('Version ', '')}
                            </h2>
                            <div style={{display: 'flex', gap: '6px', flexWrap: 'wrap'}}>
                                <VersionBadge type={v.type}/>
                                {v.tags.filter(tag => platformTags.includes(tag)).map(tag => (
                                    <VersionBadge key={tag} type="stable" text={tag}/>
                                ))}
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: 'var(--md-sys-color-on-surface-variant)',
                            fontSize: '0.9rem'
                        }}>
                            <span className="material-symbols-outlined" style={{fontSize: '16px'}}>calendar_today</span>
                            {strings.released || "Released"} {v.date}
                        </div>
                    </div>
                    <div className="changelog-item-actions">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (onShare) onShare(v);
                            }}
                            className="icon-action-btn" title={strings.share_tooltip || "Share this update"}
                        >
                            <span className="material-symbols-outlined" style={{fontSize: '20px'}}>share</span>
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (onOpenSingle) onOpenSingle();
                            }}
                            className="icon-action-btn primary"
                            title={strings.open_full_screen || "Open in full screen"}
                        >
                            <span className="material-symbols-outlined" style={{fontSize: '20px'}}>open_in_new</span>
                        </button>
                        <div className="icon-expand" style={{
                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                        }}>
                            <span className="material-symbols-outlined">expand_more</span>
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div initial={{height: 0, opacity: 0}} animate={{height: 'auto', opacity: 1}}
                                    exit={{height: 0, opacity: 0}} style={{overflow: 'hidden'}}>
                            <div style={{padding: '0 24px 24px 24px'}}>
                                <div style={{
                                    width: '100%',
                                    height: '1px',
                                    background: 'var(--md-sys-color-outline-variant)',
                                    opacity: 0.3,
                                    marginBottom: '24px'
                                }}></div>
                                <div style={{display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap'}}>
                                    {v.tags.filter(t => !excludeTags.includes(t)).map(tag => (
                                        <span key={tag} className="content-tag">{tag}</span>
                                    ))}
                                </div>
                                <div className="markdown-body">
                                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{v.content}</ReactMarkdown>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

/**
 * Full Screen Article Component displaying a detailed view of a specific changelog.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.v - The active version data object.
 * @param {Object|null} props.prevVersion - The previous chronological version data object.
 * @param {Object|null} props.nextVersion - The next chronological version data object.
 * @param {Object} props.strings - Localized string definitions.
 * @param {Function} props.onOpenSingle - Callback for internal routing to sequential updates.
 * @returns {JSX.Element} The Full Screen Article component.
 */
const FullScreenArticle = ({v, prevVersion, nextVersion, strings, onOpenSingle}) => {
    const headers = useMemo(() => {
        const regex = /^####\s+(.+)$/gm;
        const matches = [];
        let match;
        while ((match = regex.exec(v.content)) !== null) {
            matches.push({title: match[1], id: match[1].toLowerCase().replace(/[^a-z0-9]+/g, '-')});
        }
        return matches;
    }, [v.content]);

    /**
     * Smooth scrolls the window to a specified section element based on its ID.
     * @param {string} id - The DOM element ID to scroll to.
     */
    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            const offset = 120;
            const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({top: elementPosition - offset, behavior: "smooth"});
        }
    };

    const excludeTags = ['Wear OS', 'Android XR', 'Phone', 'Tablet', 'Web', 'Website', 'Beta', 'Alpha', 'RC', 'Pre-release'];

    /**
     * Custom components mapping for ReactMarkdown to inject IDs into specific heading elements.
     * @type {Object}
     */
    const MarkdownComponents = {
        h4: ({node, ...props}) => {
            const childrenArray = React.Children.toArray(props.children);
            const text = childrenArray.join('');
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            return <h4 id={id} {...props} />;
        }
    };

    return (
        <motion.div
            layoutId={`changelog-card-${v.id}`}
            initial={{opacity: 0, scale: 0.98}}
            animate={{opacity: 1, scale: 1}}
            transition={{type: "spring", stiffness: 200, damping: 20}}
            className="full-screen-article"
        >
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--md-sys-color-on-surface-variant)',
                fontSize: '1rem',
                marginBottom: '24px'
            }}>
                <span className="material-symbols-outlined" style={{fontSize: '18px'}}>calendar_today</span>
                {strings.released || "Released"} {v.date}
            </div>

            <div style={{display: 'flex', gap: '8px', marginBottom: '40px', flexWrap: 'wrap'}}>
                {v.tags.filter(t => !excludeTags.includes(t)).map(tag => (
                    <span key={tag} className="content-tag"
                          style={{fontSize: '0.85rem', padding: '6px 14px'}}>{tag}</span>
                ))}
            </div>

            <div className="article-layout">
                {headers.length > 0 && (
                    <div className="mobile-article-toc">
                        <div style={{
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            color: 'var(--md-sys-color-on-surface-variant)',
                            marginBottom: '12px',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            {strings.in_this_update || "In this update"}
                        </div>
                        <div className="horizontal-chips">
                            {headers.map(h => (
                                <button key={h.id} onClick={() => scrollToSection(h.id)} className="toc-chip">
                                    {h.title}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="markdown-body article-typography">
                    <ReactMarkdown rehypePlugins={[rehypeRaw]} components={MarkdownComponents}>
                        {v.content}
                    </ReactMarkdown>
                </div>

                {headers.length > 0 && (
                    <div className="desktop-article-toc">
                        <div style={{
                            position: 'sticky',
                            top: '140px',
                            background: 'rgba(var(--md-sys-color-surface-container-rgb), 0.3)',
                            padding: '24px',
                            borderRadius: '32px',
                            border: '1px solid var(--md-sys-color-outline-variant)'
                        }}>
                            <h3 style={{
                                margin: '0 0 16px 0',
                                fontSize: '1rem',
                                color: 'var(--md-sys-color-on-surface)'
                            }}>
                                {strings.table_of_contents || "Table of Contents"}
                            </h3>
                            <ul style={{
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px'
                            }}>
                                {headers.map(h => (
                                    <li key={h.id}>
                                        <button onClick={() => scrollToSection(h.id)} style={{
                                            background: 'none',
                                            border: 'none',
                                            textAlign: 'left',
                                            cursor: 'pointer',
                                            color: 'var(--md-sys-color-on-surface-variant)',
                                            fontSize: '0.9rem',
                                            padding: 0,
                                            transition: 'color 0.2s'
                                        }} className="toc-link-btn">
                                            {h.title}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>

            <div className="sequential-nav-wrapper">
                <div className="sequential-nav">
                    {nextVersion && (
                        <button onClick={() => onOpenSingle(nextVersion.id)} className="seq-btn prev-btn">
                            <span className="material-symbols-outlined">arrow_back</span>
                            <div className="seq-text" style={{alignItems: 'flex-start'}}>
                                <span className="seq-label">{strings.next_update || "Next Update"}</span>
                                <span className="seq-title">{nextVersion.version.replace('Version ', '')}</span>
                            </div>
                        </button>
                    )}

                    {prevVersion && (
                        <button onClick={() => onOpenSingle(prevVersion.id)} className="seq-btn next-btn"
                                style={{marginLeft: nextVersion ? 'auto' : '0'}}>
                            <div className="seq-text" style={{alignItems: 'flex-end'}}>
                                <span className="seq-label">{strings.previous_update || "Previous Update"}</span>
                                <span className="seq-title">{prevVersion.version.replace('Version ', '')}</span>
                            </div>
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

/**
 * Main viewer component capable of rendering standard list or full-screen views of the changelog.
 *
 * @param {Object} props - The component props.
 * @param {string} props.markdownContent - The raw markdown text containing changelog data.
 * @param {Object} props.appConfig - General application configuration data (e.g., playStoreLink).
 * @param {Object} props.strings - Complete localized string map.
 * @param {Function} props.onNavigate - Callback for external navigation handlers.
 * @returns {JSX.Element} The rendered ChangelogViewer application.
 */
export default function ChangelogViewer({markdownContent: initialMarkdown, appConfig, strings, onNavigate}) {
    const {language} = useLanguage();
    const {versionId} = useParams();
    const navigate = useNavigate();

    const [markdown, setMarkdown] = useState(initialMarkdown);
    const [versions, setVersions] = useState([]);
    const [isAiTranslated, setIsAiTranslated] = useState(false);
    const [isShowingOriginal, setIsShowingOriginal] = useState(false);
    const [showTranslateInfo, setShowTranslateInfo] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleCount, setVisibleCount] = useState(10);
    const [activeId, setActiveId] = useState(versionId || null);
    const [selectedTags, setSelectedTags] = useState([]);

    const isCompass = appConfig?.appName?.toLowerCase().includes('compass');
    const isPulse = appConfig?.appName?.toLowerCase().includes('pulse');
    const isPortfolio = appConfig?.appId === 'io.github.fertwbr.portfolio' || !appConfig?.playStoreLink;
    const betaLink = appConfig?.playStoreLink?.replace('/store/apps/details?id=', '/apps/testing/') || appConfig?.playStoreLink;
    const hasWearApp = isCompass || isPulse;

    const isFullScreenMode = !!versionId;

    useEffect(() => {
        setMarkdown(initialMarkdown);
    }, [initialMarkdown]);

    useEffect(() => {
        if (markdown) {
            setIsAiTranslated(markdown.includes(''));
            setVersions(parseChangelog(markdown));
        }
    }, [markdown]);

    /**
     * Reverts translated changelog to its original English state by reloading local content.
     * Maps the localized active version ID back to its English equivalent using semantic version numbers.
     * @async
     */
    const handleRevertToEnglish = async () => {
        try {
            const originalContent = await loadPageContent('changelog', appConfig, 'en');
            if (originalContent) {
                const englishVersions = parseChangelog(originalContent);

                if (isFullScreenMode && versionId) {
                    const safeVersionId = versionId.replace(/[^a-z0-9]/gi, '-').toLowerCase();
                    const currentVer = versions.find(v => v.id === safeVersionId);

                    if (currentVer) {
                        const versionNumberMatch = currentVer.version.match(/[\d.]+/);
                        if (versionNumberMatch) {
                            const targetVer = englishVersions.find(v => v.version.includes(versionNumberMatch[0]));
                            if (targetVer) {
                                const basePath = isCompass ? '/pixelcompass' : isPulse ? '/pixelpulse' : '';
                                navigate(`${basePath}/changelog/${targetVer.id}`, {replace: true});
                                setActiveId(targetVer.id);
                            }
                        }
                    }
                }

                setMarkdown(originalContent);
                setIsShowingOriginal(true);
                setShowTranslateInfo(false);
            }
        } catch (e) {
            console.error("Failed to load English content", e);
        }
    };

    /**
     * Restores the translated changelog state by reloading local content for the current language.
     * Maps the active version ID back to its translated equivalent using semantic version numbers.
     * @async
     */
    const handleRestoreTranslation = async () => {
        try {
            const translatedContent = await loadPageContent('changelog', appConfig, language);
            if (translatedContent) {
                const translatedVersions = parseChangelog(translatedContent);

                if (isFullScreenMode && versionId) {
                    const safeVersionId = versionId.replace(/[^a-z0-9]/gi, '-').toLowerCase();
                    const currentVer = versions.find(v => v.id === safeVersionId);

                    if (currentVer) {
                        const versionNumberMatch = currentVer.version.match(/[\d.]+/);
                        if (versionNumberMatch) {
                            const targetVer = translatedVersions.find(v => v.version.includes(versionNumberMatch[0]));
                            if (targetVer) {
                                const basePath = isCompass ? '/pixelcompass' : isPulse ? '/pixelpulse' : '';
                                navigate(`${basePath}/changelog/${targetVer.id}`, {replace: true});
                                setActiveId(targetVer.id);
                            }
                        }
                    }
                }

                setMarkdown(translatedContent);
                setIsAiTranslated(true);
                setIsShowingOriginal(false);
            }
        } catch (e) {
            console.error("Failed to load translated content", e);
        }
    };

    /**
     * Navigates back to the root changelog path removing the active version parameter.
     */
    const handleViewAll = () => {
        if (isCompass) navigate('/pixelcompass/changelog');
        else if (isPulse) navigate('/pixelpulse/changelog');
        else navigate('/changelog');
    };

    /**
     * Navigates to a specific version for full-screen detailed view.
     * @param {string} id - The ID of the version to navigate to.
     */
    const handleOpenSingle = (id) => {
        const basePath = isCompass ? '/pixelcompass' : isPulse ? '/pixelpulse' : '';
        navigate(`${basePath}/changelog/${id}`);
    };

    /**
     * Handles sharing functionality, defaulting to native share on supported platforms.
     * @param {Object} version - The active version data to generate a specific link.
     */
    const handleShare = (version) => {
        const basePath = isCompass ? '/pixelcompass' : isPulse ? '/pixelpulse' : '';
        const shareUrl = `${window.location.origin}${basePath}/changelog/${version.id}`;

        if (navigator.share) {
            navigator.share({title: `${appConfig?.appName} Update ${version.version}`, url: shareUrl}).catch(() => {
            });
        } else {
            navigator.clipboard.writeText(shareUrl).then(() => {
                alert(strings.changelog?.link_copied || "Link copied to clipboard!");
            }).catch(() => {
            });
        }
    };

    const allTags = useMemo(() => {
        const tags = new Set();
        versions.forEach(v => v.tags.forEach(t => tags.add(t)));
        return Array.from(tags).sort();
    }, [versions]);

    const filteredVersions = useMemo(() => {
        if (isFullScreenMode && versionId) {
            const safeVersionId = versionId.replace(/[^a-z0-9]/gi, '-').toLowerCase();
            return versions.filter(v => v.id === safeVersionId);
        }

        return versions.filter(v => {
            const matchesSearch = !searchQuery || v.version.toLowerCase().includes(searchQuery.toLowerCase()) || v.content.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesTags = selectedTags.length === 0 || selectedTags.every(t => v.tags.includes(t));
            return matchesSearch && matchesTags;
        });
    }, [versions, searchQuery, selectedTags, isFullScreenMode, versionId]);

    const latestVersion = versions[0];
    const activeVersionIndex = isFullScreenMode && versions.length > 0 ? versions.findIndex(v => v.id === filteredVersions[0]?.id) : -1;
    const nextVersionObj = activeVersionIndex > 0 ? versions[activeVersionIndex - 1] : null;
    const prevVersionObj = activeVersionIndex !== -1 && activeVersionIndex < versions.length - 1 ? versions[activeVersionIndex + 1] : null;

    useEffect(() => {
        if (isFullScreenMode) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) setActiveId(entry.target.id.replace('ver-', ''));
            });
        }, {rootMargin: '-100px 0px -80% 0px'});

        filteredVersions.slice(0, visibleCount).forEach((v) => {
            const el = document.getElementById(`ver-${v.id}`);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [filteredVersions, visibleCount, isFullScreenMode]);

    /**
     * Programmatically scrolls to a specific active version element in the list view.
     * @param {string} id - The target version ID to focus.
     */
    const scrollToVersion = (id) => {
        const targetIndex = filteredVersions.findIndex(v => v.id === id);
        if (targetIndex !== -1) {
            if (targetIndex >= visibleCount) setVisibleCount(targetIndex + 5);
            setTimeout(() => {
                const element = document.getElementById(`ver-${id}`);
                if (element) {
                    const offset = 160;
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({top: elementPosition - offset, behavior: "smooth"});
                }
            }, 300);
        }
    };

    /**
     * Toggles an active filter tag state.
     * @param {string} tag - The specific tag string to toggle.
     */
    const toggleTag = (tag) => {
        setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
    };

    /**
     * Generates table of content navigation buttons relative to filtered versions.
     * @returns {JSX.Element[]} List of interactive Table of Content nodes.
     */
    const renderTocButtons = () => (
        filteredVersions.map(v => (
            <button key={v.id} onClick={() => scrollToVersion(v.id)} style={{
                display: 'flex', width: '100%', textAlign: 'left', padding: '12px 16px',
                background: activeId === v.id ? 'rgba(255,255,255,0.05)' : 'transparent', border: 'none',
                color: activeId === v.id ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-on-surface-variant)',
                fontWeight: activeId === v.id ? 600 : 400,
                borderLeft: activeId === v.id ? `3px solid var(--md-sys-color-primary)` : '3px solid transparent',
                justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', borderRadius: '4px'
            }}>
                <span style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px'}}>
                    {v.version.replace('Version ', '')}
                </span>
                {v.type !== 'stable' && (
                    <span style={{
                        fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px',
                        background: v.type === 'beta' ? '#FFB74D20' : v.type === 'alpha' ? '#EF535020' : '#AB47BC20',
                        color: v.type === 'beta' ? '#FFB74D' : v.type === 'alpha' ? '#EF5350' : '#AB47BC'
                    }}>
                        {v.type === 'rc' ? 'RC' : v.type.substring(0, 1).toUpperCase()}
                    </span>
                )}
            </button>
        ))
    );

    return (
        <div>
            <AnimatePresence>
                {showTranslateInfo && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(0,0,0,0.6)',
                        backdropFilter: 'blur(4px)'
                    }}>
                        <motion.div
                            initial={{scale: 0.9, opacity: 0}} animate={{scale: 1, opacity: 1}}
                            exit={{scale: 0.9, opacity: 0}}
                            className="glass-card"
                            style={{
                                width: '90%',
                                maxWidth: '400px',
                                padding: '32px',
                                borderRadius: '32px',
                                border: '1px solid var(--md-sys-color-outline-variant)',
                                background: 'var(--md-sys-color-surface-container)'
                            }}
                        >
                            <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'}}>
                                <span className="material-symbols-outlined" style={{
                                    color: 'var(--md-sys-color-primary)',
                                    fontSize: '32px'
                                }}>auto_awesome</span>
                                <h3 style={{
                                    margin: 0,
                                    fontSize: '1.2rem'
                                }}>{strings.changelog?.translate_modal_title || 'Auto Translated'}</h3>
                            </div>
                            <p style={{
                                color: 'var(--md-sys-color-on-surface-variant)',
                                lineHeight: 1.5,
                                marginBottom: '32px'
                            }}>
                                {strings.changelog?.translate_modal_desc || 'This content was automatically translated by an AI system to help you stay updated. Some technical terms or nuances might be slightly inaccurate.'}
                            </p>
                            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                                <button onClick={handleRevertToEnglish} className="btn-glow"
                                        style={{justifyContent: 'center', borderRadius: '100px'}}>
                                    {strings.changelog?.translate_modal_show_original || 'Show Original (English)'}
                                </button>
                                <button onClick={() => setShowTranslateInfo(false)} className="btn-outline"
                                        style={{justifyContent: 'center', border: 'none', borderRadius: '100px'}}>
                                    {strings.changelog?.translate_modal_keep_translation || 'Keep Translation'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <div className="page-header-container">
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px',
                    color: 'var(--md-sys-color-on-surface-variant)', fontSize: '0.95rem', fontWeight: 500
                }}>
                    <span>{appConfig?.appName}</span>
                    <span className="material-symbols-outlined" style={{fontSize: '16px'}}>chevron_right</span>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: 'var(--md-sys-color-primary)',
                        fontWeight: 700
                    }}>
                        <span className="material-symbols-outlined" style={{fontSize: '18px'}}>history</span>
                        <span>{isFullScreenMode ? (strings.changelog?.update_details || 'Update Details') : (strings.changelog?.title || 'Changelog')}</span>
                    </div>
                </div>

                <div style={{display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px'}}>
                    {isFullScreenMode && filteredVersions.length > 0 ? (
                        <>
                            <h1 style={{fontSize: '3rem', fontWeight: 800, margin: 0, lineHeight: 1.1}}>
                                Update {filteredVersions[0].version.replace('Version ', '')}
                            </h1>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                flexWrap: 'wrap',
                                marginTop: '8px'
                            }}>
                                <button onClick={handleViewAll} className="btn-outline"
                                        style={{padding: '8px 16px', fontSize: '0.9rem', borderRadius: '100px'}}>
                                    <span className="material-symbols-outlined"
                                          style={{fontSize: '18px'}}>arrow_back</span>
                                    {strings.changelog?.view_all || "View All Updates"}
                                </button>
                                <button onClick={() => handleShare(filteredVersions[0])} className="btn-outline"
                                        style={{padding: '8px 16px', fontSize: '0.9rem', borderRadius: '100px'}}>
                                    <span className="material-symbols-outlined" style={{fontSize: '18px'}}>share</span>
                                    {strings.changelog?.share_update || "Share Update"}
                                </button>
                                <AnimatePresence>
                                    {(isAiTranslated || isShowingOriginal) &&
                                        <AutoTranslateBadge isShowingOriginal={isShowingOriginal}
                                                            onClick={() => isShowingOriginal ? handleRestoreTranslation() : setShowTranslateInfo(true)}/>}
                                </AnimatePresence>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 style={{
                                fontSize: '3rem',
                                fontWeight: 800,
                                margin: 0,
                                lineHeight: 1.1
                            }}>{strings.changelog?.title || 'Changelog'}</h1>
                            <div style={{display: 'flex', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap'}}>
                                <p style={{
                                    fontSize: '1.1rem',
                                    color: 'var(--md-sys-color-on-surface-variant)',
                                    margin: 0,
                                    maxWidth: '700px'
                                }}>
                                    {strings.changelog?.subtitle || 'Track the evolution of the application.'}
                                </p>
                                <AnimatePresence>
                                    {(isAiTranslated || isShowingOriginal) &&
                                        <AutoTranslateBadge isShowingOriginal={isShowingOriginal}
                                                            onClick={() => isShowingOriginal ? handleRestoreTranslation() : setShowTranslateInfo(true)}/>}
                                </AnimatePresence>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="changelog-layout" style={{display: 'flex', gap: '60px', alignItems: 'flex-start'}}>

                <div style={{flex: 1, minWidth: 0}}>
                    {!isFullScreenMode && (
                        <>
                            <div className="glass-card" style={{
                                marginBottom: '40px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px',
                                padding: '24px',
                                borderRadius: '32px',
                                border: '1px solid var(--md-sys-color-outline-variant)',
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 100%)',
                                backdropFilter: 'blur(12px)',
                                WebkitBackdropFilter: 'blur(12px)'
                            }}>
                                <div className="search-input-wrapper">
                                    <span className="material-symbols-outlined search-icon-absolute">search</span>
                                    <input
                                        type="text" className="search-input-high-contrast"
                                        placeholder={strings.changelog?.search_placeholder || "Search updates..."}
                                        value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                {allTags.length > 0 && (
                                    <div className="filter-tags-container">
                                        {allTags.map(tag => {
                                            const isSelected = selectedTags.includes(tag);
                                            const style = getTagStyle(tag);
                                            return (
                                                <button
                                                    key={tag} onClick={() => toggleTag(tag)} className="filter-tag"
                                                    style={{
                                                        backgroundColor: isSelected ? style.bg : 'transparent',
                                                        borderColor: isSelected ? style.border : 'var(--md-sys-color-outline-variant)',
                                                        color: isSelected ? style.color : 'var(--md-sys-color-on-surface-variant)',
                                                        fontWeight: isSelected ? 700 : 500,
                                                        transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)'
                                                    }}
                                                >
                                                    {tag}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            <div className="mobile-toc-wrapper" style={{display: 'none'}}>
                                <PageTableOfContents title={strings.changelog?.jump_to || "Jump to"} isMobile={true}>
                                    {renderTocButtons()}
                                </PageTableOfContents>
                            </div>
                        </>
                    )}

                    <div style={{position: 'relative', paddingLeft: isFullScreenMode ? '0' : '48px'}}>
                        {!isFullScreenMode && (
                            <div style={{
                                position: 'absolute',
                                left: '15px',
                                top: '24px',
                                bottom: '24px',
                                width: '2px',
                                background: 'linear-gradient(to bottom, var(--md-sys-color-outline-variant) 0%, transparent 100%)',
                                opacity: 0.3
                            }}></div>
                        )}

                        {filteredVersions.length > 0 ? (
                            isFullScreenMode ? (
                                <FullScreenArticle
                                    key={`fs-${filteredVersions[0].id}`}
                                    v={filteredVersions[0]}
                                    prevVersion={prevVersionObj}
                                    nextVersion={nextVersionObj}
                                    strings={strings.changelog || {}}
                                    onOpenSingle={handleOpenSingle}
                                />
                            ) : (
                                filteredVersions.slice(0, visibleCount).map((v, index) => (
                                    <ChangelogItem key={v.id} v={v} index={index} isActive={activeId === v.id}
                                                   strings={strings.changelog || {}}
                                                   onOpenSingle={() => handleOpenSingle(v.id)} onShare={handleShare}/>
                                ))
                            )
                        ) : (
                            <div style={{
                                padding: '40px',
                                textAlign: 'center',
                                color: 'var(--md-sys-color-on-surface-variant)'
                            }}>
                                <span className="material-symbols-outlined"
                                      style={{fontSize: '48px', marginBottom: '16px', opacity: 0.5}}>search_off</span>
                                <p>{isFullScreenMode ? (strings.changelog?.version_not_found || "Version not found.") : (strings.changelog?.no_results || "No results found.")}</p>
                                {isFullScreenMode && (
                                    <button onClick={handleViewAll} className="btn-glow" style={{marginTop: '24px'}}>
                                        {strings.changelog?.back_to_changelog || "Back to Changelog"}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {!isFullScreenMode && visibleCount < filteredVersions.length && (
                        <div style={{
                            textAlign: 'center',
                            marginTop: '40px',
                            paddingBottom: '20px',
                            paddingLeft: '48px'
                        }}>
                            <button onClick={() => setVisibleCount(prev => prev + 10)} className="btn-outline" style={{
                                width: '100%',
                                padding: '16px',
                                borderRadius: '100px',
                                borderStyle: 'dashed',
                                opacity: 0.7
                            }}>
                                {strings.changelog?.load_more || "Load More"} ({filteredVersions.length - visibleCount})
                            </button>
                        </div>
                    )}

                    {!isPortfolio && !isFullScreenMode && (
                        <div className="mobile-extra-content"
                             style={{display: 'none', marginTop: '80px', marginBottom: '100px'}}>
                            <div style={{
                                background: 'rgba(var(--md-sys-color-surface-container-rgb), 0.5)',
                                borderRadius: '32px',
                                padding: '24px',
                                border: '1px solid var(--md-sys-color-outline-variant)'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    marginBottom: '20px',
                                    color: 'var(--md-sys-color-on-surface-variant)',
                                    fontSize: '0.85rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    fontWeight: 600
                                }}>
                                    <span className="material-symbols-outlined"
                                          style={{fontSize: '18px'}}>explore</span>
                                    <span>{strings.changelog?.explore_more || "Explore More"}</span>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                                    {latestVersion && !searchQuery && (
                                        <LatestReleaseCard version={latestVersion} strings={strings.changelog || {}}
                                                           link={appConfig?.playStoreLink}/>
                                    )}
                                    <BetaProgramCard strings={strings.changelog?.beta_program || {}}
                                                     betaLink={betaLink}/>
                                    <WearOSCard strings={strings.changelog?.wear_os_promo || {}}
                                                isAvailable={hasWearApp} link={appConfig?.playStoreLink}/>
                                    <PlusPromoCard strings={strings.changelog?.plus_promo || {}}
                                                   onNavigate={onNavigate}/>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {!isFullScreenMode && (
                    <div className="desktop-toc-wrapper" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        width: '320px',
                        minWidth: '320px'
                    }}>
                        {!isPortfolio && latestVersion && !searchQuery && (
                            <LatestReleaseCard version={latestVersion} strings={strings.changelog || {}}
                                               link={appConfig?.playStoreLink}/>
                        )}
                        <PageTableOfContents title={strings.changelog?.on_this_page || "On this page"} isMobile={false}>
                            {renderTocButtons()}
                        </PageTableOfContents>
                        {!isPortfolio && (
                            <div style={{
                                marginTop: '20px', padding: '24px', borderRadius: '32px',
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 100%)',
                                border: '1px solid var(--md-sys-color-outline-variant)'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    marginBottom: '20px',
                                    color: 'var(--md-sys-color-on-surface-variant)',
                                    fontSize: '0.85rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    fontWeight: 600
                                }}>
                                    <span className="material-symbols-outlined"
                                          style={{fontSize: '18px'}}>explore</span>
                                    <span>{strings.changelog?.explore_more || "Explore More"}</span>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                                    <BetaProgramCard strings={strings.changelog?.beta_program || {}}
                                                     betaLink={betaLink}/>
                                    <WearOSCard strings={strings.changelog?.wear_os_promo || {}} isCompass={isCompass}
                                                link={appConfig?.playStoreLink}/>
                                    <PlusPromoCard strings={strings.changelog?.plus_promo || {}}
                                                   onNavigate={onNavigate}/>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <BackToTop strings={strings.changelog || {}}/>

                <style>{`
                  @media (max-width: 1000px) {
                    .desktop-toc-wrapper { display: none !important; }
                    .changelog-layout { display: block !important; }
                    .mobile-toc-wrapper { display: block !important; margin-bottom: 30px; }
                    .mobile-extra-content { display: block !important; }
                    .article-layout { flex-direction: column; }
                    .desktop-article-toc { display: none; }
                  }
                  @media (min-width: 1001px) {
                    .mobile-article-toc { display: none; }
                    .article-layout { display: grid; grid-template-columns: 1fr 300px; gap: 40px; align-items: start; }
                  }
                  
                  .changelog-item-header {
                      padding: 24px;
                      cursor: pointer;
                      background: transparent;
                      display: flex;
                      justify-content: space-between;
                      align-items: flex-start;
                      gap: 16px;
                      transition: background 0.3s;
                  }
                  
                  .changelog-item-header.open {
                      background: rgba(255,255,255,0.02);
                  }
                  
                  .changelog-item-actions {
                      display: flex;
                      align-items: center;
                      gap: 8px;
                      flex-shrink: 0;
                  }
                  
                  @media (max-width: 600px) {
                      .changelog-item-header {
                          flex-direction: column;
                      }
                      .changelog-item-actions {
                          width: 100%;
                          justify-content: flex-end;
                          padding-top: 16px;
                          border-top: 1px solid var(--md-sys-color-outline-variant);
                      }
                      .filter-tags-container {
                          flex-wrap: nowrap;
                          overflow-x: auto;
                          padding-bottom: 8px;
                          -webkit-overflow-scrolling: touch;
                      }
                      .filter-tag {
                          flex-shrink: 0;
                      }
                  }
                  
                  .icon-action-btn {
                      background: var(--md-sys-color-surface-container);
                      border: none;
                      color: var(--md-sys-color-on-surface-variant);
                      cursor: pointer;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      width: 48px;
                      height: 48px;
                      border-radius: 16px;
                      transition: all 0.2s;
                  }
                  
                  .icon-action-btn:hover {
                      background: var(--md-sys-color-surface-container-high);
                      color: var(--md-sys-color-on-surface);
                  }
                  
                  .icon-action-btn.primary {
                      background: var(--md-sys-color-primary-container);
                      color: var(--md-sys-color-on-primary-container);
                  }
                  
                  .icon-action-btn.primary:hover {
                      background: var(--md-sys-color-primary);
                      color: var(--md-sys-color-on-primary);
                  }
                  
                  .icon-expand {
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      width: 48px;
                      height: 48px;
                      border-radius: 24px;
                      background: transparent;
                      color: var(--md-sys-color-on-surface-variant);
                      transition: transform 0.3s, background 0.2s;
                  }
                  
                  .changelog-item-header:hover .icon-expand {
                      background: var(--md-sys-color-surface-container-highest);
                  }
                  
                  .content-tag {
                    font-size: 0.75rem; padding: 6px 12px; border-radius: 100px;
                    background: var(--md-sys-color-surface-container-high);
                    color: var(--md-sys-color-on-surface-variant);
                    border: 1px solid var(--md-sys-color-outline-variant); font-weight: 500;
                  }
                  
                  .horizontal-chips {
                    display: flex;
                    overflow-x: auto;
                    gap: 8px;
                    padding-bottom: 12px;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                    scroll-snap-type: x mandatory;
                  }
                  .horizontal-chips::-webkit-scrollbar { display: none; }
                  
                  .toc-chip {
                    scroll-snap-align: start;
                    flex-shrink: 0;
                    white-space: nowrap; background: var(--md-sys-color-surface-container);
                    border: 1px solid var(--md-sys-color-outline-variant); color: var(--md-sys-color-on-surface);
                    padding: 8px 16px; border-radius: 100px; font-size: 0.85rem; cursor: pointer;
                    transition: all 0.2s;
                  }
                  
                  .toc-chip:active {
                      transform: scale(0.95);
                  }
                  
                  .toc-link-btn:hover { color: var(--md-sys-color-primary) !important; }
                  
                  .sequential-nav-wrapper {
                    margin-top: 60px;
                    border-top: 1px solid var(--md-sys-color-outline-variant);
                    padding-top: 40px;
                    margin-bottom: 80px;
                    width: 100%;
                  }
                  
                  .sequential-nav {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    gap: 16px;
                  }
                  
                  .seq-btn {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    background: var(--md-sys-color-surface-container);
                    border: 1px solid var(--md-sys-color-outline-variant);
                    padding: 16px 24px;
                    border-radius: 24px;
                    cursor: pointer;
                    transition: all 0.2s;
                    color: var(--md-sys-color-on-surface);
                    max-width: 45%;
                    min-width: 200px;
                  }
                  
                  .seq-btn.next-btn {
                      margin-left: auto;
                  }
                  
                  .seq-btn:hover { 
                      background: var(--md-sys-color-surface-container-high); 
                      border-color: var(--md-sys-color-primary); 
                  }
                  
                  .seq-text {
                      display: flex;
                      flex-direction: column;
                      min-width: 0;
                      overflow: hidden;
                      flex: 1;
                  }
                  
                  .seq-label {
                      font-size: 0.75rem;
                      color: var(--md-sys-color-on-surface-variant);
                      text-transform: uppercase;
                      letter-spacing: 1px;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      margin-bottom: 4px;
                  }
                  
                  .seq-title {
                      font-size: 1rem;
                      font-weight: 700;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                  }

                  @media (max-width: 600px) {
                      .sequential-nav {
                          flex-direction: column;
                          align-items: stretch;
                          gap: 12px;
                      }
                      .seq-btn {
                          max-width: 100%;
                          width: 100%;
                          padding: 14px 16px;
                      }
                      .seq-btn.next-btn {
                          margin-left: 0;
                      }
                  }
                  
                  .article-typography h4 {
                    font-size: 1.5rem !important; margin-top: 2.5em !important; 
                    padding-bottom: 0.5em; border-bottom: 2px solid var(--md-sys-color-surface-container-highest);
                  }
                  .article-typography p, .article-typography li { font-size: 1.1rem; line-height: 1.7; }
                  
                  .markdown-body h4 {
                    font-size: 1.3rem; margin-top: 2em; margin-bottom: 1em; padding-bottom: 0.5em;
                    border-bottom: 1px solid var(--md-sys-color-outline-variant); color: var(--md-sys-color-primary);
                    display: flex; align-items: center; gap: 8px;
                  }
                  .markdown-body ul { padding-left: 1.2em; list-style-type: disc; color: var(--md-sys-color-on-surface-variant); }
                  .markdown-body li { margin-bottom: 0.8em; }
                  .markdown-body li strong { color: var(--md-sys-color-on-surface); font-weight: 600; }
                `}</style>
            </div>
        </div>
    );
}