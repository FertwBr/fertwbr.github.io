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
 * Configured to slide horizontally providing a seamless navigation feel.
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
 * Wraps page elements within a motion container to apply synchronized enter and exit animations.
 * Dynamically styled with a CSS class to ensure the container stretches and prevents CLS.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]
 * @returns {JSX.Element}
 */
export default function PageTransition({ children, className = "" }) {
    return (
        <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            variants={variants}
            className={`page-transition-wrapper ${className}`}
        >
            {children}
        </motion.div>
    );
}