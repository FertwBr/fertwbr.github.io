// src/components/common/UniversalControls.jsx
import React, {useState, useRef, useEffect, useLayoutEffect} from 'react';
import {
    getThemeOptions,
    setThemeColor,
    resetTheme,
    getSavedTheme,
    getThemeMode,
    setThemeMode
} from '../../theme/themeUtils';
import {useLanguage} from '../../context/LanguageContext';
import DynamicLanguageFlag from '../ui/DynamicLanguageFlag';

const LANGUAGE_LABELS = {
    en: "English", pt: "Português", de: "Deutsch",
    ja: "日本語", hi: "हिन्दी", es: "Español"
};

/**
 * Renders a single interactive menu item for the dropdown components.
 */
const MenuItem = ({active, onClick, children, leading}) => {
    return (
        <button
            onClick={onClick}
            className={`footer-menu-item ${active ? 'active' : ''}`}
        >
            {leading && (
                <div className="footer-menu-item-leading">
                    {leading}
                </div>
            )}
            <span style={{flex: 1, textAlign: 'left'}}>{children}</span>
            {active && (
                <span className="material-symbols-outlined" style={{fontSize: '18px'}}>
                    check
                </span>
            )}
        </button>
    );
};

/**
 * Smart dropdown that automatically adapts between Desktop (Full) and Mobile (Compact) styles.
 * It features dynamic viewport positioning to prevent horizontal overflow on small screens.
 */
const SmartDropdown = ({icon, label, isOpen, onClick, align = 'left', children, compact, customIcon}) => {
    const buttonRef = useRef(null);
    const [dynamicAlign, setDynamicAlign] = useState({});

    useLayoutEffect(() => {
        if (isOpen && compact && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const menuWidth = 220;

            let newAlign = {
                bottom: 'calc(100% + 12px)',
                zIndex: 200,
                minWidth: '200px'
            };

            if (rect.left < (menuWidth / 2)) {
                newAlign.left = '0';
                newAlign.transform = 'none';
            } else if ((viewportWidth - rect.right) < (menuWidth / 2)) {
                newAlign.right = '0';
                newAlign.left = 'auto';
                newAlign.transform = 'none';
            } else {
                newAlign.left = '50%';
                newAlign.transform = 'translateX(-50%)';
            }

            setDynamicAlign(newAlign);
        }
    }, [isOpen, compact]);

    return (
        <div className="footer-dropdown-wrapper" style={compact ? {position: 'relative'} : undefined}>
            <button
                ref={buttonRef}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                }}
                className={`footer-dropdown-btn ${isOpen ? 'open' : ''}`}
                style={compact ? {
                    padding: '0',
                    borderRadius: '50%',
                    width: '44px',
                    height: '44px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: isOpen ? 'var(--md-sys-color-secondary-container)' : 'var(--md-sys-color-surface-container-high)',
                    color: isOpen ? 'var(--md-sys-color-on-secondary-container)' : 'var(--md-sys-color-on-surface)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                } : undefined}
                title={label}
            >
                {customIcon ? customIcon : (
                    <span className="material-symbols-outlined" style={{fontSize: compact ? '22px' : '20px'}}>
                        {icon}
                    </span>
                )}
                {!compact && label}
                {!compact && (
                    <span
                        className="material-symbols-outlined footer-dropdown-icon"
                        style={{transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}}
                    >
                        expand_less
                    </span>
                )}
            </button>

            <div
                className={`footer-dropdown-menu align-${align} ${isOpen ? 'open' : ''}`}
                style={compact ? dynamicAlign : undefined}
            >
                <div className="footer-dropdown-scroll-area" data-lenis-prevent="true">
                    {children}
                </div>
            </div>
        </div>
    );
};

/**
 * Universal controls for Theme Mode, Theme Color, and Language.
 * @param {Object} props
 * @param {boolean} [props.compact=false] - Renders as floating circular icons without labels.
 * @param {string} [props.title] - Optional section title for standard view.
 */
export default function UniversalControls({compact = false, title}) {
    const {changeLanguage, language, availableLanguages, isAuto: isLangAuto, content} = useLanguage();
    const themes = getThemeOptions();
    const savedTheme = getSavedTheme();
    const isThemeAuto = !savedTheme;
    const themeMode = getThemeMode();

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

    const toggleMenu = (menu) => {
        setActiveMenu(activeMenu === menu ? null : menu);
    };

    const modeLabels = {
        auto: content?.footer?.appearance?.mode_auto || "Auto",
        light: content?.footer?.appearance?.mode_light || "Light",
        dark: content?.footer?.appearance?.mode_dark || "Dark"
    };

    const modeIcons = {
        auto: "brightness_auto",
        light: "light_mode",
        dark: "dark_mode"
    };

    const getThemeName = (themeObj) => {
        if (!themeObj) return content?.footer?.appearance?.title || "Theme";
        const themeKey = (themeObj.name || themeObj.id || themeObj.value || "").toLowerCase();
        return content?.footer?.themes?.[themeKey] || themeObj.name || "Theme";
    };

    const currentThemeObj = themes.find(t => t.value === savedTheme);
    const themeButtonLabel = isThemeAuto
        ? (content?.footer?.appearance?.mode_auto || "Auto")
        : getThemeName(currentThemeObj);

    const activeColorCircle = (
        <div style={{
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            background: isThemeAuto
                ? 'linear-gradient(135deg, var(--md-sys-color-primary) 0%, var(--md-sys-color-primary-container) 100%)'
                : `linear-gradient(135deg, ${savedTheme} 0%, ${savedTheme} 60%, rgba(0,0,0,0.2) 100%)`,
            border: '1px solid var(--md-sys-color-outline-variant)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
        }}/>
    );

    return (
        <div
            ref={controlsRef}
            style={{
                display: 'flex',
                flexDirection: compact ? 'row' : 'column',
                gap: compact ? '8px' : '24px',
                alignItems: compact ? 'center' : 'flex-start'
            }}
        >
            {!compact && title && (
                <h3 style={{
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    color: 'var(--md-sys-color-on-surface-variant)',
                    fontWeight: 700,
                    margin: 0
                }}>
                    {title}
                </h3>
            )}

            <div style={{
                display: 'flex',
                gap: compact ? '8px' : '12px',
                flexWrap: 'wrap',
                alignItems: 'center'
            }}>
                <SmartDropdown
                    icon={modeIcons[themeMode] || "brightness_auto"}
                    label={modeLabels[themeMode] || "Auto"}
                    isOpen={activeMenu === 'mode'}
                    onClick={() => toggleMenu('mode')}
                    align="left"
                    compact={compact}
                >
                    <MenuItem active={themeMode === 'auto'} onClick={() => { setThemeMode('auto'); setActiveMenu(null); }} leading={<span className="material-symbols-outlined" style={{fontSize: '20px'}}>brightness_auto</span>}>{modeLabels.auto}</MenuItem>
                    <div style={{ height: '1px', background: 'var(--md-sys-color-outline-variant)', margin: '6px 0', opacity: 0.5 }}/>
                    <MenuItem active={themeMode === 'light'} onClick={() => { setThemeMode('light'); setActiveMenu(null); }} leading={<span className="material-symbols-outlined" style={{fontSize: '20px'}}>light_mode</span>}>{modeLabels.light}</MenuItem>
                    <MenuItem active={themeMode === 'dark'} onClick={() => { setThemeMode('dark'); setActiveMenu(null); }} leading={<span className="material-symbols-outlined" style={{fontSize: '20px'}}>dark_mode</span>}>{modeLabels.dark}</MenuItem>
                </SmartDropdown>

                <SmartDropdown
                    icon="palette"
                    label={themeButtonLabel}
                    isOpen={activeMenu === 'theme'}
                    onClick={() => toggleMenu('theme')}
                    align="center"
                    compact={compact}
                    customIcon={compact ? activeColorCircle : null}
                >
                    <MenuItem active={isThemeAuto} onClick={() => { resetTheme(); setActiveMenu(null); }} leading={<span className="material-symbols-outlined" style={{fontSize: '20px'}}>auto_awesome</span>}>{content?.footer?.appearance?.mode_auto || "Auto"}</MenuItem>
                    <div style={{ height: '1px', background: 'var(--md-sys-color-outline-variant)', margin: '6px 0', opacity: 0.5 }}/>
                    {themes.map(t => (
                        <MenuItem key={t.value} active={!isThemeAuto && savedTheme === t.value} onClick={() => { setThemeColor(t.value); setActiveMenu(null); }} leading={<div style={{ width: '30px', height: '30px', borderRadius: '10px', background: `linear-gradient(135deg, ${t.value} 0%, ${t.value} 60%, rgba(var(--md-sys-color-shadow-rgb, 0,0,0), 0.15) 100%)`, border: '1px solid var(--md-sys-color-outline-variant)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--md-sys-color-on-primary)' }}/></div>}>
                            {getThemeName(t)}
                        </MenuItem>
                    ))}
                </SmartDropdown>

                <SmartDropdown
                    icon="translate"
                    label={content?.footer?.appearance?.[language] || LANGUAGE_LABELS[language] || language.toUpperCase()}
                    isOpen={activeMenu === 'lang'}
                    onClick={() => toggleMenu('lang')}
                    align="right"
                    compact={compact}
                    customIcon={compact ? <div style={{width:'22px', height:'22px', display:'flex', alignItems:'center', justifyContent:'center'}}><DynamicLanguageFlag languageCode={language}/></div> : null}
                >
                    <MenuItem active={isLangAuto} onClick={() => { changeLanguage('auto'); setActiveMenu(null); }} leading={<span className="material-symbols-outlined" style={{fontSize: '20px'}}>auto_awesome</span>}>{content?.footer?.appearance?.mode_auto || "Auto"}</MenuItem>
                    <div style={{ height: '1px', background: 'var(--md-sys-color-outline-variant)', margin: '6px 0', opacity: 0.5 }}/>
                    {availableLanguages.map(code => (
                        <MenuItem key={code} active={!isLangAuto && language === code} onClick={() => { changeLanguage(code); setActiveMenu(null); }} leading={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '22px' }}><DynamicLanguageFlag languageCode={code}/></div>}>
                            {content?.footer?.appearance?.[code] || LANGUAGE_LABELS[code]}
                        </MenuItem>
                    ))}
                </SmartDropdown>
            </div>
        </div>
    );
}