import React, { useState, useRef, useEffect } from 'react';
import { getThemeOptions, setThemeColor, resetTheme, getSavedTheme } from '../../theme/themeUtils';
import { useLanguage } from '../../context/LanguageContext';

const LANGUAGE_LABELS = {
    en: "English", pt: "Português", de: "Deutsch",
    ja: "日本語", hi: "हिन्दी", es: "Español"
};

const MenuItem = ({ active, onClick, children, icon }) => (
    <button
        onClick={onClick}
        style={{
            background: active ? 'var(--md-sys-color-secondary-container)' : 'transparent',
            color: active ? 'var(--md-sys-color-on-secondary-container)' : 'var(--md-sys-color-on-surface)',
            border: 'none', padding: '10px 16px', textAlign: 'left',
            cursor: 'pointer', borderRadius: '8px', fontSize: '0.9rem',
            fontWeight: active ? 600 : 400,
            display: 'flex', alignItems: 'center', gap: '12px',
            transition: 'background 0.2s', width: '100%',
            whiteSpace: 'nowrap'
        }}
    >
        <span className="material-symbols-outlined" style={{ fontSize: '18px', opacity: (active || icon) ? 1 : 0 }}>
            {icon || 'check'}
        </span>
        {children}
    </button>
);

const DropdownButton = ({ icon, label, isOpen, onClick, children }) => (
    <div style={{ position: 'relative' }}>
        <button
            onClick={onClick}
            style={{
                background: isOpen ? 'var(--md-sys-color-surface-container-highest)' : 'transparent',
                border: '1px solid var(--md-sys-color-outline)',
                color: 'var(--md-sys-color-on-surface)',
                padding: '8px 16px', borderRadius: '100px',
                display: 'flex', alignItems: 'center', gap: '8px',
                fontSize: '0.85rem', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap'
            }}
        >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>{icon}</span>
            {label}
            <span className="material-symbols-outlined" style={{
                fontSize: '18px', transition: 'transform 0.3s cubic-bezier(0.2, 0, 0, 1)',
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
            }}>expand_less</span>
        </button>

        <div style={{
            position: 'absolute', bottom: 'calc(100% + 8px)', left: 0,
            background: 'var(--md-sys-color-surface-container-high)',
            borderRadius: '16px', padding: '8px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
            display: 'flex', flexDirection: 'column',
            minWidth: '200px', zIndex: 100,
            border: '1px solid var(--md-sys-color-outline-variant)',
            opacity: isOpen ? 1 : 0,
            visibility: isOpen ? 'visible' : 'hidden',
            transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.95)',
            transformOrigin: 'bottom left',
            transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)'
        }}>
            {children}
        </div>
    </div>
);

export default function FooterControls({ title }) {
    const { changeLanguage, language, availableLanguages, isAuto: isLangAuto } = useLanguage();
    const themes = getThemeOptions();
    const savedTheme = getSavedTheme();
    const isThemeAuto = !savedTheme;

    const [activeMenu, setActiveMenu] = useState(null);
    const controlsRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (controlsRef.current && !controlsRef.current.contains(event.target)) {
                setActiveMenu(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleMenu = (menu) => setActiveMenu(activeMenu === menu ? null : menu);

    return (
        <div ref={controlsRef} style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
            {title && (
                <h3 style={{
                    fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1.5px',
                    color: 'var(--md-sys-color-on-surface-variant)', fontWeight: 700
                }}>
                    {title}
                </h3>
            )}

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <DropdownButton
                    icon="palette"
                    label={isThemeAuto ? 'Auto' : 'Custom'}
                    isOpen={activeMenu === 'theme'}
                    onClick={() => toggleMenu('theme')}
                >
                    <MenuItem active={isThemeAuto} icon="auto_awesome" onClick={() => { resetTheme(); setActiveMenu(null); }}>
                        Auto
                    </MenuItem>
                    <div style={{height: '1px', background: 'var(--md-sys-color-outline-variant)', margin: '4px 0', opacity: 0.5}}/>
                    {themes.map(t => (
                        <MenuItem
                            key={t.value}
                            active={!isThemeAuto && savedTheme === t.value}
                            icon="circle"
                            onClick={() => { setThemeColor(t.value); setActiveMenu(null); }}
                        >
                            <span style={{color: t.value, marginRight: '8px'}}>●</span> {t.name}
                        </MenuItem>
                    ))}
                </DropdownButton>

                <DropdownButton
                    icon="translate"
                    label={LANGUAGE_LABELS[language] || language.toUpperCase()}
                    isOpen={activeMenu === 'lang'}
                    onClick={() => toggleMenu('lang')}
                >
                    <MenuItem active={isLangAuto} icon="auto_awesome" onClick={() => { changeLanguage('auto'); setActiveMenu(null); }}>
                        Auto
                    </MenuItem>
                    <div style={{height: '1px', background: 'var(--md-sys-color-outline-variant)', margin: '4px 0', opacity: 0.5}}/>
                    {availableLanguages.map(code => (
                        <MenuItem
                            key={code}
                            active={!isLangAuto && language === code}
                            onClick={() => { changeLanguage(code); setActiveMenu(null); }}
                        >
                            {LANGUAGE_LABELS[code]}
                        </MenuItem>
                    ))}
                </DropdownButton>
            </div>
        </div>
    );
}