import React, {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

/**
 * A table of contents component to navigate within long pages.
 * Supports a collapsible mode for mobile layouts.
 *
 * @param {Object} props
 * @param {string} props.title - The title of the Table of Contents.
 * @param {React.ReactNode} props.children - The TOC links or content.
 * @param {boolean} props.isMobile - Whether the component should render in the collapsible mobile mode.
 * @returns {JSX.Element}
 */
export default function PageTableOfContents({title, children, isMobile}) {
    const [isOpen, setIsOpen] = useState(false);

    const displayTitle = title || "Table of Contents";

    if (isMobile) {
        return (
            <div style={{marginBottom: '32px'}}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="toc-mobile-btn"
                >
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <span className="material-symbols-outlined"
                              style={{fontSize: '22px', color: 'var(--md-sys-color-primary)'}}>
                            list
                        </span>
                        <span style={{
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            letterSpacing: '0.02em',
                            color: 'var(--md-sys-color-on-surface)'
                        }}>
                            {displayTitle}
                        </span>
                    </div>

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
                            className="toc-mobile-dropdown"
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
            className="toc-desktop-card"
            initial={{opacity: 0, y: 8}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.35, ease: [0.2, 0, 0, 1]}}
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
                    {displayTitle}
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