const routeMeta = {
    "fertwbr.com/": {
        title: "Fernando Vaz | Software Engineer",
        description: "Professional Android Software Engineering Portfolio.",
        image: "https://github.com/fertwbr.png",
        color: "#D97706"
    },
    "apps.fertwbr.com/": {
        title: "Fernando's Apps",
        description: "Discover amazing Android and Wear OS apps developed by Fernando Vaz.",
        image: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/fertwbr/apps/favicon/favicon.ico",
        color: "#4FA3D1"
    },
    "apps.fertwbr.com/pixelcompass": {
        title: "Pixel Compass | Navigation Companion",
        description: "Pixel Compass is a beautifully designed, intuitive, and highly personalized navigation companion for Android and Wear OS.",
        image: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Compass/art/icon.svg",
        color: "#6750A4"
    },
    "apps.fertwbr.com/pixelpulse": {
        title: "Pixel Pulse | Advanced Sound Meter",
        description: "Pixel Pulse is a precise decibel meter and sound analyzer for Android and Wear OS.",
        image: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Pulse/art/icon.svg",
        color: "#3BA174"
    }
};

/**
 * Appends dynamic Open Graph and Twitter meta tags to the HTML head.
 */
class HeadRewriter {
    /**
     * Creates a new HeadRewriter instance.
     *
     * @param {Object} meta
     * @param {string} url
     */
    constructor(meta, url) {
        this.meta = meta;
        this.url = url;
    }

    /**
     * Appends the meta tags to the parsed element.
     *
     * @param {Element} element
     */
    element(element) {
        element.append(`
      <title>${this.meta.title}</title>
      <meta name="description" content="${this.meta.description}" />
      
      <meta property="og:type" content="website" />
      <meta property="og:url" content="${this.url}" />
      <meta property="og:title" content="${this.meta.title}" />
      <meta property="og:description" content="${this.meta.description}" />
      <meta property="og:image" content="${this.meta.image}" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content="${this.url}" />
      <meta name="twitter:title" content="${this.meta.title}" />
      <meta name="twitter:description" content="${this.meta.description}" />
      <meta name="twitter:image" content="${this.meta.image}" />
      
      <meta name="theme-color" content="${this.meta.color}" />
    `, { html: true });
    }
}

/**
 * Removes the existing title element from the parsed HTML to prevent duplicates.
 */
class TitleRemover {
    /**
     * Removes the matched element.
     *
     * @param {Element} element
     */
    element(element) {
        element.remove();
    }
}

/**
 * Intercepts the incoming request and transforms the HTML response with dynamic meta tags.
 * Note: HTMLRewriter is provided globally by the Cloudflare Pages environment.
 *
 * @param {Object} context
 * @returns {Promise<Response>}
 */
export async function onRequest(context) {
    const request = context.request;
    const url = new URL(request.url);
    const hostname = url.hostname;
    const pathname = url.pathname;

    const response = await context.next();

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("text/html")) {
        return response;
    }

    let matchedMeta;

    if (hostname.includes("apps.fertwbr.com")) {
        if (pathname.startsWith("/pixelcompass")) {
            matchedMeta = routeMeta["apps.fertwbr.com/pixelcompass"];
        } else if (pathname.startsWith("/pixelpulse")) {
            matchedMeta = routeMeta["apps.fertwbr.com/pixelpulse"];
        } else {
            matchedMeta = routeMeta["apps.fertwbr.com/"];
        }
    } else {
        matchedMeta = routeMeta["fertwbr.com/"];
    }

    return new HTMLRewriter()
        .on("head > title", new TitleRemover())
        .on("head", new HeadRewriter(matchedMeta, request.url))
        .transform(response);
}