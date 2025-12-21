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
        <aside style={{
            width: '300px',
            position: 'sticky',
            top: '120px',
            height: 'fit-content',
            maxHeight: 'calc(100vh - 140px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            flexShrink: 0
        }}>
            <div className="glass-card" style={{
                padding: '0',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                minHeight: 0,
                overflow: 'hidden'
            }}>
                <div style={{padding: '20px', borderBottom: '1px solid var(--md-sys-color-outline-variant)'}}>
                    <h3 style={{
                        fontSize: '0.85rem',
                        textTransform: 'uppercase',
                        color: 'var(--md-sys-color-on-surface-variant)',
                        letterSpacing: '1px',
                        fontWeight: 700,
                        margin: 0
                    }}>
                        {title}
                    </h3>
                </div>
                <div style={{
                    overflowY: 'auto',
                    padding: '8px 4px',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px'
                }}>
                    {children}
                </div>
            </div>
        </aside>
    );
}