import React, {useEffect} from 'react';
import {BrowserRouter, Routes, Route, useLocation, Navigate} from 'react-router-dom';
import {AnimatePresence} from 'framer-motion';

import {LanguageProvider} from './context/LanguageContext';
import {SmoothScrollProvider} from './context/SmoothScrollContext';
import ScrollToTop from './components/common/ScrollToTop';
import ErrorBoundary from './components/common/ErrorBoundary';
import OfflineNotice from './components/common/OfflineNotice';
import RouteNormalizer from './components/common/RouteNormalizer';
import CanonicalPathRedirect from './components/common/CanonicalPathRedirect';

import PortfolioHome from './pages/PortfolioHome';
import AppsHome from './pages/apps-home/AppsHome';
import NotFound from './pages/NotFound';
import PixelCompassPage from './pages/pixel-compass/PixelCompassPage';
import PixelPulsePage from './pages/pixel-pulse/PixelPulsePage';
import RedirectToStore from './pages/RedirectToStore';
import SiteProjectPage from './pages/SiteProjectPage';
import FeedbackPage from "./pages/FeedbackPage";

import { pixelPulseConfig } from './pages/pixel-pulse/PixelPulseConfig';
import { pixelCompassConfig } from './pages/pixel-compass/PixelCompassConfig';
import { siteProjectConfig } from './config';

/**
 * Determines which Home component to render based on the hostname.
 * - apps.fertwbr.com -> AppsHome
 * - fertwbr.com (or others) -> PortfolioHome
 */
const DomainAwareHome = () => {
    const hostname = window.location.hostname;
    const isAppsDomain = hostname.includes('apps.') || hostname.includes('localhost');
    return isAppsDomain ? <AppsHome/> : <PortfolioHome/>;

};

/**
 * AnimatedRoutes
 *
 * Provides the application's route definitions and enables animated page
 * transitions. Responsibilities:
 * - Wraps route tree with framer-motion's AnimatePresence to allow exit/enter
 *   animations when location changes.
 * - Reads the current location from react-router's useLocation and keys the
 *   Routes to the pathname to trigger animations.
 * - Collects valid page IDs from configuration objects and supplies them to
 *   RouteNormalizer to validate dynamic routes and render a fallback
 *   (NotFound) for unknown IDs.
 * - Declares static routes, redirects, domain-aware home selection, and
 *   per-app routes (PixelPulse / PixelCompass) including store redirect paths.
 */
function AnimatedRoutes() {
    const location = useLocation();

    const siteIds = Object.keys(siteProjectConfig.pages);
    const pulseIds = Object.keys(pixelPulseConfig.pages);
    const compassIds = Object.keys(pixelCompassConfig.pages);

    useEffect(() => {
        console.log(
            "%c Designed & Engineered by Fernando Vaz ",
            "background: #1a1a1a; color: #d0bcff; border-radius: 4px; padding: 8px; font-size: 14px; font-weight: bold; border: 1px solid #d0bcff;"
        );
        console.log("Looking for the source code? Check out https://github.com/FertwBr/fertwbr.github.io");
    }, []);

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<DomainAwareHome />}/>

                <Route path="/overview" element={<SiteProjectPage forcedTab="overview" />} />
                <Route path="/changelog" element={<SiteProjectPage forcedTab="changelog" />} />

                <Route path="/site" element={<Navigate to="/overview" replace />} />
                <Route path="/site/overview" element={<Navigate to="/overview" replace />} />
                <Route path="/site/changelog" element={<Navigate to="/changelog" replace />} />

                <Route
                    path="/site/:pageId"
                    element={
                        <RouteNormalizer basePath="" validIds={siteIds} fallback={<NotFound />}>
                            <div />
                        </RouteNormalizer>
                    }
                />

                <Route path="/feedback" element={<FeedbackPage />} />

                <Route path="/pixelpulse/open" element={<RedirectToStore type="open" appKey="pixelpulse"/>}/>
                <Route path="/pixelpulse/open/buy" element={<RedirectToStore type="buy" appKey="pixelpulse"/>}/>
                <Route path="/pixelpulse" element={<PixelPulsePage />}/>
                <Route path="/PixelPulse" element={<Navigate to="/pixelpulse" replace />}/>
                <Route
                    path="/pixelpulse/:pageId"
                    element={
                        <RouteNormalizer basePath="/pixelpulse" validIds={pulseIds} fallback={<NotFound />}>
                            <PixelPulsePage />
                        </RouteNormalizer>
                    }
                />

                <Route path="/pixelcompass/open" element={<RedirectToStore type="open" appKey="pixelcompass"/>}/>
                <Route path="/pixelcompass/open/buy" element={<RedirectToStore type="buy" appKey="pixelcompass"/>}/>
                <Route path="/pixelcompass" element={<PixelCompassPage />}/>
                <Route path="/PixelCompass" element={<Navigate to="/pixelcompass" replace />}/>
                <Route
                    path="/pixelcompass/:pageId"
                    element={
                        <RouteNormalizer basePath="/pixelcompass" validIds={compassIds} fallback={<NotFound />}>
                            <PixelCompassPage />
                        </RouteNormalizer>
                    }
                />

                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </AnimatePresence>
    );
}

export default function App() {
    return (
        <ErrorBoundary>
            <BrowserRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
                <CanonicalPathRedirect/>
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