import React from "react";
import {motion} from "framer-motion";
import {useSmoothScroll} from "../../context/SmoothScrollContext";

/**
 * About section component.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.t - Translations/text content for the section. Expected shape:
 *   { title: string, subtitle: string, cards: { education, location, stack } }
 * @returns {JSX.Element} The About section.
 */
export default function About({t}) {
    const {lenis} = useSmoothScroll();

    const handleScrollTo = (e, targetId) => {
        e.preventDefault();
        if (lenis) {
            lenis.scrollTo(targetId, {
                duration: 1.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
        } else {
            const element = document.querySelector(targetId);
            element?.scrollIntoView({behavior: 'smooth'});
        }
    };

    const containerVariants = {
        hidden: {opacity: 0},
        show: {
            opacity: 1,
            transition: {staggerChildren: 0.1, delayChildren: 0.2}
        }
    };

    const itemVariants = {
        hidden: {y: 20, opacity: 0},
        show: {y: 0, opacity: 1, transition: {type: "spring", stiffness: 50}}
    };

    return (
        <section style={{
            maxWidth: '1200px',
            margin: '0 auto 100px auto',
            padding: '0 24px',
            boxSizing: 'border-box',
            width: '100%'
        }}>
            <motion.div
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                style={{marginBottom: 'clamp(40px, 8vw, 60px)'}}
            >
                <span style={{
                    color: 'var(--md-sys-color-primary)',
                    textTransform: 'uppercase',
                    letterSpacing: '3px',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    display: 'block',
                    marginBottom: '12px'
                }}>
                  {t.title}
                </span>
                <h2 style={{
                    fontSize: 'clamp(2rem, 8vw, 3.5rem)',
                    lineHeight: 1.1,
                    margin: 0,
                    color: 'var(--md-sys-color-on-surface)',
                    maxWidth: '800px',
                    wordWrap: 'break-word'
                }}>
                    {t.subtitle}
                </h2>
            </motion.div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
                gap: '40px',
                alignItems: 'start',
                width: '100%'
            }}>

                <motion.div
                    initial={{opacity: 0, x: -20}}
                    whileInView={{opacity: 1, x: 0}}
                    viewport={{once: true}}
                    style={{display: 'flex', flexDirection: 'column', gap: '32px'}}
                >
                    <p style={{
                        fontSize: 'clamp(1.1rem, 4vw, 1.5rem)',
                        lineHeight: 1.5,
                        color: 'var(--md-sys-color-on-surface)',
                        fontWeight: 400,
                        margin: 0
                    }}>
                        I'm Fernando Vaz, a Software Engineer graduated from <strong
                        style={{color: 'var(--md-sys-color-primary)'}}>UniCesumar</strong>,
                        passionate about the intersection of robust code and intuitive design.
                    </p>

                    <p style={{
                        fontSize: '1.05rem',
                        lineHeight: 1.7,
                        color: 'var(--md-sys-color-on-surface-variant)',
                        margin: 0
                    }}>
                        Specializing in the <strong style={{color: 'var(--md-sys-color-secondary)'}}>Android
                        ecosystem</strong> (Kotlin/Jetpack Compose)
                        and scalable <strong style={{color: 'var(--md-sys-color-tertiary)'}}>Backends</strong> (Spring
                        Boot).
                        I create solutions that are not only functional but delightful to use.
                    </p>

                    <div style={{marginTop: '16px'}}>
                        <a
                            href="#projects-section"
                            onClick={(e) => handleScrollTo(e, '#projects-section')}
                            className="btn-outline"
                            style={{display: 'inline-flex', alignItems: 'center', gap: '8px'}}
                        >
                            See my work
                            <span className="material-symbols-outlined">arrow_downward</span>
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{once: true}}
                    style={{display: 'flex', flexDirection: 'column', gap: '16px', width: '100%'}}
                >
                    <InfoCard variants={itemVariants} data={t.cards.education} icon="school" color="primary"/>
                    <InfoCard variants={itemVariants} data={t.cards.location} icon="location_on" color="secondary"/>
                    <InfoCard variants={itemVariants} data={t.cards.stack} icon="layers" color="tertiary"/>
                </motion.div>

            </div>
        </section>
    );
}

function InfoCard({data, icon, variants, color = "primary"}) {
    return (
        <motion.div
            variants={variants}
            whileHover={{scale: 1.02, x: 5}}
            style={{
                padding: '20px',
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                background: 'var(--md-sys-color-surface-container-low)',
                border: '1px solid var(--md-sys-color-outline-variant)',
                transition: 'all 0.3s ease',
                width: '100%',
                boxSizing: 'border-box'
            }}
        >
            <div style={{
                width: '56px', height: '56px', borderRadius: '16px',
                background: `var(--md-sys-color-${color}-container)`,
                color: `var(--md-sys-color-on-${color}-container)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0
            }}>
                <span className="material-symbols-outlined" style={{fontSize: '28px'}}>{icon}</span>
            </div>

            <div style={{minWidth: 0}}>
                <h3 style={{
                    fontSize: '0.85rem',
                    color: 'var(--md-sys-color-on-surface-variant)',
                    marginBottom: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                }}>
                    {data.title}
                </h3>
                <p style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--md-sys-color-on-surface)',
                    margin: 0,
                    lineHeight: 1.2,
                    wordBreak: 'break-word'
                }}>
                    {data.value}
                </p>
                <small style={{color: `var(--md-sys-color-${color})`, fontWeight: 600, fontSize: '0.85rem'}}>
                    {data.sub}
                </small>
            </div>
        </motion.div>
    );
}