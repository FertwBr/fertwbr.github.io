import React, {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

export default function BackToTop({tooltip, isShifted}) {
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
                    className={`back-to-top-btn ${isShifted ? 'shifted' : ''}`}
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: 0.8}}
                    onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}
                    title={tooltip || "Back to Top"}
                >
                    <span className="material-symbols-outlined">arrow_upward</span>
                    <style>{`
                        .back-to-top-btn {
                            position: fixed; 
                            bottom: 30px; 
                            right: 30px; 
                            z-index: 99;
                            width: 56px; 
                            height: 56px; 
                            border-radius: 16px;
                            background: var(--md-sys-color-primary); 
                            border: none;
                            box-shadow: 0 8px 24px rgba(0,0,0,0.3);
                            color: var(--md-sys-color-on-primary); 
                            cursor: pointer;
                            display: flex; 
                            align-items: center; 
                            justify-content: center;
                            transition: bottom 0.4s cubic-bezier(0.2, 0, 0, 1), transform 0.2s, background 0.2s;
                        }
                        @media (max-width: 1000px) {
                            .back-to-top-btn.shifted {
                                bottom: 180px;
                            }
                        }
                    `}</style>
                </motion.button>
            )}
        </AnimatePresence>
    );
}