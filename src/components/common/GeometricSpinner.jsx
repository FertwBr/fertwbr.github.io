import React from 'react';
import {motion} from 'framer-motion';

/**
 * A sophisticated, high-fidelity loading indicator that replaces standard spinners
 * with a geometric morphing animation.
 *
 * This component demonstrates advanced usage of Framer Motion, including:
 * - Simultaneous morphing of border-radius and rotation.
 * - Staggered opacity and scale transitions.
 * - Usage of CSS variables for consistent theming.
 *
 * It is designed to look "engineered" and hypnotic, implying complex background
 * processing without using text.
 *
 * @returns {JSX.Element} The rendered loading component.
 */
export default function GeometricSpinner() {
    const morphTransition = {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror"
    };
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            minHeight: '300px',
            width: '100%',
            overflow: 'hidden'
        }}>
            <div style={{
                position: 'relative',
                width: '96px',
                height: '96px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>

                <motion.div
                    animate={{
                        rotate: [0, 180, 360],
                        borderRadius: ["20%", "50%", "20%"],
                        scale: [1, 1.1, 1],
                        borderWidth: ["4px", "2px", "4px"]
                    }}
                    transition={morphTransition}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        border: '4px solid var(--md-sys-color-primary)',
                        opacity: 0.8
                    }}
                />

                <motion.div
                    animate={{
                        rotate: [360, 180, 0],
                        borderRadius: ["50%", "10%", "50%"],
                    }}
                    transition={morphTransition}
                    style={{
                        position: 'absolute',
                        inset: '16px',
                        border: '4px solid var(--md-sys-color-tertiary, var(--md-sys-color-secondary))',
                        opacity: 0.6
                    }}
                />

                <motion.div
                    animate={{
                        scale: [0.8, 1.2, 0.8],
                        rotate: -45
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{
                        width: '16px',
                        height: '16px',
                        backgroundColor: 'var(--md-sys-color-primary)',
                        borderRadius: '4px'
                    }}
                />

                <motion.div
                    animate={{
                        opacity: [0.2, 0.5, 0.2],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{duration: 2, repeat: Infinity, ease: "easeInOut"}}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        background: 'radial-gradient(circle, var(--md-sys-color-primary) 0%, transparent 70%)',
                        zIndex: -1,
                        filter: 'blur(10px)'
                    }}
                />
            </div>
        </div>
    );
}