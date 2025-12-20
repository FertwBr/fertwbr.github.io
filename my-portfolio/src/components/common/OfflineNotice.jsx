import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export default function OfflineNotice() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { content } = useLanguage();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '24px',
            right: '24px',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            pointerEvents: 'none'
          }}
        >
          <div style={{
            background: '#322F35',
            color: '#F5EFF7',
            padding: '12px 20px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            pointerEvents: 'auto'
          }}>
            <span className="material-symbols-outlined" style={{ color: '#FFB4AB' }}>wifi_off</span>
            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>
              {content.common?.offline || "You are currently offline."}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}