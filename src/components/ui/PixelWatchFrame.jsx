import React from 'react';
import { motion } from 'framer-motion';

/**
 * PixelWatchFrame
 * High-fidelity CSS reproduction of the Google Pixel Watch.
 * Features a domed glass effect, stainless steel case, and realistic reflections.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to render inside the screen.
 * @param {string} [props.style] - Inline styles.
 */
export default function PixelWatchFrame({ children, style }) {
    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ margin: "-50px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            style={{
                position: 'relative',
                width: '300px',
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                ...style
            }}
        >
            <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #d4d4d4 0%, #ffffff 40%, #9e9e9e 100%)',
                boxShadow: '0 25px 50px -10px rgba(0,0,0,0.3), inset 0 -4px 8px rgba(0,0,0,0.2)',
                zIndex: 1
            }} />

            <div style={{
                position: 'absolute',
                inset: '3px',
                borderRadius: '50%',
                background: '#000000',
                zIndex: 2,
                overflow: 'hidden',
                boxShadow: 'inset 0 0 20px rgba(255,255,255,0.1)'
            }}>
                <div style={{
                    position: 'absolute',
                    inset: '38px',
                    borderRadius: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    zIndex: 2
                }}>
                    {children}
                </div>

                <div style={{
                    position: 'absolute',
                    top: '-50%', left: '-50%', right: '-50%', bottom: '50%',
                    background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 60%)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 10
                }} />

                <div style={{
                    position: 'absolute',
                    top: '20px', right: '40px',
                    width: '60px', height: '30px',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 100%)',
                    borderRadius: '50%',
                    filter: 'blur(8px)',
                    transform: 'rotate(-45deg)',
                    zIndex: 10
                }} />
            </div>

            {/* Tactile Crown */}
            <div style={{
                position: 'absolute',
                right: '-10px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '14px',
                height: '48px',
                background: 'linear-gradient(90deg, #8e8e8e 0%, #f0f0f0 40%, #8e8e8e 100%)',
                borderRadius: '6px',
                boxShadow: '2px 0 6px rgba(0,0,0,0.3)',
                zIndex: 0
            }} />

            <div style={{
                position: 'absolute',
                right: '-4px',
                top: '28%',
                width: '4px',
                height: '32px',
                background: '#8e8e8e',
                borderRadius: '2px',
                zIndex: 0
            }} />
        </motion.div>
    );
}