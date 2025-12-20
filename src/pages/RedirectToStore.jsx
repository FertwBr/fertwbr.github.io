import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { pixelPulseConfig } from './pixel-pulse/PixelPulseConfig';
import { pixelCompassConfig } from './pixel-compass/PixelCompassConfig';
import { useLanguage } from '../context/LanguageContext';
import PageBackground from '../components/layout/PageBackground';

const configs = {
  'pixelpulse': pixelPulseConfig,
  'pixelcompass': pixelCompassConfig
};

export default function RedirectToStore({ type = 'open', appKey = 'pixelpulse' }) {
  const config = configs[appKey] || pixelPulseConfig;
  const [status, setStatus] = useState('attempting');
  const { content } = useLanguage();

  useEffect(() => {
    document.documentElement.style.setProperty('--md-sys-color-primary', config.seedColor);

    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isAndroid = /android/i.test(userAgent);
    const appId = config?.appId;
    const scheme = config?.scheme;

    const fallbackUrl = `market://details?id=${appId}`;
    const encodedFallback = encodeURIComponent(fallbackUrl);

    const hostPath = type === 'buy' ? 'open/buy' : 'open';
    const androidIntent = `intent://${hostPath}#Intent;scheme=${scheme};package=${appId};S.browser_fallback_url=${encodedFallback};end`;
    const playStoreWeb = `https://play.google.com/store/apps/details?id=${appId}`;

    if (isAndroid) {
      window.location.href = androidIntent;
      setTimeout(() => {
        if (!document.hidden) {
          setStatus('manual');
        }
      }, 1000);
    } else {
      setTimeout(() => window.location.href = playStoreWeb, 1000);
    }
  }, [type, config]);

  return (
    <div style={{
      height: '100dvh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--md-sys-color-surface)',
      color: 'var(--md-sys-color-on-surface)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <PageBackground opacity={0.5} />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="glass-card"
        style={{
          padding: '40px',
          maxWidth: '400px',
          width: '90%',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          border: '1px solid var(--md-sys-color-outline-variant)'
        }}
      >
        <img
          src={config.appIcon}
          alt={config.appName}
          style={{ width: '80px', height: '80px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
        />

        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '8px', fontWeight: 700 }}>{config.appName}</h1>
          <p style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
            {status === 'attempting' ? content.redirect.launching : content.redirect.did_open}
          </p>
        </div>

        {status === 'attempting' ? (
          <span className="material-symbols-outlined spin-anim" style={{ fontSize: '32px', color: 'var(--md-sys-color-primary)', opacity: 0.7 }}>sync</span>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
            <a href={type === 'buy' ? `${config.scheme}://open/buy` : `${config.scheme}://open`} className="btn-glow" style={{ width: '100%', justifyContent: 'center' }}>
              {content.redirect.open_again}
            </a>
            <a href={config.playStoreLink} target="_blank" rel="noreferrer" className="btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
              {content.redirect.get_on_store}
            </a>
          </div>
        )}
      </motion.div>
    </div>
  );
}