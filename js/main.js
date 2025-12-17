import { setLanguage, loadPage } from './modules/core.js';
import { setupTheme } from './modules/theme.js';
import { buildNavigation, buildFooter, buildDynamicPanel, createBackToTopFab, buildThemeSelector, buildLanguageSelector, populateStaticContent} from './modules/dom-builder.js';
import { setupNavigation, setupScrollBehavior, setupTopAppBarScrollBehavior, setupTitleClickListener, setupSheetScrollBehavior, setupThemeChooserEvents, setupLanguageChooserEvents, scrollToElement } from './modules/events.js';

document.addEventListener('DOMContentLoaded', initializeApp);

/**
 * The main initialization function for the website.
 */
async function initializeApp() {
    console.log(`LOG: Initializing site for: ${window.config.appName}`);

    await setLanguage();

    populateStaticContent(); 
    buildNavigation();
    buildFooter();
    
    setupTheme();

    handleUrlParameters();

    buildThemeSelector();
    buildLanguageSelector();
    setupNavigation();
    setupThemeChooserEvents();
    setupLanguageChooserEvents();
    setupScrollBehavior();
    createBackToTopFab();
    setupTopAppBarScrollBehavior();
    setupTitleClickListener();
    buildDynamicPanel();
    setupSheetScrollBehavior();

const initialPageId = new URLSearchParams(window.location.search).get('page') || 'index';
    await loadPage(initialPageId, true);

    handleInitialAnchorScroll();
    
    window.onpopstate = (event) => {
        const pageId = (event.state && event.state.pageId) ? event.state.pageId : 'index';
        loadPage(pageId, true);
    };

    console.log("LOG: Application initialization complete.");
}


function handleUrlParameters() {
    const url = new URL(window.location.href);
    let paramsChanged = false;

    if (url.searchParams.has('theme')) {
        console.log("LOG: Parâmetro 'theme' encontrado na URL. Removendo após aplicação.");
        url.searchParams.delete('theme');
        paramsChanged = true;
    }
    

    if (paramsChanged) {
        window.history.replaceState({}, document.title, url.toString());
    }
}

function handleInitialAnchorScroll() {
    const hash = window.location.hash.substring(1);
    if (!hash) return;

    setTimeout(() => {
        console.log(`LOG: Procurando âncora inicial: #${hash}`);
        const targetElement = document.querySelector(`[data-toc-key="${hash}"]`);
        
        if (targetElement) {
            console.log("LOG: Âncora encontrada, rolando para o elemento.");
            scrollToElement(targetElement);
        } else {
            console.warn("LOG: Âncora inicial não encontrada no DOM.");
        }
    }, 300);
}