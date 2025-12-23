import React from 'react';
import {motion} from 'framer-motion';

/**
 * GooglePixel Component.
 * Renders a device frame mock-up (Pixel style) to display content within a phone screen context.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to render inside the screen.
 * @param {Object} [props.style] - Inline styles for the outer container.
 * @param {string} [props.borderColor='#282828'] - Color of the phone bezel/border.
 * @returns {JSX.Element}
 */
export default function GooglePixel({children, style, borderColor = '#282828'}) {
    return (
        <motion.div
            style={{
                width: '280px',
                height: '600px',
                background: '#101010',
                borderRadius: '32px',
                border: `6px solid ${borderColor}`,
                position: 'relative',
                boxShadow: '0 30px 70px -10px rgba(0,0,0,0.6)',
                overflow: 'hidden',
                flexShrink: 0,
                ...style
            }}
        >
            <div style={{
                position: 'absolute', top: '12px', left: '50%', transform: 'translateX(-50%)',
                width: '12px', height: '12px', background: '#000', borderRadius: '50%', zIndex: 10
            }}/>

            <div style={{
                width: '100%', height: '100%',
                background: 'var(--md-sys-color-surface)',
                display: 'flex', flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {children}
            </div>
        </motion.div>
    );
}