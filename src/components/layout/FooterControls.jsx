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
import DynamicLanguageFlag from '../ui/DynamicLanguageFlag';

/**
 * Maps language codes to friendly display labels as a fallback.
 * @type {Record<string, string>}
 */
const LANGUAGE_LABELS = {
    en: "English", pt: "Português", de: "Deutsch",
    ja: "日本語", hi: "हिन्दी", es: "Español"
};

/**
 * Renders a single interactive menu item for the dropdown components.
 *
 * @param {Object} props
 * @param {boolean} props.active
 * @param {Function} props.onClick
 * @param {React.ReactNode} props.children
 * @param {React.ReactNode} [props.leading]
 * @returns {JSX.Element}
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
            <span style={{flex: 1}}>{children}</span>
            {active && (
                <span className="material-symbols-outlined" style={{fontSize: '18px'}}>
                    check
                </span>
            )}
        </button>
    );
};

/**
 * Renders a dropdown button that toggles a floating menu.
 * Employs an inner scroller with Lenis prevention to ensure native scrolling works flawlessly.
 *
 * @param {Object} props
 * @param {string} props.icon
 * @param {string} props.label
 * @param {boolean} props.isOpen
 * @param {Function} props.onClick
 * @param {string} [props.align='left'] - Determines anchor direction ('left', 'center', 'right').
 * @param {React.ReactNode} props.children
 * @returns {JSX.Element}
 */
const DropdownButton = ({icon, label, isOpen, onClick, align = 'left', children}) => {
    return (
        <div className="footer-dropdown-wrapper">
            <button
                onClick={onClick}
                className={`footer-dropdown-btn ${isOpen ? 'open' : ''}`}
            >
                <span className="material-symbols-outlined" style={{fontSize: '20px'}}>
                    {icon}
                </span>
                {label}
                <span
                    className="material-symbols-outlined footer-dropdown-icon"
                    style={{transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}}
                >
                    expand_less
                </span>
            </button>

            <div className={`footer-dropdown-menu align-${align} ${isOpen ? 'open' : ''}`}>
                <div className="footer-dropdown-scroll-area" data-lenis-prevent="true">
                    {children}
                </div>
            </div>
        </div>
    );
};

/**
 * Footer controls for managing site theme, appearance mode, and language selection.
 * Integrates dynamic regional flags based on user timezone.
 *
 * @param {Object} props
 * @param {string} [props.title]
 * @returns {JSX.Element}
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

    const getThemeName = (themeObj) => {
        if (!themeObj) return content.footer?.appearance?.title || "Theme";
        const themeKey = (themeObj.name || themeObj.id || themeObj.value || "").toLowerCase();
        return content.footer?.themes?.[themeKey] || themeObj.name || "Theme";
    };

    const currentThemeObj = themes.find(t => t.value === savedTheme);
    const themeButtonLabel = isThemeAuto
        ? (content.footer?.appearance?.mode_auto || "Auto")
        : getThemeName(currentThemeObj);

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
                    align="left"
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
                    label={themeButtonLabel}
                    isOpen={activeMenu === 'theme'}
                    onClick={() => toggleMenu('theme')}
                    align="center"
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
                        {content.footer?.appearance?.mode_auto || "Auto"}
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
                            {getThemeName(t)}
                        </MenuItem>
                    ))}
                </DropdownButton>

                <DropdownButton
                    icon="translate"
                    label={content.footer?.appearance?.[language] || LANGUAGE_LABELS[language] || language.toUpperCase()}
                    isOpen={activeMenu === 'lang'}
                    onClick={() => toggleMenu('lang')}
                    align="right"
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
                        {content.footer?.appearance?.mode_auto || "Auto"}
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
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '22px'
                                }}>
                                    <DynamicLanguageFlag languageCode={code}/>
                                </div>
                            }
                        >
                            {content.footer?.appearance?.[code] || LANGUAGE_LABELS[code]}
                        </MenuItem>
                    ))}
                </DropdownButton>

            </div>
        </div>
    );
}