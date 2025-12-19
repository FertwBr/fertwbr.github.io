import React from 'react';
import AppNavbar from './AppNavbar';
import AppFooter from './AppFooter';

export default function AppLayout({ children, config, activePage, onNavigate, strings }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppNavbar 
        config={config} 
        activePage={activePage} 
        onNavigate={onNavigate} 
        strings={strings} 
      />
      
      <div className="app-page-container">
        {children}
      </div>

      <AppFooter strings={strings} onNavigate={onNavigate} />
    </div>
  );
}