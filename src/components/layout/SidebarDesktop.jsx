// src/components/layout/SidebarDesktop.jsx
import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {motion, AnimatePresence} from 'framer-motion';
import {NAV_ITEMS} from './navShared';
import {SiteConfig} from '../../utils/siteConstants';

/**
 * SidebarDesktop component.
 * Renders the main navigation sidebar for desktop views with a minimalist footer.
 *
 * @param {Object} props
 * @param {boolean} props.isExpanded
 * @param {boolean} props.isVisible
 * @param {Object} props.config
 * @param {string} props.activePage
 * @param {Function} props.onNavigate
 * @param {Object} props.strings
 * @returns {JSX.Element}
 */
export default function SidebarDesktop({isExpanded, isVisible, config, activePage, onNavigate, strings}) {
    const navigate = useNavigate();

    const visibleItems = NAV_ITEMS.filter(item => {
        if (item.id === 'feedback') return true;

        if (config?.pages && !config.pages[item.id] && item.id !== 'index') {
            return false;
        }

        if (item.id === 'overview' && !config?.enableDocs) return false;

        return strings && (strings[item.id] || item.id === 'feedback');
    });

    return (
        <aside
            className={`app-sidebar-nav ${isExpanded ? 'side-nav-drawer' : 'side-nav-rail'}`}
            style={{
                transform: isVisible ? 'translateX(0)' : 'translateX(-100%)',
                opacity: isVisible ? 1 : 0,
                pointerEvents: isVisible ? 'auto' : 'none',
                transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), width 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
            }}
        >
            <div className="sidebar-scroll-content">
                {visibleItems.map(item => {
                    const isActive = activePage === item.id;
                    const label = strings?.[item.id] || (item.id === 'feedback' ? 'Feedback' : item.id);

                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                if (item.id === 'feedback') {
                                    navigate('/feedback');
                                } else if (onNavigate) {
                                    onNavigate(item.id);
                                }
                            }}
                            className={`sidebar-menu-item ${isActive ? 'active' : ''}`}
                            title={!isExpanded ? label : undefined}
                        >
                            <span className="material-symbols-outlined">{item.icon}</span>
                            {isExpanded && <span className="sidebar-menu-text">{label}</span>}
                        </button>
                    );
                })}
            </div>

            <div className="sidebar-mini-footer" style={{
                padding: isExpanded ? '24px 20px' : '24px 0',
                opacity: 0.8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: isExpanded ? 'flex-start' : 'center',
                gap: '16px',
                transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                overflow: 'hidden'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: isExpanded ? 'row' : 'column',
                    gap: '16px',
                    alignItems: 'center',
                    transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
                }}>
                    <motion.a
                        href={SiteConfig.links.githubProfile}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{color: 'var(--md-sys-color-primary)'}}
                        style={{
                            color: 'var(--md-sys-color-on-surface-variant)',
                            textDecoration: 'none',
                            display: 'flex'
                        }}
                    >
                        <span className="material-symbols-outlined" style={{fontSize: '22px'}}>code</span>
                    </motion.a>
                    <motion.a
                        href={SiteConfig.links.mailTo}
                        whileHover={{color: 'var(--md-sys-color-primary)'}}
                        style={{
                            color: 'var(--md-sys-color-on-surface-variant)',
                            textDecoration: 'none',
                            display: 'flex'
                        }}
                    >
                        <span className="material-symbols-outlined" style={{fontSize: '22px'}}>mail</span>
                    </motion.a>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isExpanded ? 'flex-start' : 'center',
                    gap: '4px',
                    width: '100%',
                    whiteSpace: 'nowrap'
                }}>
                    <AnimatePresence mode="wait">
                        {isExpanded && (
                            <motion.p
                                key="copyright"
                                initial={{opacity: 0, height: 0}}
                                animate={{opacity: 1, height: 'auto'}}
                                exit={{opacity: 0, height: 0}}
                                style={{
                                    margin: 0,
                                    fontSize: '0.75rem',
                                    color: 'var(--md-sys-color-on-surface-variant)'
                                }}
                            >
                                © {SiteConfig.getCopyrightYear()} {SiteConfig.meta.author}
                            </motion.p>
                        )}
                    </AnimatePresence>
                    <Link
                        to={SiteConfig.routes.siteChangelog}
                        style={{
                            color: 'var(--md-sys-color-primary)',
                            textDecoration: 'none',
                            fontWeight: 600,
                            fontFamily: 'monospace',
                            fontSize: isExpanded ? '0.8rem' : '0.7rem',
                            transition: 'all 0.3s ease',
                            marginTop: isExpanded ? '4px' : '0'
                        }}
                    >
                        v{isExpanded ? SiteConfig.meta.version : SiteConfig.meta.version.split('.')[0]}
                    </Link>
                </div>
            </div>
        </aside>
    );
}