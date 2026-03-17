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
                        width: '100%',
                        padding: '18px 20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                        border: '1px solid var(--md-sys-color-outline-variant)',
                        color: 'var(--md-sys-color-on-surface)',
                        borderRadius: '20px',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                        backdropFilter: 'blur(16px)',
                        transition: 'all 0.25s cubic-bezier(.2,.8,.2,1)'
                    }}
                >
                    <span style={{
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        letterSpacing: '0.02em'
                    }}>
                        {title}
                    </span>

                    <motion.span
                        animate={{rotate: isOpen ? 180 : 0}}
                        transition={{duration: 0.25}}
                        className="material-symbols-outlined"
                        style={{
                            fontSize: '22px',
                            color: 'var(--md-sys-color-on-surface-variant)'
                        }}
                    >
                        expand_more
                    </motion.span>
                </button>

                <AnimatePresence initial={false}>
                    {isOpen && (
                        <motion.div
                            initial={{height: 0, opacity: 0}}
                            animate={{height: 'auto', opacity: 1}}
                            exit={{height: 0, opacity: 0}}
                            transition={{duration: 0.25, ease: [0.2, 0, 0, 1]}}
                            className="glass-card"
                            style={{
                                marginTop: '10px',
                                overflow: 'hidden',
                                border: '1px solid var(--md-sys-color-outline-variant)',
                                borderRadius: '20px',
                                background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))',
                                backdropFilter: 'blur(18px)',
                                padding: 0
                            }}
                        >
                            <div
                                onClick={() => setIsOpen(false)}
                                style={{
                                    maxHeight: '350px',
                                    overflowY: 'auto',
                                    padding: '10px'
                                }}
                            >
                                {children}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    return (
        <motion.div
            className="glass-card"
            initial={{opacity: 0, y: 8}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.35, ease: [0.2, 0, 0, 1]}}
            style={{
                width: '100%',
                padding: '26px',
                borderRadius: '28px',
                border: '1px solid var(--md-sys-color-outline-variant)',
                background: 'linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01))',
                backdropFilter: 'blur(20px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
                position: 'relative'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    paddingBottom: '10px',
                    borderBottom: '1px solid var(--md-sys-color-outline-variant)'
                }}
            >
                <span
                    className="material-symbols-outlined"
                    style={{
                        fontSize: '22px',
                        color: 'var(--md-sys-color-primary)'
                    }}
                >
                    list
                </span>

                <h4
                    style={{
                        fontSize: '0.98rem',
                        margin: 0,
                        color: 'var(--md-sys-color-on-surface)',
                        fontWeight: 600,
                        letterSpacing: '0.02em'
                    }}
                >
                    {title}
                </h4>
            </div>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    maxHeight: '420px',
                    overflowY: 'auto',
                    paddingRight: '6px'
                }}
            >
                {children}
            </div>
        </motion.div>
    );
}