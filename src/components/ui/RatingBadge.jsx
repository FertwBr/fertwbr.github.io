import React, { useState, useEffect } from 'react';

/**
 * RatingBadge component.
 * Displays the app rating fetched from the local API or falls back to config.
 *
 * @param {Object} props
 * @param {string} props.appId - Android Package Name.
 * @param {Object} props.fallback - Fallback rating object { value, count }.
 * @param {'compact' | 'expanded'} [props.variant='expanded'] - Display style.
 */
export default function RatingBadge({ appId, fallback, variant = 'expanded' }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchRating = async () => {
            if (!appId) return;
            try {
                const response = await fetch(`/api/rating?id=${appId}`);

                if (!response.ok) return;

                const result = await response.json();
                if (isMounted && result.rating && result.count) {
                    setData({ value: result.rating, count: result.count });
                }
            } catch (error) {
                console.warn("Rating fetch failed, using fallback");
            }
        };

        fetchRating();

        return () => { isMounted = false; };
    }, [appId]);

    const display = data || fallback || { value: "4.5", count: "100" };

    if (variant === 'compact') {
        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', opacity: 0.9, fontSize: '0.75rem', marginTop: '2px' }}>
                <span className="material-symbols-outlined" style={{
                    fontSize: '14px',
                    fontVariationSettings: "'FILL' 1",
                    color: 'inherit'
                }}>star</span>
                <span style={{ fontWeight: 700, color: 'inherit' }}>
                    {display.value}
                </span>
                <span style={{ opacity: 0.8, fontWeight: 400, color: 'inherit' }}>
                    ({display.count})
                </span>
            </div>
        );
    }

    return (
        <a
            href={`https://play.google.com/store/apps/details?id=${appId}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                background: 'var(--md-sys-color-surface-container-high)',
                border: '1px solid var(--md-sys-color-outline-variant)',
                borderRadius: '50px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                marginTop: '0'
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.background = 'var(--md-sys-color-surface-container-highest)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.background = 'var(--md-sys-color-surface-container-high)';
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontWeight: 700, color: 'var(--md-sys-color-on-surface)', fontSize: '0.9rem' }}>{display.value}</span>
                <span className="material-symbols-outlined" style={{
                    fontSize: '18px',
                    color: 'var(--md-sys-color-primary)',
                    fontVariationSettings: "'FILL' 1"
                }}>star</span>
            </div>
            <div style={{ width: '1px', height: '12px', background: 'var(--md-sys-color-outline)', opacity: 0.5 }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--md-sys-color-on-surface-variant)', fontWeight: 500 }}>
                {display.count} reviews
            </span>
        </a>
    );
}