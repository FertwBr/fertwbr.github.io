import { useEffect } from 'react';
import { pixelPulseConfig } from './pixel-pulse/PixelPulseConfig';

import { pixelCompassConfig } from './pixel-compass/PixelCompassConfig';

const configs = {
    'pixelpulse': pixelPulseConfig,
    'pixelcompass': pixelCompassConfig
};

export default function RedirectToStore({ type = 'open', appKey = 'pixelpulse' }) {
  const config = configs[appKey] || pixelPulseConfig;

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isAndroid = /android/i.test(userAgent);
    
    const appId = config?.appId || 'io.github.fertwbr.pixelpulse';
    const scheme = config?.scheme || 'pixelpulse';
    
    const playStoreWeb = `https://play.google.com/store/apps/details?id=${appId}`;
    const deepLinkOpen = `${scheme}://open`;
    const deepLinkBuy = `${scheme}://open/buy`;
    
    if (isAndroid) {
      const deepLink = type === 'buy' ? deepLinkBuy : deepLinkOpen;
      
      window.location.href = deepLink;
      
      setTimeout(() => {
        if (!document.hidden) {
            window.location.href = playStoreWeb;
        }
      }, 1000);
    } else {
      window.location.href = playStoreWeb;
    }
  }, [type, config]);

  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '24px' }}>
      <span className="material-symbols-outlined spin-anim" style={{ fontSize: '48px', color: 'var(--md-sys-color-primary)' }}>sync</span>
      <p style={{ color: 'var(--md-sys-color-on-surface)', fontSize: '1.1rem' }}>Redirecting to Store...</p>
    </div>
  );
}