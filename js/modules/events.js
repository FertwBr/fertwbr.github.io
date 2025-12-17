import { loadPage, getUiString, setLanguage } from './core.js';
import { updateTheme, getStorageKey } from './theme.js';
import { buildThemeSelector, buildLanguageSelector, buildNavigation, buildFooter } from './dom-builder.js';

function setSheetOpen(isOpen) {
    document.getElementById('custom-sheet-menu')?.classList.toggle('open', isOpen);
}

function handleNavigation(pageId) {
    if (!pageId) return;
    
    const currentPage = new URLSearchParams(window.location.search).get('page') || 'index';
    const drawer = document.querySelector('md-navigation-drawer');
    if (drawer && drawer.opened) drawer.opened = false;
    
    if (pageId !== currentPage) {
        setTimeout(() => loadPage(pageId), 150); 
    }
}

export function scrollToElement(targetElement) {
    if (!targetElement) return;
    const topAppBarHeight = document.querySelector('md-top-app-bar')?.offsetHeight || 64;
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - topAppBarHeight - 24;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

export function setupSheetScrollBehavior() {
    const sheet = document.getElementById('custom-sheet-menu');

    window.addEventListener('scroll', () => {
        if (sheet && sheet.classList.contains('open')) {
            setSheetOpen(false);
        }
    }, { passive: true });
}

function handleAnchorLink(anchorLink) {
    const targetId = anchorLink.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId) || document.querySelector(`[data-toc-key="${targetId}"]`);

    if (targetElement) {
        scrollToElement(targetElement);
    }
}

export function setupNavigation() {
    document.addEventListener('click', (e) => {
        const moreButton = e.target.closest('#mobile-more-button');
        const pageLink = e.target.closest('[data-page-id]');
        const anchorLink = e.target.closest('a[href^="#"]');
        const sheetMenu = document.getElementById('custom-sheet-menu');
        
        if (moreButton) {
            e.preventDefault();
            setSheetOpen(true);
            return;
        }

        if (pageLink) {
            e.preventDefault();
            handleNavigation(pageLink.dataset.pageId);
            setSheetOpen(false);
            return;
        }
        
        if (anchorLink) {
            e.preventDefault();
            handleAnchorLink(anchorLink);
            setSheetOpen(false);
            return;
        }

        if (sheetMenu && sheetMenu.classList.contains('open') && !e.target.closest('.sheet-content')) {
            setSheetOpen(false);
        }
    });
}

export function setupScrollBehavior() {
    const backToTopFab = document.getElementById('back-to-top');
    const elementsToHide = document.querySelectorAll('.custom-nav-bar, .fab-container, .fab-container-left');
    if (elementsToHide.length === 0) return;
    
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const isScrollingDown = currentScrollY > lastScrollY;
        
        if (isScrollingDown && currentScrollY > 150) {
            elementsToHide.forEach(el => el.classList.add('hide'));
        } else if (!isScrollingDown || currentScrollY < 50) {
            elementsToHide.forEach(el => el.classList.remove('hide'));
        }

        if (backToTopFab) {
            backToTopFab.classList.toggle('visible', currentScrollY > 300);
        }

        lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
    }, { passive: true });
}

export function setupTopAppBarScrollBehavior() {
    const topAppBar = document.querySelector('md-top-app-bar');
    if (!topAppBar) return;
    window.addEventListener('scroll', () => {
        topAppBar.classList.toggle('scrolled', window.scrollY > 5);
    }, { passive: true });
}

export function setupTitleClickListener() {
    const titleElement = document.querySelector('.app-title');
    if (titleElement) {
        titleElement.addEventListener('click', () => {
            const currentPage = new URLSearchParams(window.location.search).get('page') || 'index';
            if (currentPage !== 'index') {
                loadPage('index');
            }
        });
    }
}

export function setupImageGallery() {
    const thumbnails = document.querySelector('.gallery-thumbnails');
    const mainImage = document.getElementById('main-gallery-image');
    if (!thumbnails || !mainImage) return;

    thumbnails.addEventListener('click', (e) => {
        if (e.target.matches('.thumbnail')) {
            document.querySelector('.thumbnail.active')?.classList.remove('active');
            e.target.classList.add('active');
            mainImage.src = e.target.src;
            mainImage.alt = e.target.alt;
        }
    });
}

export function setupChangelogFilters() {
    const chipSet = document.getElementById('changelog-filter-chips');
    if (!chipSet) return;
    
    const versionDetails = document.querySelectorAll('.version-details');
    if (versionDetails.length === 0) return;

    const filterChangelog = (platform) => {
        versionDetails.forEach(detailsBlock => {
            const platformSections = detailsBlock.querySelectorAll('.platform-section');
            let visibleSectionsCount = 0;

            platformSections.forEach(section => {
                const sectionPlatform = section.dataset.platform;
                const shouldDisplay = (platform === 'all' || sectionPlatform === platform);
                
                section.style.display = shouldDisplay ? '' : 'none';
                
                if (shouldDisplay) {
                    visibleSectionsCount++;
                }
            });

            detailsBlock.style.display = (visibleSectionsCount > 0) ? '' : 'none';
        });
    };

    chipSet.addEventListener('click', (e) => {
        const chip = e.target.closest('md-filter-chip');
        if (!chip) return;
        
        const platform = chip.dataset.platform;
        const allChips = Array.from(chipSet.querySelectorAll('md-filter-chip'));
        
        allChips.forEach(c => c.selected = false);
        chip.selected = true;

        filterChangelog(platform);
    });
}

export function setupThemeChooserEvents() {
    const dialog = document.getElementById('theme-dialog');
    const railButton = document.getElementById('theme-rail-button');
    const mobileButton = document.getElementById('theme-picker-button-mobile');
    const closeButton = document.getElementById('theme-dialog-close-button');

    if (!dialog || !railButton || !mobileButton || !closeButton) return;

    const openDialog = (e) => {
        e.stopPropagation();
        dialog.open = true;
    };

    const closeDialog = () => {
        dialog.open = false;
    };

    railButton.addEventListener('click', openDialog);
    mobileButton.addEventListener('click', openDialog);
    closeButton.addEventListener('click', closeDialog);

    dialog.addEventListener('click', (e) => {
        const themeOption = e.target.closest('.theme-option');
        if (!themeOption) return;

        const newColor = themeOption.dataset.color;
        if (!newColor) return;
        
        localStorage.setItem(getStorageKey(), newColor);
        
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        updateTheme(isDarkMode);

        setTimeout(() => {
            buildThemeSelector();
        }, 100);
    });
}

export function setupLanguageChooserEvents() {
    const LANG_STORAGE_KEY = 'user-lang';
    const dialog = document.getElementById('lang-dialog');
    const railButton = document.getElementById('lang-rail-button');
    const mobileButton = document.getElementById('lang-picker-button-mobile');
    const closeButton = document.getElementById('lang-dialog-close-button');

    if (!dialog || !railButton || !mobileButton || !closeButton) return;

    const openDialog = (e) => {
        e.stopPropagation();
        buildLanguageSelector();
        dialog.open = true;
    };

    const closeDialog = () => {
        dialog.open = false;
    };

    railButton.addEventListener('click', openDialog);
    mobileButton.addEventListener('click', openDialog);
    closeButton.addEventListener('click', closeDialog);

    dialog.addEventListener('click', async (e) => {
        const langOption = e.target.closest('.lang-option');
        if (!langOption) return;

        const newLangCode = langOption.dataset.lang;
        if (!newLangCode) return;
        
        localStorage.setItem(LANG_STORAGE_KEY, newLangCode);
        
        closeDialog();
        await setLanguage();
        buildNavigation();
        buildFooter();
        loadPage(new URLSearchParams(window.location.search).get('page') || 'index');
    });
}