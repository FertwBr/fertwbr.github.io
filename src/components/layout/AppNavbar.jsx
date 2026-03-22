import React from 'react';
import NavbarMobile from './NavbarMobile';
import NavbarTablet from './NavbarTablet';
import TopBarDesktop from './TopBarDesktop';
import SidebarDesktop from './SidebarDesktop';

/**
 * Main navigation orchestrator.
 * Renders the appropriate navigation component based on window width.
 *
 * @param {Object} props
 * @param {Object} props.config
 * @param {string} props.activePage
 * @param {Function} props.onNavigate
 * @param {Object} props.strings
 * @param {boolean} [props.isSidebarExpanded]
 * @param {Function} [props.toggleSidebar]
 * @param {number} [props.windowWidth]
 * @returns {JSX.Element}
 */
export default function AppNavbar({
                                      config,
                                      activePage,
                                      onNavigate,
                                      strings,
                                      isSidebarExpanded,
                                      toggleSidebar,
                                      windowWidth = window.innerWidth
                                  }) {
    const isMobile = windowWidth < 768;
    const isTablet = windowWidth >= 768 && windowWidth <= 1000;
    const isDesktop = windowWidth > 1000;

    const commonProps = {
        config,
        activePage,
        onNavigate,
        strings
    };

    return (
        <>
            {isMobile && <NavbarMobile {...commonProps} />}
            {isTablet && <NavbarTablet {...commonProps} />}
            {isDesktop && (
                <>
                    <TopBarDesktop
                        {...commonProps}
                        isSidebarExpanded={isSidebarExpanded}
                        toggleSidebar={toggleSidebar}
                    />
                    <SidebarDesktop
                        {...commonProps}
                        isExpanded={isSidebarExpanded}
                    />
                </>
            )}
        </>
    );
}