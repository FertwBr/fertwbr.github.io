import React from 'react';
import UniversalControls from '../common/UniversalControls';

/**
 * Footer controls for managing site theme, appearance mode, and language selection.
 *
 * @param {Object} props
 * @param {string} [props.title]
 * @returns {JSX.Element}
 */
export default function FooterControls({title}) {
    return <UniversalControls compact={false} title={title}/>;
}