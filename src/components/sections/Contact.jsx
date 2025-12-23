import React from 'react';
import {motion} from "framer-motion";
import {SiteConfig} from '../../utils/siteConstants';

/**
 * Contact section component.
 * Displays contact call-to-action with email and social links.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.strings - Translations object.
 * @returns {JSX.Element} The Contact section.
 */
export default function Contact({strings}) {
    return (
        <section id="contact" style={{
            padding: 'clamp(40px, 8vw, 60px) 20px',
            background: 'var(--md-sys-color-surface-container)',
            borderRadius: '32px',
            margin: '0 16px 40px 16px',
            textAlign: 'center',
            boxSizing: 'border-box',
            overflow: 'hidden'
        }}>
            <motion.div
                initial={{opacity: 0, scale: 0.95}}
                whileInView={{opacity: 1, scale: 1}}
                transition={{duration: 0.5}}
                viewport={{once: true}}
                style={{maxWidth: '100%', margin: '0 auto'}}
            >
        <span className="material-symbols-outlined" style={{
            fontSize: '48px',
            color: 'var(--md-sys-color-primary)',
            marginBottom: '16px'
        }}>
          mail
        </span>

                <h2 style={{
                    fontSize: 'clamp(1.5rem, 5vw, 2rem)',
                    marginBottom: '16px',
                    color: 'var(--md-sys-color-on-surface)'
                }}>
                    {strings.contact.title}
                </h2>

                <p style={{
                    maxWidth: '500px',
                    margin: '0 auto 32px auto',
                    color: 'var(--md-sys-color-on-surface-variant)',
                    fontSize: 'clamp(1rem, 4vw, 1.1rem)',
                    lineHeight: '1.5'
                }}>
                    {strings.contact.desc}
                </p>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '12px',
                    flexWrap: 'wrap',
                    width: '100%'
                }}>
                    <a href={SiteConfig.links.mailTo} style={{
                        padding: '12px 24px',
                        borderRadius: '100px',
                        background: 'var(--md-sys-color-primary)',
                        color: 'var(--md-sys-color-on-primary)',
                        fontWeight: '600',
                        textDecoration: 'none',
                        fontSize: '0.95rem',
                        flex: '1 1 auto',
                        maxWidth: '200px'
                    }}>
                        {strings.contact.email}
                    </a>

                    <a href={SiteConfig.links.linkedin} target="_blank" rel="noreferrer" style={{
                        padding: '12px 24px',
                        borderRadius: '100px',
                        border: '1px solid var(--md-sys-color-outline)',
                        color: 'var(--md-sys-color-primary)',
                        fontWeight: '600',
                        textDecoration: 'none',
                        fontSize: '0.95rem',
                        flex: '1 1 auto',
                        maxWidth: '200px'
                    }}>
                        {strings.contact.linkedin}
                    </a>
                </div>
            </motion.div>
        </section>
    );
}