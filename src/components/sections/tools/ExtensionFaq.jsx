import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * @param {Object} props
 * @param {Object} props.strings
 * @param {Function} props.onNavigate
 * @returns {JSX.Element}
 */
export default function ExtensionFaq({ strings, onNavigate }) {
    const [openId, setOpenId] = useState(null);

    const faqs = [
        {
            id: 'q1',
            q: strings?.faq_q1 || "Is this extension free?",
            a: strings?.faq_a1 || "Yes, Gemini Expressive is completely free and open-source. There are no premium tiers or hidden paywalls."
        },
        {
            id: 'q2',
            q: strings?.faq_q2 || "Does it collect my chat data?",
            a: strings?.faq_a2 || "Absolutely not. The extension operates entirely locally on your device by modifying the DOM (the visual layout) of the Gemini website. It does not track, save, or transmit any of your conversation data."
        },
        {
            id: 'q3',
            q: strings?.faq_q3 || "Why isn't it working on Firefox Android?",
            a: strings?.faq_a3 || "Currently, Mozilla tightly controls which extensions are allowed on Firefox for Android. We are waiting for broader Add-on support before making it available on mobile."
        }
    ];

    return (
        <section className="faq-section">
            <div className="faq-header">
                <h2 className="faq-title">
                    {strings?.faq_title || "Frequently Asked Questions"}
                </h2>
            </div>

            <div className="faq-list">
                {faqs.map((faq) => {
                    const isOpen = openId === faq.id;
                    return (
                        <div key={faq.id} className="faq-item">
                            <button
                                className="faq-question"
                                onClick={() => setOpenId(isOpen ? null : faq.id)}
                            >
                                {faq.q}
                                <motion.span
                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                    className="material-symbols-outlined faq-icon"
                                >
                                    expand_more
                                </motion.span>
                            </button>
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="faq-answer-container"
                                    >
                                        <div className="faq-answer">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>

            <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'center', width: '100%' }}>
                <button
                    className="btn-outline"
                    style={{ borderRadius: '100px', padding: '14px 32px', display: 'inline-flex', gap: '12px', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}
                    onClick={() => onNavigate && onNavigate('help')}
                >
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>menu_book</span>
                    {strings?.read_full_guide || "Read Full Documentation"}
                </button>
            </div>
        </section>
    );
}