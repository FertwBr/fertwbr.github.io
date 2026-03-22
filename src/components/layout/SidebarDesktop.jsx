import React from 'react';
import {Link} from 'react-router-dom';
import {motion, AnimatePresence} from 'framer-motion';
import {NAV_ITEMS} from './navShared';
import {SiteConfig} from '../../utils/siteConstants';

/**
 * SidebarDesktop component.
 * Renders the main navigation sidebar for desktop views with a minimalist footer.
 */
export default function SidebarDesktop({isExpanded, config, activePage, onNavigate, strings}) {
    const visibleItems = NAV_ITEMS.filter(item => {
        if (item.id === 'overview' && !config?.enableDocs) return false;
        return strings && strings[item.id];
    });

    return (
        <aside className={`app-sidebar-nav ${isExpanded ? 'side-nav-drawer' : 'side-nav-rail'}`}>
            <div className="sidebar-scroll-content">
                {visibleItems.map(item => {
                    const isActive = activePage === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate && onNavigate(item.id)}
                            className={`sidebar-menu-item ${isActive ? 'active' : ''}`}
                            title={!isExpanded ? strings?.[item.id] : undefined}
                        >
                            <span className="material-symbols-outlined">{item.icon}</span>
                            {isExpanded && <span className="sidebar-menu-text">{strings?.[item.id]}</span>}
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