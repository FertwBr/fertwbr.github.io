import React from 'react';
import { motion } from 'framer-motion';

const transition = { 
  duration: 0.6, 
  ease: [0.22, 1, 0.36, 1] 
};

const variants = {
  initial: { 
    opacity: 0, 
    y: 40,
    scale: 0.98 
  },
  enter: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      ...transition,
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    scale: 0.98,
    transition: { 
      duration: 0.4, 
      ease: "easeInOut" 
    }
  }
};

export default function PageTransition({ children, className = "" }) {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={variants}
      className={className}
      style={{ width: '100%', position: 'relative' }}
    >
      {children}
    </motion.div>
  );
}