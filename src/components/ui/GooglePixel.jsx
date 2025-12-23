import React from 'react';
import { motion } from 'framer-motion';

/**
 * GooglePixel Component.
 * High-fidelity CSS reproduction of a Pixel phone.
 * Features a realistic bezel, camera cutout, and polished hardware finish.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to render inside the screen.
 * @param {Object} [props.style] - Inline styles for the outer container.
 * @returns {JSX.Element}
 */
export default function GooglePixel({ children, style }) {
    return (
        <motion.div
            style={{
                width: '300px',
                height: '620px',
                background: '#000000',
                borderRadius: '42px',
                position: 'relative',
                boxShadow: '0 0 0 2px #333, 0 0 0 4px #1a1a1a, 0 30px 80px -20px rgba(0,0,0,0.6)',
                overflow: 'hidden',
                flexShrink: 0,
                ...style
            }}
        >
            <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                borderRadius: '38px',
                border: '8px solid #000',
                zIndex: 20,
                pointerEvents: 'none'
            }} />

            <div style={{
                position: 'absolute',
                top: '18px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '12px',
                height: '12px',
                background: '#000',
                borderRadius: '50%',
                zIndex: 30,
                boxShadow: 'inset 0 0 4px rgba(255,255,255,0.2)'
            }} />

            <div style={{
                position: 'absolute',
                right: '-3px',
                top: '100px',
                width: '3px',
                height: '60px',
                background: '#333',
                borderRadius: '0 2px 2px 0',
                zIndex: 1
            }} />

            <div style={{
                width: '100%',
                height: '100%',
                background: 'var(--md-sys-color-surface)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '36px'
            }}>
                {children}
            </div>

            <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '42px',
                background: 'linear-gradient(120deg, rgba(255,255,255,0.1) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.05) 100%)',
                pointerEvents: 'none',
                zIndex: 40
            }} />
        </motion.div>
    );
}