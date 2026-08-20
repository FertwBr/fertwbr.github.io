import React from 'react';
import ProductPage from '../ProductPage';
import {pixelMeasureConfig} from './PixelMeasureConfig';
import PixelMeasureHome from './PixelMeasureHome';

/**
 * @param {Object} props
 * @param {string} props.forcedTab
 * @returns {JSX.Element}
 */
export default function PixelMeasurePage({forcedTab}) {
    const config = {
        ...pixelMeasureConfig,
        faviconUrl: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Measure/art/favicon/favicon.ico"
    };

    return (
        <ProductPage
            config={config}
            HomeComponent={PixelMeasureHome}
            translationKey="pixel_measure"
            forcedTab={forcedTab}
        />
    );
}