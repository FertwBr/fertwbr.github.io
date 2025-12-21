import React, {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

export default function BackToTop({tooltip}) {
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
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: 0.8}}
                    onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}
                    style={{
                        position: 'fixed', bottom: '30px', right: '30px', zIndex: 99,
                        width: '56px', height: '56px', borderRadius: '16px',
                        background: 'var(--md-sys-color-primary)', border: 'none',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                        color: 'var(--md-sys-color-on-primary)', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                    title={tooltip || "Back to Top"}
                >
                    <span className="material-symbols-outlined">arrow_upward</span>
                </motion.button>
            )}
        </AnimatePresence>
    );
}