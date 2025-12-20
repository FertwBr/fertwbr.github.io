import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingSpinner({ size = 48, color = 'var(--md-sys-color-primary)' }) {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: '60px',
      width: '100%'
    }}>
      <motion.span 
        className="material-symbols-outlined"
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 1, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        style={{ 
          fontSize: `${size}px`, 
          color: color,
          userSelect: 'none'
        }}
      >
        sync
      </motion.span>
    </div>
  );
}