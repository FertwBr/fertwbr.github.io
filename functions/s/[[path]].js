/**
 * @typedef {Object} Params
 * @property {Array<string>} path
 */

/**
 * @typedef {Object} EventContext
 * @property {Request} request
 * @property {Params} params
 */

/**
 * @param {EventContext} context
 * @returns {Response}
 */
export function onRequestGet(context) {
    const requestUrl = new URL(context.request.url);
    const pathArray = context.params.path;

    if (!pathArray || pathArray.length < 2) {
        return Response.redirect(requestUrl.origin, 301);
    }

    const appMap = {
        "pc": "pixelcompass",
        "pp": "pixelpulse",
        "pm": "pixelmeasure",
        "ge": "geminiexpressive"
    };

    const sectionMap = {
        "c": "changelog",
        "h": "help",
        "p": "privacy",
        "t": "terms",
        "r": "roadmap",
        "b": "beta",
        "d": "download"
    };

    const targetApp = appMap[pathArray[0]] || pathArray[0];
    const targetSection = sectionMap[pathArray[1]] || pathArray[1];

    let redirectPath = `/${targetApp}/${targetSection}`;

    if (pathArray.length > 2) {
        const expandedVersion = pathArray[2]
            .replace(/-b(\d+)$/i, "-beta-$1")
            .replace(/-a(\d+)$/i, "-alpha-$1")
            .replace(/-rc(\d+)$/i, "-rc-$1");

        redirectPath += `/${expandedVersion}`;
    }

    return Response.redirect(new URL(redirectPath, requestUrl.origin).toString(), 301);
}