import React from 'react';
import { motion } from 'framer-motion';

/**
 * Renders an animated loading spinner.
 * @returns {JSX.Element}
 */
export default function Spinner() {
    return (
        <div className="spinner-wrapper">
            <div className="spinner-graphics-container">
                <motion.div
                    className="spinner-outer-ring"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 180, 270, 360],
                        borderRadius: ["50%", "24px", "8px", "24px", "50%"],
                        backgroundColor: [
                            "var(--md-sys-color-primary-container)",
                            "var(--md-sys-color-tertiary-container)",
                            "var(--md-sys-color-secondary-container)",
                            "var(--md-sys-color-primary-container)",
                            "var(--md-sys-color-primary-container)"
                        ]
                    }}
                    transition={{
                        duration: 3,
                        ease: [0.2, 0, 0, 1],
                        times: [0, 0.25, 0.5, 0.75, 1],
                        repeat: Infinity
                    }}
                />

                <motion.div
                    className="spinner-inner-dot"
                    animate={{
                        scale: [0.5, 0.8, 0.5],
                        borderRadius: ["50%", "12px", "50%"],
                        backgroundColor: [
                            "var(--md-sys-color-on-primary-container)",
                            "var(--md-sys-color-on-tertiary-container)",
                            "var(--md-sys-color-on-primary-container)"
                        ]
                    }}
                    transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                        times: [0, 0.5, 1],
                        repeat: Infinity
                    }}
                />
            </div>

            <div className="spinner-dots-row">
                {[0, 1, 2].map((index) => (
                    <motion.div
                        key={index}
                        className="spinner-small-dot"
                        animate={{
                            scale: [0.6, 1, 0.6],
                            backgroundColor: [
                                'var(--md-sys-color-surface-variant)',
                                'var(--md-sys-color-primary)',
                                'var(--md-sys-color-surface-variant)'
                            ]
                        }}
                        transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: [0.2, 0, 0, 1],
                            delay: index * 0.15
                        }}
                    />
                ))}
            </div>
        </div>
    );
}