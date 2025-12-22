import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * @typedef {Object} SelectOption
 * @property {string} value - The internal value of the option.
 * @property {string} label - The visible text of the option.
 */

/**
 * Custom Select component with animations and Glassmorphism styling.
 * Replaces the native \<select\> to ensure consistent design across OSes.
 *
 * @component
 * @param {Object} props
 * @param {string} props.label - The label displayed above the input.
 * @param {string} props.value - The currently selected value.
 * @param {function(string): void} props.onChange - Callback invoked when an option is selected.
 * @param {SelectOption[]} props.options - Array of objects with {value, label}.
 * @returns {JSX.Element} The custom Select element.
 */
const CustomSelect = ({ label, value, onChange, options }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const selectedLabel = options.find(opt => opt.value === value)?.label || value;

    return (
        <div className="input-wrapper" ref={containerRef}>
            {label && <label className="input-label">{label}</label>}

            <div style={{ position: 'relative', width: '100%' }}>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="custom-input"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        textAlign: 'left',
                        cursor: 'pointer',
                        paddingRight: '16px'
                    }}
                >
                    <span style={{
                        color: 'var(--md-sys-color-on-surface)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        marginRight: '8px'
                    }}>
                        {selectedLabel}
                    </span>

                    <span
                        className="material-symbols-outlined"
                        style={{
                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease',
                            color: 'var(--md-sys-color-on-surface-variant)',
                            fontSize: '24px',
                            flexShrink: 0
                        }}
                    >
                        expand_more
                    </span>
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 4, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.98 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                right: 0,
                                background: 'var(--md-sys-color-surface-container-high)',
                                border: '1px solid var(--md-sys-color-outline-variant)',
                                borderRadius: '16px',
                                padding: '8px',
                                zIndex: 100,
                                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                                maxHeight: '250px',
                                overflowY: 'auto'
                            }}
                        >
                            {options.map((opt) => (
                                <div
                                    key={opt.value}
                                    onClick={() => {
                                        onChange(opt.value);
                                        setIsOpen(false);
                                    }}
                                    style={{
                                        padding: '12px 16px',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        color: value === opt.value ? 'var(--md-sys-color-on-secondary-container)' : 'var(--md-sys-color-on-surface)',
                                        background: value === opt.value ? 'var(--md-sys-color-secondary-container)' : 'transparent',
                                        marginBottom: '4px',
                                        transition: 'background 0.2s',
                                        fontSize: '0.95rem',
                                        fontWeight: value === opt.value ? 600 : 400,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (value !== opt.value) e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                                    }}
                                    onMouseLeave={(e) => {
                                        if (value !== opt.value) e.currentTarget.style.background = 'transparent';
                                    }}
                                >
                                    {opt.label}
                                    {value === opt.value && (
                                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>check</span>
                                    )}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

CustomSelect.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
    })).isRequired
};

export default CustomSelect;