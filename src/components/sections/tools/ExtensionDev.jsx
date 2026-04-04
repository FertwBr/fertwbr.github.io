import React, {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import {SiteConfig} from '../../../utils/siteConstants';

/**
 * @param {Object} props
 * @param {Array} props.items
 * @param {string} props.direction
 * @param {number} props.speed
 * @returns {JSX.Element}
 */
const MarqueeRow = ({items, direction = "left", speed = 30}) => {
    return (
        <div className="dev-marquee-container">
            <motion.div
                initial={{x: direction === "left" ? "0%" : "-50%"}}
                animate={{x: direction === "left" ? "-50%" : "0%"}}
                transition={{repeat: Infinity, ease: "linear", duration: speed}}
                className="dev-marquee-inner"
            >
                {[...items, ...items, ...items, ...items].map((item, index) => (
                    <div key={`${item.name}-${index}`} className="tech-chip">
                        <span className="material-symbols-outlined tech-chip-icon">
                            {item.icon}
                        </span>
                        {item.name}
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

/**
 * @param {Object} props
 * @param {Object} props.strings
 * @returns {JSX.Element}
 */
export default function ExtensionDev({strings}) {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const repoRes = await fetch('https://api.github.com/repos/fertwbr/GeminiExpressive');
                const repoData = await repoRes.json();
                setStats({
                    stars: repoData.stargazers_count || 0,
                    forks: repoData.forks_count || 0
                });
            } catch (e) {
                setStats({stars: 0, forks: 0});
            }
        };
        fetchStats();
    }, []);

    const techRow1 = [
        {name: "JavaScript", icon: "data_object"},
        {name: "Manifest V3", icon: "extension"},
        {name: "Material Design 3", icon: "palette"},
        {name: "MutationObserver", icon: "visibility"}
    ];

    const techRow2 = [
        {name: "CSS Variables", icon: "css"},
        {name: "Local Storage", icon: "save"},
        {name: "Chrome API", icon: "api"},
        {name: "Responsive Layouts", icon: "devices"}
    ];

    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {opacity: 1, y: 0, transition: {duration: 0.5, ease: "easeOut"}}
    };

    return (
        <section className="dev-section">
            <motion.div
                className="dev-section-container"
                initial={{opacity: 0, y: 40}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, margin: "-100px"}}
                transition={{duration: 0.7, ease: "easeOut"}}
            >
                <div className="dev-blur-bg"></div>

                <div className="dev-split-container dev-split-layout">
                    <div className="dev-split-left">
                        <motion.div
                            className="github-stats-card"
                            initial={{opacity: 0, scale: 0.9}}
                            whileInView={{opacity: 1, scale: 1}}
                            viewport={{once: true}}
                            transition={{duration: 0.5, delay: 0.1}}
                        >
                            <div className="dev-avatar-wrapper">
                                <img src={SiteConfig.assets.avatar} alt="Avatar" className="dev-avatar-img"/>
                                <div>
                                    <h3 className="dev-author-name">{SiteConfig.meta.author}</h3>
                                    <a href="https://github.com/fertwbr/GeminiExpressive" target="_blank"
                                       rel="noreferrer" className="dev-author-link">
                                        fertwbr/GeminiExpressive
                                    </a>
                                </div>
                            </div>
                            <div className="github-stats-row">
                                <div className="github-stat-item">
                                    <span className="github-stat-value">
                                        {stats !== null ? stats.stars : "-"}
                                    </span>
                                    <span className="github-stat-label">{strings?.dev_stats_stars}</span>
                                </div>
                                <div className="github-stat-item">
                                    <span className="github-stat-value">
                                        {stats !== null ? stats.forks : "-"}
                                    </span>
                                    <span className="github-stat-label">{strings?.dev_stats_forks}</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="dev-action-buttons"
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{duration: 0.5, delay: 0.3}}
                        >
                            <a href="https://github.com/fertwbr/GeminiExpressive" target="_blank" rel="noreferrer"
                               className="btn-outline dev-btn-outline-full">
                                <span className="material-symbols-outlined dev-btn-icon">code</span>
                                {strings?.view_source_code}
                            </a>
                            <a href={SiteConfig.links.githubProfile} target="_blank" rel="noreferrer"
                               className="btn-glow dev-btn-glow-full">
                                <span className="material-symbols-outlined dev-btn-icon">person</span>
                                {strings?.meet_the_dev}
                            </a>
                        </motion.div>
                    </div>

                    <motion.div
                        className="dev-split-right"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true, margin: "-100px"}}
                    >
                        <motion.h2 variants={itemVariants} className="dev-title">
                            {strings?.dev_title}
                        </motion.h2>

                        <motion.p variants={itemVariants} className="dev-subtitle">
                            {strings?.dev_subtitle}
                        </motion.p>

                        <motion.p variants={itemVariants} className="dev-desc">
                            {strings?.dev_desc_1}
                        </motion.p>

                        <motion.p variants={itemVariants} className="dev-desc dev-desc-last">
                            {strings?.dev_desc_2}
                        </motion.p>

                        <motion.div variants={itemVariants}>
                            <span className="dev-stack-title">
                                {strings?.tech_stack_title}
                            </span>
                            <div className="dev-marquee-wrapper">
                                <div className="dev-marquee-mask-left"></div>
                                <div className="dev-marquee-mask-right"></div>
                                <MarqueeRow items={techRow1} direction="left" speed={35}/>
                                <MarqueeRow items={techRow2} direction="right" speed={40}/>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}