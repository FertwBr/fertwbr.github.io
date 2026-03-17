import React, {useState, useRef, useEffect} from 'react';
import {
    getThemeOptions,
    setThemeColor,
    resetTheme,
    getSavedTheme,
    getThemeMode,
    setThemeMode
} from '../../theme/themeUtils';
import {useLanguage} from '../../context/LanguageContext';

/**
 * Maps language codes to friendly display labels.
 */
const LANGUAGE_LABELS = {
    en: "English", pt: "Português", de: "Deutsch",
    ja: "日本語", hi: "हिन्दी", es: "Español"
};

/**
 * Maps language codes to flag emojis.
 */
const LANGUAGE_FLAGS = {
    en: "🇺🇸",
    pt: "🇧🇷",
    de: "🇩🇪",
    ja: "🇯🇵",
    hi: "🇮🇳",
    es: "🇪🇸"
};

const MenuItem = ({active, onClick, children, leading}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                background: active
                    ? 'var(--md-sys-color-secondary-container)'
                    : (isHovered
                        ? 'var(--md-sys-color-surface-container-highest)'
                        : 'transparent'),

                color: active
                    ? 'var(--md-sys-color-on-secondary-container)'
                    : 'var(--md-sys-color-on-surface)',

                border: 'none',
                padding: '12px 14px',
                textAlign: 'left',
                cursor: 'pointer',
                borderRadius: '12px',
                fontSize: '0.92rem',
                fontWeight: active ? 600 : 500,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'background 0.2s, transform 0.12s',
                width: '100%',
                whiteSpace: 'nowrap',
                transform: isHovered ? 'scale(1.01)' : 'scale(1)'
            }}
        >
            {leading && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '28px'
                }}>
                    {leading}
                </div>
            )}

            <span style={{flex: 1}}>
                {children}
            </span>

            {active && (
                <span className="material-symbols-outlined" style={{fontSize: '18px'}}>
                    check
                </span>
            )}
        </button>
    );
};

const DropdownButton = ({icon, label, isOpen, onClick, children}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div style={{position: 'relative'}}>
            <button
                onClick={onClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    background: isOpen || isHovered
                        ? 'var(--md-sys-color-surface-container-highest)'
                        : 'var(--md-sys-color-surface-container-high)',

                    border: '1px solid var(--md-sys-color-outline-variant)',
                    color: 'var(--md-sys-color-on-surface)',
                    padding: '10px 18px',
                    borderRadius: '999px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap',
                    boxShadow: isOpen ? '0 2px 8px rgba(0,0,0,0.12)' : 'none'
                }}
            >
                <span className="material-symbols-outlined" style={{fontSize: '20px'}}>
                    {icon}
                </span>

                {label}

                <span
                    className="material-symbols-outlined"
                    style={{
                        fontSize: '18px',
                        transition: 'transform 0.3s cubic-bezier(0.2,0,0,1)',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                >
                    expand_less
                </span>
            </button>

            <div
                style={{
                    position: 'absolute',
                    bottom: 'calc(100% + 10px)',
                    left: 0,
                    background: 'var(--md-sys-color-surface-container-high)',
                    borderRadius: '20px',
                    padding: '10px',
                    boxShadow: '0 10px 32px rgba(var(--md-sys-color-shadow-rgb, 0,0,0), 0.22)',
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: '240px',
                    zIndex: 100,
                    border: '1px solid var(--md-sys-color-outline-variant)',
                    opacity: isOpen ? 1 : 0,
                    visibility: isOpen ? 'visible' : 'hidden',
                    transform: isOpen
                        ? 'translateY(0) scale(1)'
                        : 'translateY(12px) scale(0.94)',
                    transformOrigin: 'bottom left',
                    transition: 'all 0.22s cubic-bezier(0.2,0,0,1)',
                    gap: '2px'
                }}
            >
                {children}
            </div>
        </div>
    );
};

/**
 * Footer controls for managing site theme, mode (light/dark) and language.
 * @param {Object} props
 * @param {string} props.title
 */
export default function FooterControls({title}) {
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
        auto: content.footer?.appearance?.mode_auto || "Auto",
        light: content.footer?.appearance?.mode_light || "Light",
        dark: content.footer?.appearance?.mode_dark || "Dark"
    };

    const modeIcons = {
        auto: "brightness_auto",
        light: "light_mode",
        dark: "dark_mode"
    };

    return (
        <div
            ref={controlsRef}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                alignItems: 'flex-start'
            }}
        >
            {title && (
                <h3
                    style={{
                        fontSize: '0.8rem',
                        textTransform: 'uppercase',
                        letterSpacing: '1.5px',
                        color: 'var(--md-sys-color-on-surface-variant)',
                        fontWeight: 700,
                        margin: 0
                    }}
                >
                    {title}
                </h3>
            )}

            <div style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap'
            }}>

                <DropdownButton
                    icon={modeIcons[themeMode] || "brightness_auto"}
                    label={modeLabels[themeMode] || "Auto"}
                    isOpen={activeMenu === 'mode'}
                    onClick={() => toggleMenu('mode')}
                >
                    <MenuItem
                        active={themeMode === 'auto'}
                        onClick={() => {
                            setThemeMode('auto');
                            setActiveMenu(null);
                        }}
                        leading={
                            <span className="material-symbols-outlined" style={{fontSize: '20px'}}>
                                brightness_auto
                            </span>
                        }
                    >
                        {modeLabels.auto}
                    </MenuItem>

                    <div style={{
                        height: '1px',
                        background: 'var(--md-sys-color-outline-variant)',
                        margin: '6px 0',
                        opacity: 0.5
                    }}/>

                    <MenuItem
                        active={themeMode === 'light'}
                        onClick={() => {
                            setThemeMode('light');
                            setActiveMenu(null);
                        }}
                        leading={
                            <span className="material-symbols-outlined" style={{fontSize: '20px'}}>
                                light_mode
                            </span>
                        }
                    >
                        {modeLabels.light}
                    </MenuItem>

                    <MenuItem
                        active={themeMode === 'dark'}
                        onClick={() => {
                            setThemeMode('dark');
                            setActiveMenu(null);
                        }}
                        leading={
                            <span className="material-symbols-outlined" style={{fontSize: '20px'}}>
                                dark_mode
                            </span>
                        }
                    >
                        {modeLabels.dark}
                    </MenuItem>
                </DropdownButton>

                <DropdownButton
                    icon="palette"
                    label={isThemeAuto ? 'Auto' : 'Theme'}
                    isOpen={activeMenu === 'theme'}
                    onClick={() => toggleMenu('theme')}
                >

                    <MenuItem
                        active={isThemeAuto}
                        onClick={() => {
                            resetTheme();
                            setActiveMenu(null);
                        }}
                        leading={
                            <span className="material-symbols-outlined" style={{fontSize: '20px'}}>
                                auto_awesome
                            </span>
                        }
                    >
                        Auto
                    </MenuItem>

                    <div style={{
                        height: '1px',
                        background: 'var(--md-sys-color-outline-variant)',
                        margin: '6px 0',
                        opacity: 0.5
                    }}/>

                    {themes.map(t => (
                        <MenuItem
                            key={t.value}
                            active={!isThemeAuto && savedTheme === t.value}
                            onClick={() => {
                                setThemeColor(t.value);
                                setActiveMenu(null);
                            }}
                            leading={
                                <div style={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '10px',
                                    background: `linear-gradient(135deg, ${t.value} 0%, ${t.value} 60%, rgba(var(--md-sys-color-shadow-rgb, 0,0,0), 0.15) 100%)`,
                                    border: '1px solid var(--md-sys-color-outline-variant)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 1px 3px rgba(var(--md-sys-color-shadow-rgb, 0,0,0), 0.25)'
                                }}>
                                    <div style={{
                                        width: '12px',
                                        height: '12px',
                                        borderRadius: '50%',
                                        background: 'var(--md-sys-color-on-primary)'
                                    }}/>
                                </div>
                            }
                        >
                            {t.name}
                        </MenuItem>
                    ))}

                </DropdownButton>

                <DropdownButton
                    icon="translate"
                    label={LANGUAGE_LABELS[language] || language.toUpperCase()}
                    isOpen={activeMenu === 'lang'}
                    onClick={() => toggleMenu('lang')}
                >

                    <MenuItem
                        active={isLangAuto}
                        onClick={() => {
                            changeLanguage('auto');
                            setActiveMenu(null);
                        }}
                        leading={
                            <span className="material-symbols-outlined" style={{fontSize: '20px'}}>
                                auto_awesome
                            </span>
                        }
                    >
                        Auto
                    </MenuItem>

                    <div style={{
                        height: '1px',
                        background: 'var(--md-sys-color-outline-variant)',
                        margin: '6px 0',
                        opacity: 0.5
                    }}/>

                    {availableLanguages.map(code => (
                        <MenuItem
                            key={code}
                            active={!isLangAuto && language === code}
                            onClick={() => {
                                changeLanguage(code);
                                setActiveMenu(null);
                            }}
                            leading={
                                <span style={{fontSize: '20px'}}>
                                    {LANGUAGE_FLAGS[code] || "🌐"}
                                </span>
                            }
                        >
                            {LANGUAGE_LABELS[code]}
                        </MenuItem>
                    ))}

                </DropdownButton>

            </div>
        </div>
    );
}