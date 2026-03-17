import React from 'react';
import {motion} from 'framer-motion';

/**
 * GooglePixel Component.
 * High-fidelity CSS reproduction of a Pixel phone.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to render inside the screen.
 * @param {Object} [props.style] - Inline styles for the outer container.
 * @returns {JSX.Element}
 */
export default function GooglePixel({children, style}) {
    return (
        <motion.div
            className="pixel-device-container"
            style={{
                width: '300px',
                height: '620px',
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
            }}/>

            {/* Front Camera */}
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
            }}/>

            {/* Power Button shadow/hardware detail */}
            <div style={{
                position: 'absolute',
                right: '-3px',
                top: '100px',
                width: '3px',
                height: '60px',
                background: 'var(--md-sys-color-outline-variant)',
                borderRadius: '0 2px 2px 0',
                zIndex: 1
            }}/>

            <div className="pixel-screen-content">
                {children}
            </div>

            {/* Screen Gloss Effect */}
            <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '42px',
                background: 'linear-gradient(120deg, rgba(255,255,255,0.1) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.05) 100%)',
                pointerEvents: 'none',
                zIndex: 40
            }}/>
        </motion.div>
    );
}