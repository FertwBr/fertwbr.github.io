import React from 'react';
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import {AnimatePresence} from 'framer-motion';

import {LanguageProvider} from './context/LanguageContext';
import {SmoothScrollProvider} from './context/SmoothScrollContext';
import ScrollToTop from './components/common/ScrollToTop';
import ErrorBoundary from './components/common/ErrorBoundary';
import OfflineNotice from './components/common/OfflineNotice';
import RouteNormalizer from './components/common/RouteNormalizer';

import PortfolioHome from './pages/PortfolioHome';
import NotFound from './pages/NotFound';
import PixelCompassPage from './pages/pixel-compass/PixelCompassPage';
import PixelPulsePage from './pages/pixel-pulse/PixelPulsePage';
import RedirectToStore from './pages/RedirectToStore';
import SiteProjectPage from './pages/SiteProjectPage';

import { pixelPulseConfig } from './pages/pixel-pulse/PixelPulseConfig';
import { pixelCompassConfig } from './pages/pixel-compass/PixelCompassConfig';
import { siteProjectConfig } from './config';

function AnimatedRoutes() {
    const location = useLocation();

    const siteIds = Object.keys(siteProjectConfig.pages);
    const pulseIds = Object.keys(pixelPulseConfig.pages);
    const compassIds = Object.keys(pixelCompassConfig.pages);

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PortfolioHome/>}/>

                <Route path="/site" element={<SiteProjectPage/>}/>
                <Route path="/site/:pageId" element={<RouteNormalizer basePath="/site" validIds={siteIds} />} />

                <Route path="/pixelpulse/open" element={<RedirectToStore type="open" appKey="pixelpulse"/>}/>
                <Route path="/pixelpulse/open/buy" element={<RedirectToStore type="buy" appKey="pixelpulse"/>}/>
                <Route path="/pixelpulse" element={<PixelPulsePage/>}/>
                <Route path="/PixelPulse" element={<PixelPulsePage/>}/>

                <Route path="/pixelpulse/:pageId" element={<RouteNormalizer basePath="/pixelpulse" validIds={pulseIds} />} />
                <Route path="/PixelPulse/:pageId" element={<RouteNormalizer basePath="/pixelpulse" validIds={pulseIds} />} />

                <Route path="/pixelcompass/open" element={<RedirectToStore type="open" appKey="pixelcompass"/>}/>
                <Route path="/pixelcompass/open/buy" element={<RedirectToStore type="buy" appKey="pixelcompass"/>}/>
                <Route path="/pixelcompass" element={<PixelCompassPage/>}/>
                <Route path="/PixelCompass" element={<PixelCompassPage/>}/>

                <Route path="/pixelcompass/:pageId" element={<RouteNormalizer basePath="/pixelcompass" validIds={compassIds} />} />
                <Route path="/PixelCompass/:pageId" element={<RouteNormalizer basePath="/pixelcompass" validIds={compassIds} />} />

                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </AnimatePresence>
    );
}

export default function App() {
    return (
        <ErrorBoundary>
            <BrowserRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
                <LanguageProvider>
                    <SmoothScrollProvider>
                        <ScrollToTop/>
                        <OfflineNotice/>
                        <AnimatedRoutes/>
                    </SmoothScrollProvider>
                </LanguageProvider>
            </BrowserRouter>
        </ErrorBoundary>
    );
}