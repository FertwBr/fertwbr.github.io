import React from 'react';

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