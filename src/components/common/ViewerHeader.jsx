import React from 'react';

export default function ViewerHeader({
                                         appName,
                                         icon,
                                         title,
                                         subtitle,
                                         lastUpdated,
                                         lastUpdatedText,
                                         actionNode,
                                         introNode
                                     }) {
    return (
        <div className="viewer-header-container">
            <div className="viewer-header-top">
                <div>
                    <div className="viewer-breadcrumb">
                        <span>{appName}</span>
                        <span className="material-symbols-outlined breadcrumb-separator">chevron_right</span>
                        <div className="viewer-breadcrumb-current">
                            <span className="material-symbols-outlined breadcrumb-icon">{icon}</span>
                            <span>{title}</span>
                        </div>
                    </div>
                    <h1 className="viewer-title" style={!subtitle ? {fontSize: '2.5rem'} : {}}>{title}</h1>
                    {subtitle && <p className="viewer-subtitle">{subtitle}</p>}
                    {lastUpdated && (
                        <div className="last-updated-badge">
                            <span className="material-symbols-outlined badge-icon">update</span>
                            <span>{lastUpdatedText} {lastUpdated}</span>
                        </div>
                    )}
                </div>
                {actionNode && <div className="viewer-header-action">{actionNode}</div>}
            </div>
            {introNode && (
                <div className="header-intro">
                    <div className="markdown-body rich-text">{introNode}</div>
                </div>
            )}
        </div>
    );
}