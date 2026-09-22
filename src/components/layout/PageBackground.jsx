import React from 'react';

/**
 * Renders the foundational page background.
 * Adheres to Material 3 Expressive guidelines by using solid tonal surfaces
 * rather than generic blurred gradients or grid overlays.
 *
 * @param {Object} props Component properties.
 * @param {number} [props.opacity=1] Base opacity for the background layer.
 * @returns {JSX.Element} The rendered background component.
 */
export default function PageBackground({ opacity = 1 }) {
    return (
        <div className="bg-fixed" style={{ opacity }}></div>
    );
}