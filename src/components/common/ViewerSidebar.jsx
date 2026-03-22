import React from 'react';

/**
 * Standardized sidebar component for viewer pages.
 * Commonly wraps a Table of Contents and displays a call-to-action card (e.g. Support).
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.cardIcon]
 * @param {string} props.cardTitle
 * @param {string} props.cardDesc
 * @param {string} [props.cardBtnText]
 * @param {Function} [props.onBtnClick]
 * @param {Object}[props.customCardStyle]
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
        <aside className="app-sidebar-fixed desktop-toc-wrapper" style={{width: '100%', boxSizing: 'border-box'}}>
            <div
                className="app-sidebar-sticky-inner viewer-sidebar-container"
                style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    paddingBottom: '120px'
                }}
            >
                {children}
                <div className="sidebar-base-card viewer-sidebar-card"
                     style={{width: '100%', boxSizing: 'border-box', margin: 0, ...customCardStyle}}>
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
        </aside>
    );
}