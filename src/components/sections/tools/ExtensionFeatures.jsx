import React from 'react';
import {motion} from 'framer-motion';

/**
 * @param {Object} props
 * @param {Object} props.strings
 * @returns {JSX.Element}
 */
export default function ExtensionFeatures({strings}) {
    const features = [
        {
            id: 'timeline',
            icon: 'timeline',
            title: strings?.feature_timeline_title || "Interactive Timeline Navigation",
            desc: strings?.feature_timeline_desc || "Stop scrolling endlessly. The persistent timeline automatically maps your entire conversation, allowing you to instantly jump between your prompts and Gemini's responses with a single click. It intelligently tracks your active position as you read.",
            mediaPlaceholder: "Timeline GIF / Video Demo Goes Here"
        },
        {
            id: 'snippets',
            icon: 'keyboard_command_key',
            title: strings?.feature_snippets_title || "Prompt Snippets & Shortcuts",
            desc: strings?.feature_snippets_desc || "Save time typing repetitive instructions. Create custom shortcuts for your most used prompts. Just type your prefix (like '/') followed by your keyword, and the extension will instantly expand it into your full prompt.",
            mediaPlaceholder: "Snippets GIF / Video Demo Goes Here"
        },
        {
            id: 'theme',
            icon: 'palette',
            title: strings?.feature_theme_title || "Dynamic Material Theming",
            desc: strings?.feature_theme_desc || "Make Gemini truly yours. Select a seed color and the extension will mathematically generate a complete, accessible Material Design 3 palette, seamlessly applying it to the entire Gemini interface in both Light and Dark modes.",
            mediaPlaceholder: "Color Picker & Theme Change Demo Goes Here"
        },
        {
            id: 'code_collapse',
            icon: 'unfold_less',
            title: strings?.feature_code_title || "Smart Code Collapsing & Navigation",
            desc: strings?.feature_code_desc || "Keep your workspace clean. Automatically add 'Collapse/Expand' buttons to massive code blocks. Use the floating navigation arrows to quickly jump between different code segments in long responses.",
            mediaPlaceholder: "Code Collapse UI Screenshot Goes Here"
        },
        {
            id: 'headers',
            icon: 'terminal',
            title: strings?.feature_headers_title || "Enhanced Code Headers",
            desc: strings?.feature_headers_desc || "Instantly recognize what you're looking at. The extension detects the programming language of each block, extracts file names directly from the code context, and displays native Material icons in the header.",
            mediaPlaceholder: "Code Headers Screenshot Goes Here"
        }
    ];

    return (
        <section className="extension-features-section">
            {features.map((feature) => (
                <motion.div
                    key={feature.id}
                    className="extension-feature-card"
                    initial={{opacity: 0, y: 50}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, margin: "-100px"}}
                    transition={{duration: 0.6}}
                >
                    <div className="extension-feature-text">
                        <span className="material-symbols-outlined extension-feature-icon">
                            {feature.icon}
                        </span>
                        <h2 className="extension-feature-title">
                            {feature.title}
                        </h2>
                        <p className="extension-feature-desc">
                            {feature.desc}
                        </p>
                    </div>

                    <div className="feature-media-placeholder">
                        <span className="feature-media-inner">
                            {feature.mediaPlaceholder}
                        </span>
                    </div>
                </motion.div>
            ))}
        </section>
    );
}