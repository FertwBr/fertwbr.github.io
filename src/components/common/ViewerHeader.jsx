/* src/components/common/ViewerHeader.jsx */
import React from 'react';
import {useNavigate} from 'react-router-dom';

/**
 * Standardized header component for viewer pages (Changelog, Terms, Privacy, etc.)
 * Provides an interactive breadcrumb navigation and page title/subtitle.
 *
 * @param {Object} props
 * @param {string} props.appName - Name of the application (e.g. Pixel Pulse)
 * @param {string} props.icon - Material Symbols icon name
 * @param {string} props.title - Main title of the viewer
 * @param {string} [props.subtitle] - Optional subtitle text
 * @param {string} [props.lastUpdated] - Optional last updated date string
 * @param {string} [props.lastUpdatedText] - Localized label for "Last Updated"
 * @param {React.ReactNode} [props.actionNode] - Optional component (like a button) rendered on the right side
 * @param {React.ReactNode} [props.introNode] - Optional introductory Markdown content rendered below the title
 * @param {Object} [props.middleCrumb] - Optional middle breadcrumb object { label: string, onClick: function }
 * @returns {JSX.Element}
 */
export default function ViewerHeader({
                                         appName,
                                         icon,
                                         title,
                                         subtitle,
                                         lastUpdated,
                                         lastUpdatedText,
                                         actionNode,
                                         introNode,
                                         middleCrumb
                                     }) {
    const navigate = useNavigate();

    const handleRootNavigation = () => {
        if (!appName) return;
        const normalized = appName.toLowerCase().replace(/\s+/g, '');
        if (normalized.includes('compass')) navigate('/pixelcompass');
        else if (normalized.includes('pulse')) navigate('/pixelpulse');
        else navigate('/');
    };

    return (
        <header className="viewer-header-container">
            <div className="viewer-header-main">
                <div className="viewer-header-text-area">
                    <nav className="viewer-breadcrumb">
                        <button
                            onClick={handleRootNavigation}
                            className="breadcrumb-link"
                            title={appName}
                        >
                            {appName}
                        </button>
                        <span className="material-symbols-outlined breadcrumb-separator">chevron_right</span>

                        {middleCrumb && (
                            <>
                                <button
                                    onClick={middleCrumb.onClick}
                                    className="breadcrumb-link"
                                    title={middleCrumb.label}
                                >
                                    {middleCrumb.label}
                                </button>
                                <span className="material-symbols-outlined breadcrumb-separator">chevron_right</span>
                            </>
                        )}

                        <button
                            onClick={() => window.location.reload()}
                            className="breadcrumb-link current"
                            title={title}
                        >
                            <span className="material-symbols-outlined breadcrumb-icon">{icon}</span>
                            <span>{title}</span>
                        </button>
                    </nav>

                    <h1 className={`viewer-title ${!subtitle ? 'viewer-title-large' : ''}`}>{title}</h1>
                    {subtitle && <p className="viewer-subtitle">{subtitle}</p>}
                </div>

                {(lastUpdated || actionNode) && (
                    <div className="viewer-header-actions-area">
                        {actionNode && (
                            <div className="viewer-header-actions">
                                {actionNode}
                            </div>
                        )}
                        {lastUpdated && (
                            <div className="last-updated-badge">
                                <span className="material-symbols-outlined badge-icon">update</span>
                                <span>{lastUpdatedText} {lastUpdated}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
            {introNode && (
                <div className="header-intro">
                    <div className="markdown-body rich-text">{introNode}</div>
                </div>
            )}
        </header>
    );
}