import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

/**
 * Hook to manage document head metadata (Title, Favicon, Theme Color, Open Graph & JSON-LD).
 *
 * @param {Object} metadata
 * @param {string} metadata.title
 * @param {string} metadata.description
 * @param {string} metadata.themeColor
 * @param {string} metadata.favicon
 * @param {string} [metadata.type='website']
 * @param {Object} [metadata.product]
 */
export function usePageMetadata({title, description, themeColor, favicon, type = 'website', product}) {
    const location = useLocation();

    useEffect(() => {
        let formattedTitle = title;

        if (title) {
            const parts = title.split(/[-–]/).map(s => s.trim()).filter(Boolean);

            if (parts.length === 1) {
                formattedTitle = parts[0];
            } else {
                const appName = parts[0];
                const rest = parts.slice(1).filter(p => p.toLowerCase() !== 'home');
                const versionPart = rest.find(p => p.toLowerCase().startsWith('version '));

                if (versionPart) {
                    const version = versionPart.replace(/version\s*/i, '').trim();
                    formattedTitle = `${version} - Changelog - ${appName}`;
                } else if (rest.length === 0) {
                    formattedTitle = appName;
                } else {
                    formattedTitle = `${rest.join(' - ')} - ${appName}`;
                }
            }
        }

        if (formattedTitle) document.title = formattedTitle;

        if (themeColor) {
            let metaTheme = document.querySelector("meta[name='theme-color']");
            if (!metaTheme) {
                metaTheme = document.createElement('meta');
                metaTheme.name = 'theme-color';
                document.head.appendChild(metaTheme);
            }
            metaTheme.setAttribute('content', themeColor);
        }

        if (favicon) {
            const existingIcons = document.querySelectorAll("link[rel*='icon']");
            existingIcons.forEach(el => el.remove());

            const link = document.createElement('link');
            link.type = favicon.endsWith('.svg') ? 'image/svg+xml' : 'image/png';
            link.rel = 'icon';
            link.href = favicon;
            document.head.appendChild(link);

            const appleLink = document.createElement('link');
            appleLink.rel = 'apple-touch-icon';
            appleLink.href = favicon;
            document.head.appendChild(appleLink);
        }

        let canonicalLink = document.querySelector("link[rel='canonical']");
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.rel = 'canonical';
            document.head.appendChild(canonicalLink);
        }
        const cleanUrl = window.location.href.split('?')[0];
        canonicalLink.href = cleanUrl;

        const updateMeta = (property, content) => {
            if (!content) return;
            let tag = document.querySelector(`meta[property='${property}']`);
            if (!tag) {
                tag = document.createElement('meta');
                tag.setAttribute('property', property);
                document.head.appendChild(tag);
            }
            tag.setAttribute('content', content);
        };

        updateMeta('og:title', formattedTitle);
        updateMeta('og:description', description || "Professional Android Software Engineering Portfolio.");
        updateMeta('og:url', window.location.href);
        updateMeta('og:type', type);

        let script = document.querySelector("#structured-data");
        if (!script) {
            script = document.createElement('script');
            script.id = 'structured-data';
            script.type = 'application/ld+json';
            document.head.appendChild(script);
        }

        let schemaData = {};

        if (type === 'product' || type === 'extension' || (formattedTitle && (formattedTitle.includes('Pixel') || formattedTitle.includes('Compass') || formattedTitle.includes('Gemini')))) {
            schemaData = {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": product?.appName || formattedTitle,
                "operatingSystem": type === 'extension' ? "Web Browser" : "Android",
                "applicationCategory": type === 'extension' ? "BrowserExtension" : "UtilitiesApplication",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                },
                "author": {
                    "@type": "Person",
                    "name": "Fernando Vaz",
                    "url": "https://fertwbr.com"
                },
                "image": favicon
            };
        } else {
            schemaData = {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Fernando Vaz Portfolio",
                "url": "https://fertwbr.com",
                "image": favicon,
                "author": {
                    "@type": "Person",
                    "name": "Fernando Vaz",
                    "jobTitle": "Software Engineer",
                    "url": "https://fertwbr.com",
                    "image": favicon
                }
            };
        }

        script.textContent = JSON.stringify(schemaData);

    }, [title, description, themeColor, favicon, type, product, location]);
}