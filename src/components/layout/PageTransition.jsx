import React from 'react';
import { motion } from 'framer-motion';

/**
 * Motion transition configuration used across the page animation variants.
 * @type {{duration: number, ease: number[]}}
 */
const transition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1]
};

/**
 * Framer Motion variants for the page transition wrapper.
 * - `initial`: starting state when component mounts
 * - `enter`: animate to this state
 * - `exit`: state when leaving
 *
 * @type {Object<string, import('framer-motion').TargetAndTransition>}
 */
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

/**
 * PageTransition
 * Wraps children with a motion container applying page-level enter/exit animations.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to render inside the transition wrapper.
 * @param {string} [props.className] - Optional CSS class name applied to the wrapper.
 * @returns {JSX.Element}
 */
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