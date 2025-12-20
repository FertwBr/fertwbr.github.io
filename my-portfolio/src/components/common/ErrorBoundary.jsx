import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const ErrorUI = ({ error, resetError }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);
  const { content } = useLanguage();

  const handleCopy = () => {
    navigator.clipboard.writeText(error?.toString() + "\n" + error?.stack);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div style={{ 
      position: 'relative',
      minHeight: '100vh', 
      width: '100%',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '24px',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      <div className="bg-fixed"></div>
      <div className="grid-overlay"></div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="glass-card"
        style={{ 
          maxWidth: '600px', 
          width: '100%', 
          padding: '40px', 
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '1px solid var(--md-sys-color-error-container)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
        }}
      >
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 10 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
          style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: 'var(--md-sys-color-error-container)',
            color: 'var(--md-sys-color-error)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '24px'
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '40px' }}>pest_control</span>
        </motion.div>

        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px', color: 'var(--md-sys-color-on-surface)' }}>
          {content.error.title}
        </h1>
        
        <p style={{ fontSize: '1.1rem', color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '32px', lineHeight: 1.6 }}>
          {content.error.desc_1} <br/>
          {content.error.desc_2}
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', width: '100%', marginBottom: '32px' }}>
          <button 
            onClick={handleReload}
            className="btn-glow"
            style={{ background: 'var(--md-sys-color-error)', color: 'var(--md-sys-color-on-error)' }}
          >
            <span className="material-symbols-outlined">refresh</span>
            {content.error.reload}
          </button>
          
          <button 
            onClick={() => window.location.href = '/'} 
            className="btn-outline"
          >
            <span className="material-symbols-outlined">home</span>
            {content.error.home}
          </button>
        </div>

        <div style={{ width: '100%' }}>
          <button 
            onClick={() => setShowDetails(!showDetails)}
            style={{ 
              background: 'transparent', border: 'none', 
              color: 'var(--md-sys-color-primary)', 
              fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px', margin: '0 auto'
            }}
          >
            {showDetails ? content.error.hide_details : content.error.show_details}
            <span className="material-symbols-outlined" style={{ fontSize: '18px', transform: showDetails ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.3s' }}>expand_more</span>
          </button>

          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                style={{ overflow: 'hidden', marginTop: '16px' }}
              >
                <div style={{ 
                  background: 'rgba(0,0,0,0.3)', 
                  borderRadius: '16px', 
                  padding: '16px', 
                  textAlign: 'left',
                  border: '1px solid rgba(255,255,255,0.1)',
                  position: 'relative'
                }}>
                  <button 
                    onClick={handleCopy}
                    style={{
                      position: 'absolute', top: '8px', right: '8px',
                      background: 'var(--md-sys-color-surface-container-high)',
                      border: 'none', borderRadius: '8px',
                      padding: '6px 12px', color: 'var(--md-sys-color-primary)',
                      cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
                      display: 'flex', alignItems: 'center', gap: '6px'
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                      {copied ? 'check' : 'content_copy'}
                    </span>
                    {copied ? content.error.copied : content.error.copy}
                  </button>

                  <code style={{ 
                    fontFamily: 'monospace', 
                    fontSize: '0.85rem', 
                    color: '#FFB4AB', 
                    whiteSpace: 'pre-wrap', 
                    wordBreak: 'break-word',
                    display: 'block',
                    marginTop: '24px'
                  }}>
                    {error?.toString()}
                    <br/><br/>
                    <span style={{ opacity: 0.6, fontSize: '0.75rem' }}>{error?.stack}</span>
                  </code>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </motion.div>
    </div>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorUI error={this.state.error} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;