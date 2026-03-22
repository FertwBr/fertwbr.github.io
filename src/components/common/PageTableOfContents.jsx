import React, {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

/**
 * A responsive Table of Contents component.
 * Renders an interactive dropdown on mobile devices and a static sticky card on desktops.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.title="Table of Contents"]
 * @param {boolean} [props.isMobile=false]
 * @returns {JSX.Element}
 */
export default function PageTableOfContents({children, title = "Table of Contents", isMobile = false}) {
    const [isOpen, setIsOpen] = useState(false);

    if (isMobile) {
        return (
            <div className="toc-dropdown-container" style={{ width: '100%', boxSizing: 'border-box' }}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="toc-mobile-btn"
                    style={{ width: '100%', boxSizing: 'border-box' }}
                >
                    <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                        <span className="material-symbols-outlined" style={{color: 'var(--md-sys-color-primary)'}}>
                            segment
                        </span>
                        <span style={{fontWeight: 600}}>{title}</span>
                    </div>
                    <span
                        className="material-symbols-outlined"
                        style={{
                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s cubic-bezier(0.2, 0, 0, 1)'
                        }}
                    >
                        expand_more
                    </span>
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{height: 0, opacity: 0}}
                            animate={{height: 'auto', opacity: 1}}
                            exit={{height: 0, opacity: 0}}
                            transition={{type: "spring", stiffness: 300, damping: 30}}
                            className="toc-mobile-dropdown"
                            style={{ width: '100%', boxSizing: 'border-box', overflow: 'hidden' }}
                        >
                            {children}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    return (
        <div className="toc-desktop-card" style={{ width: '100%', boxSizing: 'border-box' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '8px'
            }}>
                <span className="material-symbols-outlined"
                      style={{color: 'var(--md-sys-color-primary)', fontSize: '22px'}}>
                    segment
                </span>
                <span style={{
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: 'var(--md-sys-color-on-surface)'
                }}>
                    {title}
                </span>
            </div>

            {children}
        </div>
    );
}