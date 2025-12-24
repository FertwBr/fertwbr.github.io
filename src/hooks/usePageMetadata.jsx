import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook to manage document head metadata (Title, Favicon, Theme Color, Open Graph & JSON-LD).
 *
 * @param {Object} metadata
 * @param {string} metadata.title - Page title.
 * @param {string} metadata.description - Page description for SEO.
 * @param {string} metadata.themeColor - Hex code for browser toolbar color.
 * @param {string} metadata.favicon - URL to the favicon.
 * @param {string} [metadata.type] - 'website', 'profile', or 'product' (for Schema).
 * @param {Object} [metadata.product] - Optional product details for Schema (appName, author).
 */
export function usePageMetadata({ title, description, themeColor, favicon, type = 'website', product }) {
  const location = useLocation();

  useEffect(() => {
    if (title) document.title = title;

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
      link.type = 'image/png';
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

    updateMeta('og:title', title);
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

    if (type === 'product' || (title && (title.includes('Pixel') || title.includes('Compass')))) {
      schemaData = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": product?.appName || title,
        "operatingSystem": "Android",
        "applicationCategory": "UtilitiesApplication",
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