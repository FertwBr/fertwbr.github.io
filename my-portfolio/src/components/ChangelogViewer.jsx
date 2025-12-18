import React, { useState, useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { motion, AnimatePresence } from 'framer-motion';
import { parseChangelog } from '../utils/changelogParser';

const VersionBadge = ({ type, text }) => {
  const config = {
    stable: { bg: 'var(--md-sys-color-primary)', color: 'var(--md-sys-color-on-primary)', border: 'transparent' },
    beta: { bg: 'rgba(255, 183, 77, 0.15)', color: '#FFB74D', border: '#FFB74D' },
    alpha: { bg: 'rgba(239, 83, 80, 0.15)', color: '#EF5350', border: '#EF5350' },
    rc: { bg: 'rgba(171, 71, 188, 0.15)', color: '#AB47BC', border: '#AB47BC' },
    'pre-release': { bg: 'rgba(79, 195, 247, 0.15)', color: '#4FC3F7', border: '#4FC3F7' }
  };

  const style = config[type] || config.stable;

  return (
    <span style={{
      fontSize: '0.65rem',
      fontWeight: 700,
      padding: '4px 8px',
      borderRadius: '6px',
      background: style.bg,
      color: style.color,
      border: `1px solid ${style.border}`,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      display: 'inline-flex',
      alignItems: 'center',
      whiteSpace: 'nowrap'
    }}>
      {text || type}
    </span>
  );
};

const BackToTop = ({ strings, seedColor }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: 'fixed', bottom: '30px', right: '30px', zIndex: 99,
            width: '56px', height: '56px', borderRadius: '16px',
            background: seedColor, border: 'none',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            color: '#fff', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
          title={strings.back_to_top}
        >
          <span className="material-symbols-outlined">arrow_upward</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const ChangelogItem = ({ v, index, isActive, seedColor, strings }) => {
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <motion.div
      id={`ver-${v.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      style={{ marginBottom: '40px', position: 'relative' }}
    >
      <div style={{
        position: 'absolute', left: '-46px', top: '24px',
        width: '14px', height: '14px', borderRadius: '50%',
        background: v.type === 'stable' ? seedColor : 'var(--md-sys-color-surface)',
        border: `3px solid ${v.type === 'stable' ? seedColor : v.type === 'beta' ? '#FFB74D' : v.type === 'alpha' ? '#EF5350' : '#AB47BC'}`,
        zIndex: 2,
        boxShadow: `0 0 0 4px var(--md-sys-color-surface)`
      }} />

      <div
        className="glass-card"
        style={{
          borderRadius: '24px',
          border: isActive ? `1px solid ${seedColor}80` : '1px solid var(--md-sys-color-outline-variant)',
          overflow: 'hidden',
          transition: 'border-color 0.3s'
        }}
      >
        <div
          onClick={() => setIsOpen(!isOpen)}
          style={{
            padding: '24px',
            cursor: 'pointer',
            background: isOpen ? 'rgba(255,255,255,0.02)' : 'transparent',
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, letterSpacing: '-0.5px' }}>
                {v.version.replace('Version ', '')}
              </h2>
              <div style={{ display: 'flex', gap: '6px' }}>
                <VersionBadge type={v.type} />
                {v.tags.filter(t => t === 'Wear OS' || t === 'Android XR').map(tag => (
                  <VersionBadge key={tag} type="stable" text={tag} />
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--md-sys-color-on-surface-variant)', fontSize: '0.9rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>calendar_today</span>
              {strings.released} {v.date}
            </div>
          </div>

          <span
            className="material-symbols-outlined"
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s',
              color: 'var(--md-sys-color-on-surface-variant)'
            }}
          >
            expand_more
          </span>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ padding: '0 24px 24px 24px' }}>
                <div style={{ width: '100%', height: '1px', background: 'var(--md-sys-color-outline-variant)', opacity: 0.3, marginBottom: '24px' }}></div>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
                  {v.tags.filter(t => !['Wear OS', 'Android XR', 'Beta', 'Alpha', 'RC'].includes(t)).map(tag => (
                    <span key={tag} style={{
                      fontSize: '0.75rem', padding: '4px 10px', borderRadius: '100px',
                      background: 'var(--md-sys-color-surface-container-high)',
                      color: 'var(--md-sys-color-on-surface-variant)',
                      border: '1px solid var(--md-sys-color-outline-variant)',
                      fontWeight: 500
                    }}>
                      {tag}
                    </span>
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

export default function ChangelogViewer({ markdownContent, seedColor, appConfig, strings, onNavigate }) {
  const [versions, setVersions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(10);
  const [activeId, setActiveId] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);

  useEffect(() => {
    if (markdownContent) {
      setVersions(parseChangelog(markdownContent));
    }
  }, [markdownContent]);

  const allTags = useMemo(() => {
    const tags = new Set();
    versions.forEach(v => v.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, [versions]);

  const filteredVersions = useMemo(() => {
    return versions.filter(v => {
      const matchesSearch = !searchQuery ||
        v.version.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.content.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTags = selectedTags.length === 0 ||
        selectedTags.every(t => v.tags.includes(t));

      return matchesSearch && matchesTags;
    });
  }, [versions, searchQuery, selectedTags]);

  const latestVersion = versions[0];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id.replace('ver-', ''));
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    filteredVersions.slice(0, visibleCount).forEach((v) => {
      const el = document.getElementById(`ver-${v.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [filteredVersions, visibleCount]);

  const scrollToVersion = (id) => {
    setIsMobileTocOpen(false);

    const targetIndex = filteredVersions.findIndex(v => v.id === id);

    if (targetIndex !== -1) {
      if (targetIndex >= visibleCount) {
        setVisibleCount(targetIndex + 5);

        setTimeout(() => {
          const element = document.getElementById(`ver-${id}`);
          if (element) {
            const offset = 120;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          }
        }, 300);
      } else {
        const element = document.getElementById(`ver-${id}`);
        if (element) {
          const offset = 120;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }
    }
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  return (
    <div style={{ minHeight: '100vh' }}>

      <div style={{ marginBottom: '60px', paddingBottom: '30px', borderBottom: '1px solid var(--md-sys-color-outline-variant)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--md-sys-color-on-surface-variant)', fontSize: '0.95rem', fontWeight: 500 }}>
          <span>{appConfig?.appName}</span>
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: seedColor, fontWeight: 700 }}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>history</span>
            <span>Changelog</span>
          </div>
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
          {strings.changelog.title}
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--md-sys-color-on-surface-variant)', marginTop: '12px', maxWidth: '700px' }}>
          {strings.changelog.subtitle}
        </p>
      </div>

      <div className="changelog-layout" style={{ display: 'flex', gap: '60px', alignItems: 'flex-start' }}>

        <div style={{ flex: 1, minWidth: 0 }}>

          <div style={{ marginBottom: '40px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ position: 'relative' }}>
              <span className="material-symbols-outlined" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--md-sys-color-on-surface-variant)' }}>search</span>
              <input
                type="text"
                placeholder={strings.changelog.search_placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%', padding: '16px 16px 16px 50px',
                  background: 'rgba(var(--md-sys-color-surface-container-high-rgb), 0.5)',
                  border: '1px solid var(--md-sys-color-outline-variant)',
                  borderRadius: '16px',
                  color: 'var(--md-sys-color-on-surface)',
                  fontSize: '1rem', outline: 'none'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  style={{
                    padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500,
                    background: selectedTags.includes(tag) ? `${seedColor}20` : 'transparent',
                    color: selectedTags.includes(tag) ? seedColor : 'var(--md-sys-color-on-surface-variant)',
                    border: `1px solid ${selectedTags.includes(tag) ? seedColor : 'var(--md-sys-color-outline-variant)'}`,
                    transition: 'all 0.2s'
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="mobile-toc-trigger" style={{ display: 'none', marginBottom: '32px' }}>
            <button
              onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
              className="glass-card"
              style={{
                width: '100%', padding: '16px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                cursor: 'pointer',
                border: '1px solid var(--md-sys-color-outline-variant)',
                color: 'var(--md-sys-color-on-surface)'
              }}
            >
              <span style={{ fontWeight: 600 }}>{strings.changelog.jump_to}</span>
              <span className="material-symbols-outlined">{isMobileTocOpen ? 'expand_less' : 'expand_more'}</span>
            </button>
            <AnimatePresence>
              {isMobileTocOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="glass-card"
                  style={{ marginTop: '8px', overflow: 'hidden', border: '1px solid var(--md-sys-color-outline-variant)' }}
                >
                  <div style={{ maxHeight: '300px', overflowY: 'auto', padding: '0' }}>
                    {filteredVersions.map(v => (
                      <button
                        key={v.id}
                        onClick={() => scrollToVersion(v.id)}
                        style={{
                          display: 'flex', width: '100%', textAlign: 'left',
                          padding: '12px 16px',
                          background: 'transparent', border: 'none',
                          color: 'var(--md-sys-color-on-surface)',
                          borderBottom: '1px solid var(--md-sys-color-outline-variant)',
                          justifyContent: 'space-between', alignItems: 'center'
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{v.version.replace('Version ', '')}</span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--md-sys-color-on-surface-variant)' }}>{v.date}</span>
                        </div>
                        {v.type !== 'stable' && (
                          <VersionBadge type={v.type} />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div style={{ position: 'relative', paddingLeft: '40px' }}>
            <div style={{ position: 'absolute', left: '11px', top: 0, bottom: 0, width: '2px', background: 'var(--md-sys-color-outline-variant)', opacity: 0.3 }}></div>

            {filteredVersions.length > 0 ? (
              filteredVersions.slice(0, visibleCount).map((v, index) => (
                <ChangelogItem
                  key={v.id}
                  v={v}
                  index={index}
                  isActive={activeId === v.id}
                  seedColor={seedColor}
                  strings={strings.changelog}
                />
              ))
            ) : (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--md-sys-color-on-surface-variant)' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>search_off</span>
                <p>{strings.changelog.no_results}</p>
              </div>
            )}
          </div>

          {visibleCount < filteredVersions.length && (
            <div style={{ textAlign: 'center', marginTop: '40px', paddingBottom: '20px', paddingLeft: '40px' }}>
              <button
                onClick={() => setVisibleCount(prev => prev + 10)}
                className="btn-outline"
                style={{ width: '100%', padding: '16px', borderRadius: '16px', borderStyle: 'dashed', opacity: 0.7 }}
              >
                {strings.changelog.load_more} ({filteredVersions.length - visibleCount})
              </button>
            </div>
          )}
        </div>

        <aside
          className="desktop-toc"
          style={{
            width: '320px',
            position: 'sticky',
            top: '120px',
            height: 'fit-content',
            maxHeight: 'calc(100vh - 140px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            flexShrink: 0
          }}
        >
          {latestVersion && !searchQuery && (
            <div className="glass-card" style={{ padding: '24px', background: `linear-gradient(135deg, ${seedColor}15, rgba(255,255,255,0.02))`, flexShrink: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: seedColor, fontWeight: 800 }}>{strings.changelog.latest_release}</span>
                <VersionBadge type={latestVersion.type} />
              </div>

              <h3 style={{ fontSize: '1.8rem', margin: '0 0 4px 0' }}>{latestVersion.version.replace('Version ', '')}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '20px' }}>{strings.changelog.released} {latestVersion.date}</p>

              <a
                href={appConfig?.playStoreLink}
                target="_blank"
                className="btn-glow"
                style={{ width: '100%', justifyContent: 'center', background: seedColor }}
              >
                {strings.changelog.update_now} <span className="material-symbols-outlined">system_update</span>
              </a>
            </div>
          )}

          <div className="glass-card" style={{ padding: '0', display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid var(--md-sys-color-outline-variant)' }}>
              <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--md-sys-color-on-surface-variant)', letterSpacing: '1px', fontWeight: 700, margin: 0 }}>
                {strings.changelog.on_this_page}
              </h3>
            </div>

            <div style={{ overflowY: 'auto', padding: '8px 4px', flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {filteredVersions.map(v => (
                  <button
                    key={v.id}
                    onClick={() => scrollToVersion(v.id)}
                    style={{
                      background: activeId === v.id ? 'rgba(255,255,255,0.05)' : 'transparent',
                      border: 'none',
                      textAlign: 'left',
                      padding: '10px 16px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      color: activeId === v.id ? seedColor : 'var(--md-sys-color-on-surface-variant)',
                      fontSize: '0.9rem',
                      transition: 'all 0.2s',
                      fontWeight: activeId === v.id ? 600 : 400,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderLeft: activeId === v.id ? `3px solid ${seedColor}` : '3px solid transparent'
                    }}
                  >
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>
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
                ))}
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%)', flexShrink: 0 }}>
            <h4 style={{ fontSize: '1rem', margin: '0 0 8px 0', color: 'var(--md-sys-color-on-surface)' }}>
              {strings.changelog.plus_promo.title}
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '16px', lineHeight: 1.4 }}>
              {strings.changelog.plus_promo.subtitle}
            </p>
            <button
              onClick={() => onNavigate && onNavigate('plus')}
              className="btn-outline"
              style={{ width: '100%', justifyContent: 'center', padding: '10px' }}
            >
              {strings.changelog.plus_promo.cta}
            </button>
          </div>

        </aside>

        <BackToTop strings={strings.changelog} seedColor={seedColor} />

        <style>{`
          @media (max-width: 1000px) {
            .desktop-toc { display: none !important; }
            .changelog-layout { display: block !important; }
            .mobile-toc-trigger { display: block !important; }
          }
          .markdown-body h4 { font-size: 1.2rem; margin-top: 1.5em; margin-bottom: 0.8em; color: var(--md-sys-color-on-surface); display: flex; alignItems: center; gap: 8px; }
          .markdown-body ul { padding-left: 1.2em; list-style-type: disc; color: var(--md-sys-color-on-surface-variant); }
          .markdown-body li { margin-bottom: 0.8em; }
          .markdown-body li strong { color: var(--md-sys-color-on-surface); font-weight: 600; }
        `}</style>
      </div>
    </div>
  );
}