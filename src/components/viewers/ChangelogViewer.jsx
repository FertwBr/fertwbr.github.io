import React, {useState, useEffect, useMemo, useRef} from 'react';
import {createPortal} from 'react-dom';
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
import ViewerHeader from '../common/ViewerHeader';

import {
    LatestReleaseCard,
    BetaProgramCard,
    WearOSCard,
    PlusPromoCard
} from './changelog/SidebarCards';

/**
 * Configuration object defining styles for various changelog tags using dynamic MD3 colors.
 */
const TAG_STYLE_CONFIG = {
    stable: {
        bg: 'var(--md-sys-color-primary)',
        color: 'var(--md-sys-color-on-primary)',
        border: 'transparent',
        highlight: 'var(--md-sys-color-primary)'
    },
    beta: {
        bg: 'var(--md-sys-color-tertiary-container)',
        color: 'var(--md-sys-color-on-tertiary-container)',
        border: 'var(--md-sys-color-tertiary)',
        highlight: 'var(--md-sys-color-tertiary)'
    },
    alpha: {
        bg: 'var(--md-sys-color-error-container)',
        color: 'var(--md-sys-color-on-error-container)',
        border: 'var(--md-sys-color-error)',
        highlight: 'var(--md-sys-color-error)'
    },
    rc: {
        bg: 'var(--md-sys-color-secondary-container)',
        color: 'var(--md-sys-color-on-secondary-container)',
        border: 'var(--md-sys-color-secondary)',
        highlight: 'var(--md-sys-color-secondary)'
    },
    'pre-release': {
        bg: 'var(--md-sys-color-surface-variant)',
        color: 'var(--md-sys-color-on-surface-variant)',
        border: 'var(--md-sys-color-outline)',
        highlight: 'var(--md-sys-color-outline)'
    },
    default: {
        bg: 'var(--md-sys-color-surface-container-highest)',
        color: 'var(--md-sys-color-on-surface)',
        border: 'transparent',
        highlight: 'var(--md-sys-color-outline)'
    }
};

const getTagStyle = (tagKey) => {
    const key = tagKey?.toLowerCase() || 'default';
    if (TAG_STYLE_CONFIG[key]) return TAG_STYLE_CONFIG[key];
    if (key.includes('beta')) return TAG_STYLE_CONFIG.beta;
    if (key.includes('alpha')) return TAG_STYLE_CONFIG.alpha;
    if (key.includes('rc')) return TAG_STYLE_CONFIG.rc;
    if (key.includes('pre-release')) return TAG_STYLE_CONFIG['pre-release'];
    return TAG_STYLE_CONFIG.default;
};

const VersionBadge = ({type, text}) => {
    const style = getTagStyle(type);
    return (
        <span style={{
            fontSize: '0.65rem',
            fontWeight: 700,
            padding: '4px 8px',
            borderRadius: '6px',
            background: style.bg,
            color: style.color,
            border: style.border !== 'transparent' ? `1px solid ${style.border}` : 'none',
            textTransform: 'uppercase',
            letterSpacing: '0.03em',
            display: 'inline-flex',
            alignItems: 'center',
            whiteSpace: 'nowrap'
        }}>
            {text || type}
        </span>
    );
};

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
            <div className="timeline-dot" style={{
                background: v.type === 'stable' ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-surface)',
                border: `3px solid ${timelineColor}`
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
                                letterSpacing: '-0.03em',
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
                            <span className="material-symbols-outlined" style={{fontSize: '20px'}}>fullscreen</span>
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

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            const offset = 120;
            const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({top: elementPosition - offset, behavior: "smooth"});
        }
    };

    const excludeTags = ['Wear OS', 'Android XR', 'Phone', 'Tablet', 'Web', 'Website', 'Beta', 'Alpha', 'RC', 'Pre-release'];

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
            <div className="article-layout">
                <div className="article-main-content" style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '40px'
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '24px',
                        background: 'linear-gradient(135deg, rgba(var(--md-sys-color-primary-rgb), 0.08) 0%, transparent 100%)',
                        padding: 'clamp(24px, 4vw, 40px)',
                        borderRadius: '24px',
                        border: '1px solid rgba(var(--md-sys-color-primary-rgb), 0.1)',
                        position: 'relative'
                    }}>
                        <div style={{
                            position: 'absolute',
                            left: 0,
                            top: '32px',
                            bottom: '32px',
                            width: '4px',
                            background: 'var(--md-sys-color-primary)',
                            borderRadius: '0 4px 4px 0'
                        }}/>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            color: 'var(--md-sys-color-primary)',
                            fontSize: '1.2rem',
                            fontWeight: 800,
                            letterSpacing: '-0.03em'
                        }}>
                            <span className="material-symbols-outlined" style={{fontSize: '28px'}}>verified</span>
                            {strings.released || "Released"} {v.date}
                        </div>

                        <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                            {v.tags.filter(t => !excludeTags.includes(t)).map(tag => (
                                <span key={tag} style={{
                                    fontSize: '0.85rem',
                                    padding: '6px 16px',
                                    background: 'var(--md-sys-color-surface-container)',
                                    color: 'var(--md-sys-color-on-surface)',
                                    borderRadius: '100px',
                                    fontWeight: 600,
                                    border: '1px solid var(--md-sys-color-outline-variant)'
                                }}>{tag}</span>
                            ))}
                        </div>

                        {headers.length > 0 && (
                            <div className="mobile-article-toc" style={{marginTop: '8px'}}>
                                <div style={{
                                    fontSize: '0.85rem',
                                    fontWeight: 700,
                                    color: 'var(--md-sys-color-on-surface-variant)',
                                    marginBottom: '16px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.03em'
                                }}>
                                    {strings.in_this_update || "In this update"}
                                </div>
                                <div className="horizontal-chips" style={{margin: '0 -24px', padding: '0 24px'}}>
                                    {headers.map(h => (
                                        <button key={h.id} onClick={() => scrollToSection(h.id)} className="toc-chip">
                                            {h.title}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="markdown-body">
                        <ReactMarkdown rehypePlugins={[rehypeRaw]} components={MarkdownComponents}>
                            {v.content}
                        </ReactMarkdown>
                    </div>
                </div>

                {headers.length > 0 && (
                    <div className="desktop-article-toc">
                        <div className="glass-card" style={{
                            position: 'sticky',
                            top: '140px',
                            padding: '32px',
                            borderRadius: '32px'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                margin: '0 0 24px 0',
                                color: 'var(--md-sys-color-primary)',
                                fontSize: '1rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.03em'
                            }}>
                                <span className="material-symbols-outlined" style={{fontSize: '24px'}}>segment</span>
                                {strings.table_of_contents || "Table of Contents"}
                            </div>
                            <ul style={{
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px'
                            }}>
                                {headers.map(h => (
                                    <li key={h.id}>
                                        <button onClick={() => scrollToSection(h.id)} style={{
                                            background: 'none',
                                            border: 'none',
                                            textAlign: 'left',
                                            cursor: 'pointer',
                                            color: 'var(--md-sys-color-on-surface-variant)',
                                            fontSize: '0.95rem',
                                            fontWeight: 500,
                                            padding: 0,
                                            transition: 'color 0.2s',
                                            lineHeight: 1.4
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
 * Component to view changelog history and specific versions interactively.
 * @param {Object} props
 * @param {string} props.markdownContent - Raw markdown text containing changelog data.
 * @param {Object} props.appConfig - Configuration object for the target application.
 * @param {Object} props.strings - Localized string mappings.
 * @param {Function} props.onNavigate - Callback function to trigger internal routing.
 * @returns {JSX.Element}
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

    const [hideOnScroll, setHideOnScroll] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const containerRef = useRef(null);
    const lastScrollY = useRef(0);

    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1000);
    const [searchPortalNode, setSearchPortalNode] = useState(null);
    const [bottomPortalNode, setBottomPortalNode] = useState(null);

    const isCompass = appConfig?.appName?.toLowerCase().includes('compass');
    const isPulse = appConfig?.appName?.toLowerCase().includes('pulse');
    const isPortfolio = appConfig?.appId === 'io.github.fertwbr.portfolio' || !appConfig?.playStoreLink;
    const betaLink = appConfig?.playStoreLink?.replace('/store/apps/details?id=', '/apps/testing/') || appConfig?.playStoreLink;
    const hasWearApp = isCompass || isPulse;

    const isFullScreenMode = !!versionId;

    useEffect(() => {
        const interval = setInterval(() => {
            const searchNode = document.getElementById('appbar-search-portal');
            const bottomNode = document.getElementById('appbar-bottom-portal');
            if (searchNode || bottomNode) {
                if (searchNode) setSearchPortalNode(searchNode);
                if (bottomNode) setBottomPortalNode(bottomNode);
                if (searchNode && bottomNode) clearInterval(interval);
            }
        }, 100);

        const handleResize = () => {
            const activeElement = document.activeElement;
            const isInputFocused = activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA');
            if (isInputFocused) return;
            setIsDesktop(window.innerWidth > 1000);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        setMarkdown(initialMarkdown);
    }, [initialMarkdown]);

    useEffect(() => {
        if (markdown) {
            setIsAiTranslated(markdown.includes(''));
            setVersions(parseChangelog(markdown));
        }
    }, [markdown]);

    useEffect(() => {
        const handleScroll = () => {
            if (isFullScreenMode) return;
            const currentScrollY = Math.max(0, window.scrollY);

            setIsSticky(currentScrollY > 150);

            const activeElement = document.activeElement;
            const isInputFocused = activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA');

            const documentHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;
            const isAtBottom = currentScrollY + windowHeight >= documentHeight - 60;

            if (currentScrollY <= 0 || isInputFocused) {
                setHideOnScroll(false);
            } else if (isAtBottom) {
                setHideOnScroll(true);
            } else if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
                setHideOnScroll(true);
            } else if (currentScrollY < lastScrollY.current) {
                setHideOnScroll(false);
            }

            lastScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll, {passive: true});
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isFullScreenMode]);

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

    const handleViewAll = () => {
        if (isCompass) navigate('/pixelcompass/changelog');
        else if (isPulse) navigate('/pixelpulse/changelog');
        else navigate('/changelog');
    };

    const handleOpenSingle = (id) => {
        const basePath = isCompass ? '/pixelcompass' : isPulse ? '/pixelpulse' : '';
        navigate(`${basePath}/changelog/${id}`);
    };

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
        filteredVersions.map(v => {
            const style = getTagStyle(v.type);
            return (
                <button key={v.id} onClick={() => scrollToVersion(v.id)}
                        className={`toc-pill-btn ${activeId === v.id ? 'active' : 'inactive'}`}>
                    <span className="toc-pill-text">
                        {v.version.replace('Version ', '')}
                    </span>
                    {v.type !== 'stable' && (
                        <span style={{
                            fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px',
                            background: style.bg, color: style.color
                        }}>
                            {v.type === 'rc' ? 'RC' : v.type.substring(0, 1).toUpperCase()}
                        </span>
                    )}
                </button>
            )
        })
    );

    const desktopSearchInput = isDesktop && !isFullScreenMode ? (
        <div style={{position: 'relative', width: '100%'}}>
            <span className="material-symbols-outlined search-icon-absolute">search</span>
            <input
                type="text"
                className="desktop-search-input"
                placeholder={strings.changelog?.search_placeholder || "Search updates..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    ) : null;

    const desktopFilters = isDesktop && !isFullScreenMode && allTags.length > 0 ? (
        <div style={{
            display: 'flex', gap: '8px', width: '100%',
            overflowX: 'auto', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch',
            justifyContent: 'center'
        }}>
            {allTags.map(tag => {
                const isSelected = selectedTags.includes(tag);
                return (
                    <button
                        key={`desk-${tag}`} onClick={() => toggleTag(tag)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '16px',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            background: isSelected ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-surface-container-high)',
                            color: isSelected ? 'var(--md-sys-color-on-primary)' : 'var(--md-sys-color-on-surface-variant)',
                            border: isSelected ? '1px solid var(--md-sys-color-primary)' : '1px solid var(--md-sys-color-outline-variant)',
                            transition: 'all 0.2s',
                            whiteSpace: 'nowrap',
                            flexShrink: 0
                        }}
                    >
                        {tag}
                    </button>
                );
            })}
        </div>
    ) : null;

    return (
        <div className="viewer-container">
            {desktopSearchInput && searchPortalNode && createPortal(desktopSearchInput, searchPortalNode)}
            {desktopFilters && bottomPortalNode && createPortal(desktopFilters, bottomPortalNode)}

            <AnimatePresence>
                {showTranslateInfo && (
                    <div style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)'
                    }}>
                        <motion.div
                            initial={{scale: 0.9, opacity: 0}} animate={{scale: 1, opacity: 1}}
                            exit={{scale: 0.9, opacity: 0}}
                            className="glass-card"
                            style={{
                                width: '90%', maxWidth: '400px', padding: '32px', borderRadius: '32px',
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
                                    fontSize: '1.2rem',
                                    color: 'var(--md-sys-color-on-surface)'
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

            <ViewerHeader
                appName={appConfig?.appName}
                icon="history"
                title={isFullScreenMode ? `Update ${filteredVersions[0]?.version.replace('Version ', '')}` : (strings.changelog?.title || 'Changelog')}
                subtitle={!isFullScreenMode ? (strings.changelog?.subtitle || 'Track the evolution of the application.') : undefined}
                actionNode={
                    isFullScreenMode && filteredVersions.length > 0 ? (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            flexWrap: 'wrap',
                            marginTop: '8px'
                        }}>
                            <button onClick={handleViewAll} className="btn-outline"
                                    style={{padding: '8px 16px', fontSize: '0.9rem', borderRadius: '100px'}}>
                                <span className="material-symbols-outlined" style={{fontSize: '18px'}}>arrow_back</span>
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
                    ) : (
                        <div style={{display: 'flex', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap'}}>
                            <AnimatePresence>
                                {(isAiTranslated || isShowingOriginal) &&
                                    <AutoTranslateBadge isShowingOriginal={isShowingOriginal}
                                                        onClick={() => isShowingOriginal ? handleRestoreTranslation() : setShowTranslateInfo(true)}/>}
                            </AnimatePresence>
                        </div>
                    )
                }
            />

            <div className="changelog-layout viewer-layout">

                <div className="viewer-main-content">
                    {!isFullScreenMode && !isDesktop && (
                        <>
                            <div ref={containerRef} style={{
                                position: 'relative',
                                height: isSticky && window.innerWidth > 1000 ? '96px' : 'auto'
                            }}>
                                <div
                                    className={`loose-search-container ${isSticky ? 'is-sticky' : ''} ${hideOnScroll ? 'hide-on-scroll' : ''}`}
                                >
                                    <div className="mobile-blur-backdrop"></div>
                                    <div className="search-pill">
                                        <span className="material-symbols-outlined search-icon">search</span>
                                        <input
                                            type="text"
                                            placeholder={strings.changelog?.search_placeholder || "Search updates..."}
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>

                                    {allTags.length > 0 && (
                                        <div className="loose-filters">
                                            {allTags.map(tag => {
                                                const isSelected = selectedTags.includes(tag);
                                                return (
                                                    <button
                                                        key={tag} onClick={() => toggleTag(tag)}
                                                        className={`filter-tag-pill ${isSelected ? 'selected' : ''}`}
                                                    >
                                                        {tag}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mobile-toc-wrapper">
                                <PageTableOfContents title={strings.changelog?.jump_to || "Jump to"} isMobile={true}>
                                    {renderTocButtons()}
                                </PageTableOfContents>
                            </div>
                        </>
                    )}

                    <div
                        className={`changelog-list-container content-padder ${!hideOnScroll && !isFullScreenMode ? 'padded' : ''} ${isFullScreenMode ? 'full-screen' : ''}`}>
                        {!isFullScreenMode && (
                            <div className="timeline-line"></div>
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
                                padding: '40px', textAlign: 'center', color: 'var(--md-sys-color-on-surface-variant)'
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
                        <div className="load-more-container">
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
                                    letterSpacing: '0.03em',
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
                    <div className="desktop-toc-wrapper viewer-sidebar-container">
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
                                background: 'linear-gradient(135deg, rgba(var(--md-sys-color-on-surface-rgb), 0.03) 0%, transparent 100%)',
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
                                    letterSpacing: '0.03em',
                                    fontWeight: 600
                                }}>
                                    <span className="material-symbols-outlined"
                                          style={{fontSize: '18px'}}>explore</span>
                                    <span>{strings.changelog?.explore_more || "Explore More"}</span>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                                    <BetaProgramCard strings={strings.changelog?.beta_program || {}}
                                                     betaLink={betaLink}/>
                                    <WearOSCard strings={strings.changelog?.wear_os_promo || {}}
                                                isAvailable={hasWearApp} link={appConfig?.playStoreLink}/>
                                    <PlusPromoCard strings={strings.changelog?.plus_promo || {}}
                                                   onNavigate={onNavigate}/>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <BackToTop strings={strings.changelog || {}} isShifted={!hideOnScroll && !isFullScreenMode}/>
            </div>
        </div>
    );
}