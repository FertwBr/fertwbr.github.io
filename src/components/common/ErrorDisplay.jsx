import React from 'react';
import { motion } from 'framer-motion';

/**
 * ErrorDisplay React component.
 *
 * @param {{ message?: string }} error - Error object; its `message` is shown in the details area.
 * @param {Function} [onRetry] - Optional retry handler. If provided, should retry loading; otherwise the component falls back to a full page reload.
 *
 * Uses `framer-motion` for a subtle entrance animation and CSS variables for theming.
 */
export default function ErrorDisplay({ error, onRetry }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card"
            style={{
                padding: '40px',
                borderRadius: '24px',
                textAlign: 'center',
                maxWidth: '500px',
                margin: '60px auto',
                border: '1px solid var(--md-sys-color-error-container)',
                background: 'rgba(var(--md-sys-color-surface-container-rgb), 0.5)'
            }}
        >
            <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                background: 'var(--md-sys-color-error-container)',
                color: 'var(--md-sys-color-on-error-container)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px auto'
            }}>
                <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>cloud_off</span>
            </div>

            <h3 style={{ color: 'var(--md-sys-color-on-surface)', marginBottom: '8px' }}>
                Unable to Load Content
            </h3>

            <p style={{ color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '32px', lineHeight: 1.5 }}>
                We couldn't fetch the requested document. Please check your internet connection or try again later.
            </p>

            <div style={{
                padding: '12px',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '8px',
                marginBottom: '24px',
                fontSize: '0.8rem',
                fontFamily: 'monospace',
                color: 'var(--md-sys-color-error)'
            }}>
                {error?.message || "Unknown Error"}
            </div>

            <button
                onClick={() => window.location.reload()}
                className="btn-glow"
                style={{
                    '--glow-color': 'var(--md-sys-color-primary)',
                    padding: '12px 32px'
                }}
            >
                Reload Page
            </button>
        </motion.div>
    );
}