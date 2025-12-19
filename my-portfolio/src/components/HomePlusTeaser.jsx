import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { loadPageContent } from '../utils/contentLoader';

const parsePlusTeaserData = (markdown) => {
  if (!markdown) return null;

  const titleMatch = markdown.match(/^# (.*?) \{/m) || markdown.match(/^# (.*)/m);
  const title = titleMatch ? titleMatch[1].trim() : '';

  const sections = markdown.split(/^## /m);

  const introText = sections[0].replace(/^# .*$/m, '').trim();

  const featuresSection = sections.find(s => s.includes('data-toc-key="features"'));
  const features = [];

  if (featuresSection) {
    const tableRows = featuresSection.match(/\|\s*<md-icon>(.*?)<\/md-icon>\s*\*\*(.*?)\*\*\s*\|\s*(.*?)\s*\|/g);

    if (tableRows) {
      tableRows.slice(0, 4).forEach(row => {
        const match = row.match(/\|\s*<md-icon>(.*?)<\/md-icon>\s*\*\*(.*?)\*\*\s*\|\s*(.*?)\s*\|/);

        if (match) {
          const icon = match[1];
          const featureTitle = match[2];
          let description = match[3];

          description = description.replace(/\*\*(.*?)\*\*/g, '$1');

          features.push({
            icon: icon,
            title: featureTitle,
            desc: description
          });
        }
      });
    }
  }

  return {
    title,
    desc: introText,
    features
  };
};

export default function HomePlusTeaser({ appConfig, strings, onNavigate }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        if (!appConfig?.pages?.plus) return;

        const markdown = await loadPageContent('plus', appConfig);

        if (isMounted && markdown) {
          const parsedData = parsePlusTeaserData(markdown);
          setData(parsedData);
        }
      } catch (error) {
        console.error("Error loading Plus teaser data:", error);
      }
    };

    loadData();

    return () => { isMounted = false; };
  }, [appConfig]);

  const displayTitle = data?.title || strings.title;
  const displayDesc = data?.desc || strings.desc;

  const defaultItems = [
    { icon: 'shield', title: 'Noise Budget', desc: 'WHO-based weekly tracking' },
    { icon: 'notifications_active', title: 'Proactive Alerts', desc: 'Get notified before damage' },
    { icon: 'auto_awesome', title: 'Auto Monitoring', desc: 'Background exposure tracking' },
    { icon: 'table_chart', title: 'CSV Export', desc: 'Full data ownership' }
  ];

  const displayFeatures = (data?.features && data.features.length > 0)
    ? data.features
    : defaultItems;

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      style={{
        borderRadius: '40px',
        background: 'linear-gradient(180deg, var(--md-sys-color-primary-container) 0%, var(--md-sys-color-surface) 100%)',
        border: '1px solid var(--md-sys-color-outline-variant)',
        padding: '60px 24px',
        textAlign: 'center',
        marginBottom: '120px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ position: 'relative', zIndex: 2 }}>
        <span className="material-symbols-outlined" style={{ fontSize: '56px', color: 'var(--md-sys-color-primary)', marginBottom: '24px' }}>diamond</span>

        <h2 style={{ fontSize: 'clamp(2.2rem, 7vw, 3.5rem)', marginBottom: '20px', lineHeight: 1.1 }}>
          {displayTitle}
        </h2>

        <p style={{ fontSize: 'clamp(1.1rem, 4vw, 1.3rem)', color: 'var(--md-sys-color-on-surface-variant)', maxWidth: '700px', margin: '0 auto 48px' }}>
          {displayDesc}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '24px', maxWidth: '1000px', margin: '0 auto 48px auto', textAlign: 'left' }}>
          {displayFeatures.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--md-sys-color-primary)', fontSize: '24px', flexShrink: 0 }}>
                {item.icon}
              </span>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '4px', fontWeight: 700 }}>{item.title}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--md-sys-color-on-surface-variant)', lineHeight: 1.4 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => onNavigate('plus')} className="btn-glow" style={{ fontSize: '1.1rem', padding: '16px 36px' }}>
          {strings.cta}
        </button>
      </div>
    </motion.section>
  );
}