import React from 'react';

/**
 * Custom background for Tools/Extension pages.
 * Features an animated gradient mesh using the dynamic theme colors.
 *
 * @param {Object} props
 * @param {number} [props.opacity=1]
 * @returns {JSX.Element}
 */
export default function ToolsPageBackground({opacity = 1}) {
    return (
        <div className="tools-bg-container" style={{opacity}}>
            <div className="tools-ambient-mesh"></div>
            <div className="grid-overlay" style={{opacity: 0.6}}></div>
        </div>
    );
}