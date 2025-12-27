import React from 'react';
import { motion } from 'framer-motion';

/**
 * Motion transition configuration used across the page animation variants.
 * @type {{duration: number, ease: number[]}}
 */
const transition = {
  duration: 0.5,
  ease: [0.25, 1, 0.5, 1]
};

/**
 * Framer Motion variants for the page transition wrapper.
 * Adjusted to slide horizontally (left-to-right feel) instead of vertical movement.
 *
 * @type {Object<string, import('framer-motion').TargetAndTransition>}
 */
const variants = {
  initial: {
    opacity: 0,
    x: -15,
    scale: 0.99
  },
  enter: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      ...transition,
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    x: 15,
    scale: 0.99,
    transition: {
      duration: 0.3,
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