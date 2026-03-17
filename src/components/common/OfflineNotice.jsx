import React, {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {useLanguage} from '../../context/LanguageContext';

/**
 * A notification that appears when the user loses their internet connection.
 * @returns {JSX.Element}
 */
export default function OfflineNotice() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const {content} = useLanguage();

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
                    initial={{y: 100, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    exit={{y: 100, opacity: 0}}
                    className="offline-notice-wrapper"
                >
                    <div className="offline-notice-content">
                        <span className="material-symbols-outlined"
                              style={{color: 'var(--md-sys-color-error)'}}>wifi_off</span>
                        <span style={{fontSize: '0.9rem', fontWeight: 500}}>
              {content.common?.offline || "You are currently offline."}
            </span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}