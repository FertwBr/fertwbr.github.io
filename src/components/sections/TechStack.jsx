import React from 'react';
import {motion} from "framer-motion";

const row1 = [
    {name: "Kotlin", icon: "code"},
    {name: "Jetpack Compose", icon: "widgets"},
    {name: "Android SDK", icon: "android"},
    {name: "Java", icon: "coffee"},
    {name: "Spring Boot", icon: "dns"},
    {name: "Material Design 3", icon: "palette"},
    {name: "Room DB", icon: "table_chart"},
    {name: "Retrofit", icon: "http"},
];

const row2 = [
    {name: "React", icon: "html"},
    {name: "PostgreSQL", icon: "database"},
    {name: "Docker", icon: "layers"},
    {name: "Git", icon: "terminal"},
    {name: "Figma", icon: "design_services"},
    {name: "CI/CD Actions", icon: "play_circle"},
    {name: "Firebase", icon: "local_fire_department"},
    {name: "Vite", icon: "bolt"},
];

const MarqueeRow = ({items, direction = "left", speed = 30}) => {
    return (
        <div style={{display: 'flex', width: '100%', overflow: 'hidden', marginBottom: '24px'}}>
            <motion.div
                initial={{x: direction === "left" ? "0%" : "-50%"}}
                animate={{x: direction === "left" ? "-50%" : "0%"}}
                transition={{repeat: Infinity, duration: speed, ease: "linear"}}
                style={{display: 'flex', gap: '24px', paddingLeft: '24px', whiteSpace: 'nowrap'}}
            >
                {[...items, ...items, ...items].map((tech, i) => (
                    <div key={`${tech.name}-${i}`} style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '12px 24px',
                        background: 'var(--md-sys-color-surface-container-high)',
                        border: '1px solid var(--md-sys-color-outline-variant)',
                        borderRadius: '100px',
                        minWidth: 'max-content',
                        userSelect: 'none'
                    }}>
            <span className="material-symbols-outlined" style={{
                color: 'var(--md-sys-color-primary)',
                fontSize: '20px'
            }}>
              {tech.icon}
            </span>
                        <span style={{
                            fontWeight: 600,
                            fontSize: '1rem',
                            color: 'var(--md-sys-color-on-surface)'
                        }}>
              {tech.name}
            </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

/**
 * TechStack section component.
 *
 * Renders a stylized section containing animated marquee rows of technology badges.
 *
 * @param {Object} props
 * @param {{title: string, subtitle: string}} props.t - Text content for the section:
 * - title: section heading
 * - subtitle: descriptive subtitle
 * @returns {JSX.Element} The TechStack section element.
 */
export default function TechStack({t}) {
    return (
        <section style={{
            padding: '100px 0',
            overflow: 'hidden',
            background: 'linear-gradient(to bottom, var(--md-sys-color-surface), var(--md-sys-color-surface-container-low))',
            position: 'relative'
        }}>

            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 24px',
                textAlign: 'center',
                marginBottom: '60px'
            }}>
                <h2 style={{fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '16px'}}>{t.title}</h2>
                <p style={{
                    color: 'var(--md-sys-color-on-surface-variant)',
                    fontSize: '1.1rem',
                    maxWidth: '600px',
                    margin: '0 auto'
                }}>
                    {t.subtitle}
                </p>
            </div>

            <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '150px',
                background: 'linear-gradient(to right, var(--md-sys-color-surface), transparent)',
                zIndex: 2,
                pointerEvents: 'none'
            }}></div>
            <div style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: '150px',
                background: 'linear-gradient(to left, var(--md-sys-color-surface), transparent)',
                zIndex: 2,
                pointerEvents: 'none'
            }}></div>

            <div style={{position: 'relative', zIndex: 1, transform: 'rotate(-2deg) scale(1.05)'}}>
                <MarqueeRow items={row1} direction="left" speed={40}/>
                <MarqueeRow items={row2} direction="right" speed={45}/>
            </div>

        </section>
    );
}