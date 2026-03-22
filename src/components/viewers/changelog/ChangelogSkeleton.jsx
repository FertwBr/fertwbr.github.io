// src/components/changelog/ChangelogSkeleton.jsx
import React from 'react';
import {motion} from 'framer-motion';

const ShimmerBlock = ({width, height, borderRadius = '8px', style}) => (
    <motion.div
        animate={{opacity: [0.3, 0.7, 0.3]}}
        transition={{repeat: Infinity, duration: 1.5, ease: "easeInOut"}}
        style={{
            width,
            height,
            borderRadius,
            backgroundColor: 'var(--md-sys-color-surface-container-highest)',
            ...style
        }}
    />
);

export default function ChangelogSkeleton({isFullScreen}) {
    return (
        <div style={{width: '100%', position: 'relative'}}>
            {!isFullScreen && <div className="timeline-line" style={{opacity: 0.3}}></div>}

            {[1, 2, 3].map((i) => (
                <div key={i} style={{marginBottom: '40px', position: 'relative'}}>
                    {!isFullScreen && (
                        <div className="timeline-dot" style={{
                            background: 'var(--md-sys-color-surface-container-highest)',
                            border: '3px solid var(--md-sys-color-outline-variant)'
                        }}/>
                    )}
                    <div className="glass-card" style={{
                        padding: '24px',
                        borderRadius: '32px',
                        border: '1px solid var(--md-sys-color-outline-variant)'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: '24px'
                        }}>
                            <div style={{display: 'flex', flexDirection: 'column', gap: '12px', flex: 1}}>
                                <ShimmerBlock width="40%" height="32px"/>
                                <ShimmerBlock width="25%" height="20px"/>
                            </div>
                            <ShimmerBlock width="40px" height="40px" borderRadius="50%"/>
                        </div>
                        <ShimmerBlock width="100%" height="1px" style={{marginBottom: '24px', opacity: 0.5}}/>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                            <ShimmerBlock width="100%" height="16px"/>
                            <ShimmerBlock width="92%" height="16px"/>
                            <ShimmerBlock width="96%" height="16px"/>
                            <ShimmerBlock width="70%" height="16px"/>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}