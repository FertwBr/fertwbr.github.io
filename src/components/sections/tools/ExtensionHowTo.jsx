import React, {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

/**
 * Interactive How-To section.
 * Updates a media panel based on the actively hovered or clicked step.
 *
 * @param {Object} props
 * @param {Object} props.strings
 * @param {Function} props.onNavigate
 * @returns {JSX.Element}
 */
export default function ExtensionHowTo({strings, onNavigate}) {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
            title: strings?.step_1_title || "Install the Extension",
            desc: strings?.step_1_desc || "Add Gemini Expressive to your browser from the official stores. It is lightweight and requires minimal permissions.",
            placeholderTitle: "Quick Installation",
            placeholderDesc: "Available for Chrome, Edge, and Firefox. It takes just one click to add to your browser without complicated setups.",
            icon: "extension"
        },
        {
            title: strings?.step_2_title || "Open Settings",
            desc: strings?.step_2_desc || "Click the extension icon in your browser toolbar to open the quick settings menu and customize your dashboard.",
            placeholderTitle: "Configure Your Preferences",
            placeholderDesc: "Access the modern dashboard to set your theme color, toggle productivity features, and manage your custom prompt snippets.",
            icon: "settings"
        },
        {
            title: strings?.step_3_title || "Customize & Enjoy",
            desc: strings?.step_3_desc || "Toggle your preferred features, pick your favorite Material You seed color, and open Gemini to see the magic happen.",
            placeholderTitle: "Experience the Magic",
            placeholderDesc: "Watch as the entire Gemini web interface dynamically transforms into a beautifully themed, highly productive workspace.",
            icon: "auto_awesome"
        }
    ];

    return (
        <section className="howto-section">
            <div className="howto-header">
                <h2 className="howto-title">
                    {strings?.howto_title || "How to Get Started"}
                </h2>
                <p className="howto-subtitle">
                    {strings?.howto_subtitle || "Up and running in less than a minute."}
                </p>
            </div>

            <div className="howto-interactive-container">
                <div className="howto-steps-list">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`howto-step-interactive ${activeStep === index ? 'active' : ''}`}
                            onMouseEnter={() => setActiveStep(index)}
                            onClick={() => setActiveStep(index)}
                        >
                            <div className="howto-step-number">{index + 1}</div>
                            <div className="howto-step-content">
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="howto-media-panel">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeStep}
                            initial={{opacity: 0, scale: 0.95}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 1.05}}
                            transition={{duration: 0.3}}
                            className="howto-media-panel-inner"
                        >
                            <span className="material-symbols-outlined howto-media-icon">
                                {steps[activeStep].icon}
                            </span>
                            <h3 className="howto-media-title">
                                {steps[activeStep].placeholderTitle}
                            </h3>
                            <p className="howto-media-desc">
                                {steps[activeStep].placeholderDesc}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <div className="howto-footer">
                <button
                    className="btn-outline"
                    onClick={() => onNavigate && onNavigate('help')}
                >
                    <span className="material-symbols-outlined">help</span>
                    {strings?.read_full_guide || "Read the Full Guide"}
                </button>
            </div>
        </section>
    );
}