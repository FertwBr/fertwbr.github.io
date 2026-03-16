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
 * Map of tag keys to visual style settings used by badges and timeline indicators.
 * Keys are lowercase tag identifiers.
 * Each entry contains:
 * - bg: background color
 * - color: foreground color
 * - border: border color
 * - highlight: accent color used for timeline/markers
 *
 * @type {{[key: string]: {bg: string, color: string, border: string, highlight: string}}}
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
 * Get the style configuration for a tag/type key.
 *
 * @param {string|undefined|null} tagKey - Tag or release type (case-insensitive).
 * @returns {{bg: string, color: string, border: string, highlight: string}} Style config for the provided tag.
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
 * VersionBadge component
 *
 * Renders a small badge representing the release channel/type.
 *
 * @param {Object} props
 * @param {string} props.type - Release type key used to determine visual style.
 * @param {string} [props.text] - Optional text to display; falls back to the `type` value.
 * @returns {JSX.Element} Inline styled `<span>` used as a badge.
 */
const VersionBadge = ({type, text}) => {
    const style = getTagStyle(type);

    return (
        <span style={{
            fontSize: '0.65rem', fontWeight: 700, padding: '4px 8px', borderRadius: '6px',
            background: style.bg,
            color: style.color,
            border: `1px solid ${style.border}`,
            textTransform: 'uppercase', letterSpacing: '0.5px', display: 'inline-flex',
            alignItems: 'center', whiteSpace: 'nowrap'
        }}>
          {text || type}
        </span>
    );
};

/**
 * ChangelogItem component
 *
 * Renders a single changelog entry card with expand/collapse behavior and entrance animation.
 * The first item (index === 0) is open by default. Uses framer-motion for animated mount/unmount
 * and expansion. Displays version metadata (version string, release date, type badges, tags)
 * and renders the changelog content as Markdown.
 *
 * @param {Object} props
 * @param {Object} props.v - Version object parsed from the changelog.
 * @param {number} props.index - Index of this item in the list.
 * @param {boolean} props.isActive - Whether this item is currently active/in-view.
 * @param {Object} props.strings - Localization strings used inside the item.
 * @param {boolean} [props.forceOpen] - If true, the item starts expanded regardless of its index.
 * @param {boolean} [props.isFullScreenMode] - If true, drops the card UI and renders as a full page article.
 * @param {Function} [props.onOpenSingle] - Callback to open the item in full screen mode.
 * @param {Function} [props.onShare] - Callback to trigger the share API for this specific version.
 * @returns {JSX.Element} A motion-wrapped changelog item card or a flat full-screen layout.
 */
const ChangelogItem = ({v, index, isActive, strings, forceOpen, isFullScreenMode, onOpenSingle, onShare}) => {
    const [isOpen, setIsOpen] = useState(forceOpen || index === 0);
    const badgeStyle = getTagStyle(v.type);

    useEffect(() => {
        if (forceOpen) {
            setIsOpen(true);
        }
    }, [forceOpen]);

    const timelineColor = badgeStyle.highlight;

    const platformTags = ['Wear OS', 'Android XR', 'Phone', 'Tablet', 'Web', 'Website'];
    const excludeTags = ['Wear OS', 'Android XR', 'Phone', 'Tablet', 'Web', 'Website', 'Beta', 'Alpha', 'RC', 'Pre-release'];

    if (isFullScreenMode) {
        return (
            <div id={`ver-${v.id}`} style={{marginBottom: '40px'}}>
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

                <div style={{display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap'}}>
                    {v.tags.filter(t => !excludeTags.includes(t)).map(tag => (
                        <span key={tag} style={{
                            fontSize: '0.85rem', padding: '6px 14px', borderRadius: '100px',
                            background: 'var(--md-sys-color-surface-container-high)',
                            color: 'var(--md-sys-color-on-surface-variant)',
                            border: '1px solid var(--md-sys-color-outline-variant)', fontWeight: 500
                        }}>{tag}</span>
                    ))}
                </div>

                <div className="markdown-body" style={{fontSize: '1.15rem'}}>
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{v.content}</ReactMarkdown>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            id={`ver-${v.id}`}
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
                zIndex: 2, boxShadow: `0 0 0 4px var(--md-sys-color-surface)`
            }}/>

            <div className="glass-card" style={{
                borderRadius: '24px',
                border: isActive ? `1px solid var(--md-sys-color-primary)` : '1px solid var(--md-sys-color-outline-variant)',
                overflow: 'hidden', transition: 'border-color 0.3s'
            }}>
                <div onClick={() => setIsOpen(!isOpen)} style={{
                    padding: '24px', cursor: 'pointer',
                    background: isOpen ? 'rgba(255,255,255,0.02)' : 'transparent',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px'
                }}>
                    <div>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', flexWrap: 'wrap'
                        }}>
                            <h2 style={{fontSize: '1.5rem', fontWeight: 800, margin: 0, letterSpacing: '-0.5px'}}>
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
                            display: 'flex', alignItems: 'center', gap: '8px',
                            color: 'var(--md-sys-color-on-surface-variant)', fontSize: '0.9rem'
                        }}>
                            <span className="material-symbols-outlined" style={{fontSize: '16px'}}>calendar_today</span>
                            {strings.released || "Released"} {v.date}
                        </div>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (onShare) onShare(v);
                            }}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--md-sys-color-on-surface-variant)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '8px',
                                borderRadius: '50%'
                            }}
                            title={strings.share_tooltip || "Share this update"}
                        >
                            <span className="material-symbols-outlined" style={{fontSize: '20px'}}>share</span>
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (onOpenSingle) onOpenSingle();
                            }}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--md-sys-color-primary)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '8px',
                                borderRadius: '50%'
                            }}
                            title={strings.open_full_screen || "Open in full screen"}
                        >
                            <span className="material-symbols-outlined" style={{fontSize: '20px'}}>open_in_new</span>
                        </button>
                        <span className="material-symbols-outlined" style={{
                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s',
                            color: 'var(--md-sys-color-on-surface-variant)', padding: '8px'
                        }}>expand_more</span>
                    </div>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div initial={{height: 0, opacity: 0}} animate={{height: 'auto', opacity: 1}}
                                    exit={{height: 0, opacity: 0}} style={{overflow: 'hidden'}}>
                            <div style={{padding: '0 24px 24px 24px'}}>
                                <div style={{
                                    width: '100%', height: '1px', background: 'var(--md-sys-color-outline-variant)',
                                    opacity: 0.3, marginBottom: '24px'
                                }}></div>
                                <div style={{display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap'}}>
                                    {v.tags.filter(t => !excludeTags.includes(t)).map(tag => (
                                        <span key={tag} style={{
                                            fontSize: '0.75rem', padding: '4px 10px', borderRadius: '100px',
                                            background: 'var(--md-sys-color-surface-container-high)',
                                            color: 'var(--md-sys-color-on-surface-variant)',
                                            border: '1px solid var(--md-sys-color-outline-variant)', fontWeight: 500
                                        }}>{tag}</span>
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
 * Changelog viewer component.
 *
 * @param {Object} props
 * @param {string} props.markdownContent - Initial changelog Markdown content.
 * @param {Object} props.appConfig - Application configuration.
 * @param {Object} props.strings - Localization strings used by the component.
 * @param {Function} [props.onNavigate] - Optional navigation callback for promo actions.
 * @returns {JSX.Element}
 */
export default function ChangelogViewer({markdownContent: initialMarkdown, appConfig, strings, onNavigate}) {
    const {language} = useLanguage();
    const {versionId} = useParams();
    const navigate = useNavigate();

    const [markdown, setMarkdown] = useState(initialMarkdown);
    const [versions, setVersions] = useState([]);
    const [isAiTranslated, setIsAiTranslated] = useState(false);
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

    const handleRevertToEnglish = async () => {
        try {
            const originalContent = await loadPageContent('changelog', appConfig, 'en');
            if (originalContent) {
                setMarkdown(originalContent);
                setIsAiTranslated(false);
                setShowTranslateInfo(false);
            }
        } catch (e) {
            console.error("Failed to load English content", e);
        }
    };

    const handleViewAll = () => {
        if (isCompass) {
            navigate('/pixelcompass/changelog');
        } else if (isPulse) {
            navigate('/pixelpulse/changelog');
        } else {
            navigate('/changelog');
        }
    };

    const handleOpenSingle = (id) => {
        const basePath = isCompass ? '/pixelcompass' : isPulse ? '/pixelpulse' : '';
        navigate(`${basePath}/changelog/${id}`);
    };

    const handleShare = (version) => {
        const basePath = isCompass ? '/pixelcompass' : isPulse ? '/pixelpulse' : '';
        const shareUrl = `${window.location.origin}${basePath}/changelog/${version.id}`;

        if (navigator.share) {
            navigator.share({
                title: `${appConfig?.appName} Update ${version.version}`,
                url: shareUrl
            }).catch(() => {
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

    const toggleTag = (tag) => {
        setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
    };

    const renderTocButtons = () => (
        filteredVersions.map(v => (
            <button key={v.id} onClick={() => scrollToVersion(v.id)} style={{
                display: 'flex', width: '100%', textAlign: 'left', padding: '12px 16px',
                background: activeId === v.id ? 'rgba(255,255,255,0.05)' : 'transparent',
                border: 'none',
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
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)'
                    }}>
                        <motion.div
                            initial={{scale: 0.9, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            exit={{scale: 0.9, opacity: 0}}
                            className="glass-card"
                            style={{
                                width: '90%', maxWidth: '400px', padding: '24px', borderRadius: '24px',
                                border: '1px solid var(--md-sys-color-outline-variant)',
                                background: 'var(--md-sys-color-surface-container)'
                            }}
                        >
                            <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'}}>
                                <span className="material-symbols-outlined" style={{
                                    color: 'var(--md-sys-color-primary)',
                                    fontSize: '32px'
                                }}>auto_awesome</span>
                                <h3 style={{margin: 0, fontSize: '1.2rem'}}>AI Translated</h3>
                            </div>
                            <p style={{
                                color: 'var(--md-sys-color-on-surface-variant)',
                                lineHeight: 1.5,
                                marginBottom: '24px'
                            }}>
                                This content was automatically translated by Google Gemini to help you stay updated.
                                Some technical terms or nuances might be slightly inaccurate.
                            </p>
                            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                                <button onClick={handleRevertToEnglish} className="btn-glow"
                                        style={{justifyContent: 'center'}}>
                                    Show Original (English)
                                </button>
                                <button onClick={() => setShowTranslateInfo(false)} className="btn-outline"
                                        style={{justifyContent: 'center', border: 'none'}}>
                                    Keep Translation
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
                            <h1 style={{
                                fontSize: '3rem',
                                fontWeight: 800,
                                margin: 0,
                                lineHeight: 1.1
                            }}>{appConfig?.appName} {filteredVersions[0].version.replace('Version ', '')}</h1>
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
                                    {isAiTranslated && <AutoTranslateBadge onClick={() => setShowTranslateInfo(true)}/>}
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
                                    {isAiTranslated && <AutoTranslateBadge onClick={() => setShowTranslateInfo(true)}/>}
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
                            <div style={{marginBottom: '40px', display: 'flex', flexDirection: 'column', gap: '16px'}}>
                                <div className="search-input-wrapper">
                                    <span className="material-symbols-outlined search-icon-absolute">search</span>
                                    <input
                                        type="text"
                                        className="search-input-high-contrast"
                                        placeholder={strings.changelog?.search_placeholder || "Search updates..."}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                {allTags.length > 0 && (
                                    <div className="filter-tags-container">
                                        {allTags.map(tag => {
                                            const isSelected = selectedTags.includes(tag);
                                            const style = getTagStyle(tag);

                                            return (
                                                <button
                                                    key={tag}
                                                    onClick={() => toggleTag(tag)}
                                                    className="filter-tag"
                                                    style={{
                                                        backgroundColor: isSelected ? style.bg : 'transparent',
                                                        borderColor: isSelected ? style.border : 'var(--md-sys-color-outline-variant)',
                                                        color: isSelected ? style.color : 'var(--md-sys-color-on-surface-variant)',
                                                        fontWeight: isSelected ? 700 : 500
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

                    <div style={{position: 'relative', paddingLeft: isFullScreenMode ? '0' : '40px'}}>
                        {!isFullScreenMode && (
                            <div style={{
                                position: 'absolute', left: '11px', top: 0, bottom: 0, width: '2px',
                                background: 'var(--md-sys-color-outline-variant)', opacity: 0.3
                            }}></div>
                        )}

                        {filteredVersions.length > 0 ? (
                            isFullScreenMode ? (
                                <ChangelogItem key={filteredVersions[0].id} v={filteredVersions[0]} index={0}
                                               isActive={true}
                                               strings={strings.changelog || {}} forceOpen={true}
                                               isFullScreenMode={true}/>
                            ) : (
                                filteredVersions.slice(0, visibleCount).map((v, index) => (
                                    <ChangelogItem key={v.id} v={v} index={index} isActive={activeId === v.id}
                                                   strings={strings.changelog || {}} isFullScreenMode={false}
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
                            paddingLeft: '40px'
                        }}>
                            <button onClick={() => setVisibleCount(prev => prev + 10)} className="btn-outline" style={{
                                width: '100%',
                                padding: '16px',
                                borderRadius: '16px',
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
                                borderRadius: '24px',
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
                                        <LatestReleaseCard
                                            version={latestVersion}
                                            strings={strings.changelog || {}}
                                            link={appConfig?.playStoreLink}
                                        />
                                    )}
                                    <BetaProgramCard
                                        strings={strings.changelog?.beta_program || {}}
                                        betaLink={betaLink}
                                    />
                                    <WearOSCard
                                        strings={strings.changelog?.wear_os_promo || {}}
                                        isAvailable={hasWearApp}
                                        link={appConfig?.playStoreLink}
                                    />
                                    <PlusPromoCard
                                        strings={strings.changelog?.plus_promo || {}}
                                        onNavigate={onNavigate}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {!isFullScreenMode && (
                    <div className="desktop-toc-wrapper"
                         style={{
                             display: 'flex',
                             flexDirection: 'column',
                             gap: '20px',
                             width: '320px',
                             minWidth: '320px'
                         }}>

                        {!isPortfolio && latestVersion && !searchQuery && (
                            <LatestReleaseCard
                                version={latestVersion}
                                strings={strings.changelog || {}}
                                link={appConfig?.playStoreLink}
                            />
                        )}

                        <PageTableOfContents title={strings.changelog?.on_this_page || "On this page"} isMobile={false}>
                            {renderTocButtons()}
                        </PageTableOfContents>

                        {!isPortfolio && (
                            <div style={{
                                marginTop: '20px',
                                padding: '24px',
                                borderRadius: '24px',
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
                                    <BetaProgramCard
                                        strings={strings.changelog?.beta_program || {}}
                                        betaLink={betaLink}
                                    />

                                    <WearOSCard
                                        strings={strings.changelog?.wear_os_promo || {}}
                                        isCompass={isCompass}
                                        link={appConfig?.playStoreLink}
                                    />

                                    <PlusPromoCard
                                        strings={strings.changelog?.plus_promo || {}}
                                        onNavigate={onNavigate}
                                    />
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
                  }
                  .markdown-body h4 {
                    font-size: 1.3rem;
                    margin-top: 2em;
                    margin-bottom: 1em;
                    padding-bottom: 0.5em;
                    border-bottom: 1px solid var(--md-sys-color-outline-variant);
                    color: var(--md-sys-color-primary);
                    display: flex;
                    align-items: center;
                    gap: 8px;
                  }
                  .markdown-body ul { padding-left: 1.2em; list-style-type: disc; color: var(--md-sys-color-on-surface-variant); }
                  .markdown-body li { margin-bottom: 0.8em; }
                  .markdown-body li strong { color: var(--md-sys-color-on-surface); font-weight: 600; }
                `}</style>
            </div>
        </div>
    );
}