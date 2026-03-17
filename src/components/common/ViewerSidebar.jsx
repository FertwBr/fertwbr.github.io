import React from 'react';

/**
 * Standardized sidebar component for viewer pages.
 * Commonly wraps a Table of Contents and displays a call-to-action card (e.g. Support).
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Main content of the sidebar (usually a PageTableOfContents)
 * @param {string} [props.cardIcon] - Optional material symbol icon for the CTA card
 * @param {string} props.cardTitle - Title of the CTA card
 * @param {string} props.cardDesc - Description text of the CTA card
 * @param {string} [props.cardBtnText] - Optional button text for the CTA card
 * @param {Function} [props.onBtnClick] - Click handler for the CTA button
 * @param {Object} [props.customCardStyle] - Optional inline overrides for the CTA card styling
 * @returns {JSX.Element}
 */
export default function ViewerSidebar({
                                          children,
                                          cardIcon,
                                          cardTitle,
                                          cardDesc,
                                          cardBtnText,
                                          onBtnClick,
                                          customCardStyle
                                      }) {
    return (
        <div className="desktop-toc-wrapper viewer-sidebar-container">
            {children}
            <div className="glass-card viewer-sidebar-card" style={customCardStyle}>
                {cardIcon ? (
                    <div className="viewer-sidebar-card-header">
                        <span className="material-symbols-outlined card-icon">{cardIcon}</span>
                        <span className="card-title-text">{cardTitle}</span>
                    </div>
                ) : (
                    <h4 className="viewer-sidebar-card-title">{cardTitle}</h4>
                )}
                <p className="viewer-sidebar-card-desc">{cardDesc}</p>
                {cardBtnText && (
                    <button onClick={onBtnClick} className="btn-outline viewer-sidebar-btn">
                        {cardBtnText}
                    </button>
                )}
            </div>
        </div>
    );
}