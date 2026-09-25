import React from 'react';
import {motion} from 'framer-motion';

const ShimmerBlock = ({width, height, borderRadius = '8px', className = '', style}) => (
    <motion.div
        className={className}
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
        <div className="skeleton-container">
            {!isFullScreen && <div className="timeline-line" style={{opacity: 0.3}}></div>}

            {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton-item-wrapper">
                    {!isFullScreen && (
                        <div className="timeline-dot skeleton-timeline-dot" />
                    )}
                    <div className="glass-card skeleton-glass-card">
                        <div className="skeleton-header-row">
                            <div className="skeleton-header-content">
                                <ShimmerBlock width="40%" height="32px"/>
                                <ShimmerBlock width="25%" height="20px"/>
                            </div>
                            <ShimmerBlock width="40px" height="40px" borderRadius="50%"/>
                        </div>
                        <ShimmerBlock width="100%" height="1px" className="skeleton-divider"/>
                        <div className="skeleton-body-content">
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