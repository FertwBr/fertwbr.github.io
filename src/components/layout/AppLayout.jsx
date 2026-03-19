import React from 'react';

export default function AppLayout({navbar, children, footer, background}) {
    return (
        <div className="app-shell page-wrapper">
            {background}
            {navbar}
            {children}
            {footer}
        </div>
    );
}