import React, {useState, useEffect} from 'react';
import {motion} from 'framer-motion';

/**
 * @param {Object} props
 * @param {Object} props.config
 * @param {Object} props.strings
 * @returns {JSX.Element}
 */
export default function ExtensionHero({config, strings}) {
    const [browser, setBrowser] = useState('chrome');

    useEffect(() => {
        const ua = navigator.userAgent.toLowerCase();
        if (ua.includes('firefox')) {
            setBrowser('firefox');
        } else if (ua.includes('edg/')) {
            setBrowser('edge');
        } else {
            setBrowser('chrome');
        }
    }, []);

    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {
            opacity: 1,
            y: 0,
            transition: {type: "spring", stiffness: 100, damping: 20}
        }
    };

    const getBrowserData = (type) => {
        switch (type) {
            case 'firefox':
                return {
                    id: 'firefox',
                    link: config.firefoxStoreLink,
                    label: strings?.browser_firefox || 'Firefox',
                    imgSrc: "https://raw.githubusercontent.com/alrra/browser-logos/main/src/firefox/firefox_128x128.png",
                    colorClass: "btn-brand-firefox"
                };
            case 'edge':
                return {
                    id: 'edge',
                    link: config.edgeStoreLink,
                    label: strings?.browser_edge || 'Edge',
                    imgSrc: "https://raw.githubusercontent.com/alrra/browser-logos/main/src/edge/edge_128x128.png",
                    colorClass: "btn-brand-edge"
                };
            case 'chrome':
            default:
                return {
                    id: 'chrome',
                    link: config.chromeStoreLink,
                    label: strings?.browser_chrome || 'Chrome',
                    imgSrc: "https://raw.githubusercontent.com/alrra/browser-logos/main/src/chrome/chrome_128x128.png",
                    colorClass: "btn-brand-chrome"
                };
        }
    };

    const primaryData = getBrowserData(browser);

    const otherBrowsers = ['chrome', 'firefox', 'edge']
        .filter(b => b !== browser)
        .map(b => getBrowserData(b));

    const rawTitle = strings?.hero_title || "A Better Way to\nExperience Gemini";

    return (
        <section className="extension-hero-section">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="hero-grid"
            >
                <div className="hero-text-col">
                    <motion.h1 variants={itemVariants} className="hero-title-split">
                        {rawTitle.split('\n').map((line, i, arr) => (
                            <React.Fragment key={i}>
                                {line}
                                {i !== arr.length - 1 && <br/>}
                            </React.Fragment>
                        ))}
                    </motion.h1>

                    <motion.p variants={itemVariants} className="hero-subtitle-split">
                        {strings?.hero_subtitle || "Enhance your Gemini web UI with persistent timeline navigation, intelligent code collapsing, and dynamic Material You theming."}
                    </motion.p>

                    <motion.div variants={itemVariants} className="hero-browser-group">
                        <motion.a
                            whileHover={{scale: 1.03}}
                            whileTap={{scale: 0.97}}
                            href={primaryData.link}
                            target="_blank"
                            rel="noreferrer"
                            className={`hero-btn-primary ${primaryData.colorClass}`}
                        >
                            <img src={primaryData.imgSrc} alt={primaryData.label} className="browser-icon-large"/>
                            <div className="btn-text-block">
                                <span
                                    className="btn-primary-top">{strings?.download_primary || "Add to"} {primaryData.label}</span>
                                <span className="btn-primary-bottom">{strings?.download_free || "It's Free"}</span>
                            </div>
                        </motion.a>

                        {otherBrowsers.length > 0 && (
                            <div className="hero-browsers-row">
                                <span
                                    className="secondary-label">{strings?.download_secondary || "Also available for"}:</span>
                                <div className="browser-chips-container">
                                    {otherBrowsers.map((b) => (
                                        <a
                                            key={b.id}
                                            href={b.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="browser-chip"
                                            title={`${strings?.download_primary || "Add to"} ${b.label}`}
                                        >
                                            <img src={b.imgSrc} alt={b.label} className="browser-icon-small"/>
                                            <span className="browser-chip-label">{b.label}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>

                <motion.div variants={itemVariants} className="hero-visual-col">
                    <motion.div
                        animate={{scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4]}}
                        transition={{duration: 6, repeat: Infinity, ease: "easeInOut"}}
                        className="hero-visual-glow-1"
                    />
                    <motion.div
                        animate={{scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3]}}
                        transition={{duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1}}
                        className="hero-visual-glow-2"
                    />
                    <motion.img
                        initial={{rotate: -10, scale: 0.8, opacity: 0}}
                        animate={{rotate: 0, scale: 1, opacity: 1}}
                        transition={{type: "spring", bounce: 0.5, delay: 0.2}}
                        src={config.appIcon}
                        alt={config.appName}
                        className="hero-visual-icon"
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}