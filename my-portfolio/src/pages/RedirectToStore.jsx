import { useEffect } from 'react';

export default function RedirectToStore({ type = 'open' }) {
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isAndroid = /android/i.test(userAgent);
    
    const playStoreWeb = "https://play.google.com/store/apps/details?id=io.github.fertwbr.pixelpulse";
    const deepLinkOpen = "pixelpulse://open";
    const deepLinkBuy = "pixelpulse://open/buy";
    
    if (isAndroid) {
      const deepLink = type === 'buy' ? deepLinkBuy : deepLinkOpen;
      
      window.location.href = deepLink;
      
      setTimeout(() => {
        window.location.href = playStoreWeb;
      }, 1000);
    } else {
      window.location.href = playStoreWeb;
    }
  }, [type]);

  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
      <span className="material-symbols-outlined" style={{ fontSize: '48px', animation: 'spin 1s infinite linear' }}>sync</span>
      <p>Redirecting to Pixel Pulse...</p>
    </div>
  );
}