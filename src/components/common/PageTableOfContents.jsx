import React, {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

export default function PageTableOfContents({title, children, isMobile}) {
    const [isOpen, setIsOpen] = useState(false);

    if (isMobile) {
        return (
            <div style={{marginBottom: '32px'}}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="glass-card"
                    style={{
                        width: '100%', padding: '16px',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        cursor: 'pointer',
                        border: '1px solid var(--md-sys-color-outline-variant)',
                        color: 'var(--md-sys-color-on-surface)'
                    }}
                >
                    <span style={{fontWeight: 600}}>{title}</span>
                    <span className="material-symbols-outlined">{isOpen ? 'expand_less' : 'expand_more'}</span>
                </button>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{height: 0, opacity: 0}}
                            animate={{height: 'auto', opacity: 1}}
                            exit={{height: 0, opacity: 0}}
                            className="glass-card"
                            style={{
                                marginTop: '8px',
                                overflow: 'hidden',
                                border: '1px solid var(--md-sys-color-outline-variant)',
                                padding: 0
                            }}
                        >
                            <div onClick={() => setIsOpen(false)}
                                 style={{maxHeight: '350px', overflowY: 'auto', padding: '8px'}}>
                                {children}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    return (
        <div className="glass-card" style={{
            width: '100%',
            padding: '24px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px'
            }}>
                <h4 style={{
                    fontSize: '1rem',
                    margin: 0,
                    color: 'var(--md-sys-color-on-surface)',
                    fontWeight: 600
                }}>
                    {title}
                </h4>
                <span className="material-symbols-outlined" style={{
                    fontSize: '18px',
                    color: 'var(--md-sys-color-on-surface-variant)'
                }}>list</span>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                maxHeight: '400px',
                overflowY: 'auto',
                paddingRight: '4px'
            }}>
                {children}
            </div>
        </div>
    );
}