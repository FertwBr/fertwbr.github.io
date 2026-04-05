import React, {useRef, useState, useEffect} from 'react';
import {motion} from 'framer-motion';

const FeatureVideo = ({src, title}) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [userPaused, setUserPaused] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (!userPaused) {
                        video.play()
                            .then(() => setIsPlaying(true))
                            .catch(() => setIsPlaying(false));
                    }
                } else {
                    video.pause();
                    setIsPlaying(false);
                }
            },
            {threshold: 0.4}
        );

        observer.observe(video);
        return () => observer.disconnect();
    }, [userPaused]);

    const handleToggle = () => {
        const video = videoRef.current;
        if (!video) return;

        if (isPlaying) {
            video.pause();
            setUserPaused(true);
            setIsPlaying(false);
        } else {
            video.play()
                .then(() => {
                    setUserPaused(false);
                    setIsPlaying(true);
                })
                .catch(() => {
                });
        }
    };

    return (
        <div className="feature-video-wrapper">
            <video
                ref={videoRef}
                src={src}
                loop
                muted
                playsInline
                preload="none"
                className="feature-media-video"
                aria-label={title}
            />
            <button
                onClick={handleToggle}
                className="feature-video-control"
                aria-label={isPlaying ? "Pause video" : "Play video"}
            >
                <span className="material-symbols-outlined">
                    {isPlaying ? 'pause' : 'play_arrow'}
                </span>
            </button>
        </div>
    );
};

export default function ExtensionFeatures({strings}) {
    const features = [
        {
            id: 'timeline',
            icon: 'timeline',
            title: strings?.feature_timeline_title || "Interactive Timeline Navigation",
            desc: strings?.feature_timeline_desc || "Stop scrolling endlessly. The persistent timeline automatically maps your entire conversation, allowing you to instantly jump between your prompts and Gemini's responses with a single click. It intelligently tracks your active position as you read.",
            mediaSrc: "/content/GeminiExpressive/assets/Timeline.mp4",
            mediaType: "video"
        },
        {
            id: 'snippets',
            icon: 'keyboard_command_key',
            title: strings?.feature_snippets_title || "Prompt Snippets & Shortcuts",
            desc: strings?.feature_snippets_desc || "Save time typing repetitive instructions. Create custom shortcuts for your most used prompts. Just type your prefix (like '/') followed by your keyword, and the extension will instantly expand it into your full prompt.",
            mediaSrc: "/content/GeminiExpressive/assets/snippets.mp4",
            mediaType: "video"
        },
        {
            id: 'theme',
            icon: 'palette',
            title: strings?.feature_theme_title || "Dynamic Material Theming",
            desc: strings?.feature_theme_desc || "Make Gemini truly yours. Select a seed color and the extension will mathematically generate a complete, accessible Material Design 3 palette, seamlessly applying it to the entire Gemini interface in both Light and Dark modes.",
            mediaSrc: "/content/GeminiExpressive/assets/theme.png",
            mediaType: "image"
        },
        {
            id: 'code_collapse',
            icon: 'unfold_less',
            title: strings?.feature_code_title || "Smart Code Collapsing & Navigation",
            desc: strings?.feature_code_desc || "Keep your workspace clean. Automatically add 'Collapse/Expand' buttons to massive code blocks. Use the floating navigation arrows to quickly jump between different code segments in long responses.",
            mediaSrc: "/content/GeminiExpressive/assets/Code_Collapse.mp4",
            mediaType: "video"
        },
        {
            id: 'headers',
            icon: 'terminal',
            title: strings?.feature_headers_title || "Enhanced Code Headers",
            desc: strings?.feature_headers_desc || "Instantly recognize what you're looking at. The extension detects the programming language of each block, extracts file names directly from the code context, and displays native Material icons in the header.",
            mediaSrc: "/content/GeminiExpressive/assets/headers.png",
            mediaType: "image"
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
                        {feature.mediaType === 'video' ? (
                            <FeatureVideo src={feature.mediaSrc} title={feature.title}/>
                        ) : (
                            <img
                                src={feature.mediaSrc}
                                alt={feature.title}
                                className="feature-media-image"
                            />
                        )}
                    </div>
                </motion.div>
            ))}
        </section>
    );
}