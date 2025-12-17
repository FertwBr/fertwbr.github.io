import { getStringsForLang, loadStrings } from '../strings.js';
import { createIndexLayout, createDefaultLayout, createShimmerHTML, updateActiveNav, createPageFabs, generateTOC, buildDynamicPanel, injectRoadmapSummary, populateStaticContent } from './dom-builder.js';
import { setupImageGallery, setupChangelogFilters } from './events.js';

let currentLang = 'en';

export function getCurrentLanguage() {
    return currentLang;
}

export async function setLanguage() {
    const urlParams = new URLSearchParams(window.location.search);
    const langFromUrl = urlParams.get('lang');
    const browserLang = (navigator.languages?.[0] || navigator.language).split('-')[0].toLowerCase();
    
    currentLang = langFromUrl || localStorage.getItem('user-lang') || browserLang;
    
    await loadStrings(currentLang);
}

export function getUiString(key) {
    const keys = key.split('.');
    let result = getStringsForLang(currentLang);
    let fallbackResult = getStringsForLang('en');

    for (const k of keys) {
        if (result === undefined) break;
        result = result[k];
    }

    if (result === undefined) {
        let fallbackTmp = fallbackResult;
        for (const k of keys) {
            if (fallbackTmp === undefined) break;
            fallbackTmp = fallbackTmp[k];
        }
        result = fallbackTmp;
    }
    
    return result === undefined ? `[${key}]` : result;
}

async function getPageFile(pageId) {
    const pageData = window.config.pageConfig[pageId];
    if (!pageData) return null;

    const fileName = pageData.defaultFile;
    const langFilePath = `md/${currentLang}/${fileName}`;
    const fallbackFilePath = `md/en/${fileName}`;

    try {
        const response = await fetch(langFilePath, { method: 'HEAD' });
        if (response.ok) {
            return langFilePath;
        }
    } catch (e) {
        console.warn(e);
    }

    return fallbackFilePath;
}

function processCustomMarkdownAttributes(container) {
    const headers = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const regex = /\{:\s*data-toc-key="([^"]+)"\s*\}/g;

    headers.forEach(header => {
        if (header.innerHTML.match(regex)) {
            const match = regex.exec(header.innerHTML);
            if (match) {
                const key = match[1];
                header.setAttribute('data-toc-key', key);
                header.id = key;
                header.innerHTML = header.innerHTML.replace(match[0], '').trim();
            }
        }
    });
}

export async function loadPage(pageId, isInitialLoad = false) {
    document.body.classList.toggle('panel-visible', pageId !== 'privacy');

    const contentContainer = document.getElementById('content-container');
    const contentWrapper = document.getElementById('content-wrapper');
    if (!contentWrapper || !contentContainer) return;
    
    const filePath = await getPageFile(pageId);
    const title = getUiString(`pages.${pageId}.title`);

    if (!filePath) {
        contentWrapper.innerHTML = `<div class="page-header"><h1>Page Not Found</h1></div>`;
        return;
    }

    if (title) document.title = `${window.config.appName} - ${title}`;
    else document.title = window.config.appName;
    
    updateActiveNav(pageId);
    if (!isInitialLoad) {
        const url = new URL(window.location);
        if (url.searchParams.get('page') !== pageId) {
            url.searchParams.set('page', pageId);
            window.history.pushState({ pageId }, document.title, url);
        }
    }

    contentWrapper.classList.add('fade-out');
    if (document.body.contains(contentContainer) && contentContainer.offsetHeight > 0) {
        contentContainer.style.height = `${contentContainer.offsetHeight}px`;
    }

    await new Promise(resolve => setTimeout(resolve, 200));

    contentWrapper.innerHTML = createShimmerHTML(pageId);
    window.scrollTo(0, 0);
    contentWrapper.classList.remove('fade-out');
    
    if (document.body.contains(contentContainer)) {
        contentContainer.style.height = `${contentWrapper.offsetHeight}px`;
    }

    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Fetch failed`);
        const markdown = await response.text();

        const tempDiv = document.createElement('div');
        tempDiv.style.visibility = 'hidden';
        tempDiv.style.position = 'absolute';
        
        if (pageId === 'index') {
            tempDiv.innerHTML = await createIndexLayout(markdown);
        } else {
            tempDiv.innerHTML = await createDefaultLayout(markdown, pageId);
        }
        
        processCustomMarkdownAttributes(tempDiv);

        document.body.appendChild(tempDiv);
        const newHeight = tempDiv.offsetHeight;
        document.body.removeChild(tempDiv);

        if (document.body.contains(contentContainer)) {
            contentContainer.style.height = `${newHeight}px`;
        }

        contentWrapper.classList.add('fade-out');
        await new Promise(resolve => setTimeout(resolve, 150));
        
        contentWrapper.innerHTML = tempDiv.innerHTML;
        contentWrapper.classList.remove('fade-out');

        generateTOC(getUiString('pages.tocTitle'));
        
        if (pageId === 'index' || pageId === 'plus') setupImageGallery();
        if (pageId === 'changelog') setupChangelogFilters();

        if (pageId === 'index' || pageId === 'overview') {
            await injectRoadmapSummary();
        }

    } catch (error) {
        console.error(error);
        contentWrapper.innerHTML = `<div>Error loading content.</div>`;
    } finally {
        setTimeout(() => {
            if (document.body.contains(contentContainer)) {
                contentContainer.style.height = '';
            }
        }, 300);
    }

    createPageFabs(pageId);
    buildDynamicPanel();
}