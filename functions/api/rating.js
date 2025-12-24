/**
 * Cloudflare Pages Function
 * Path: /api/rating
 */
export async function onRequest(context) {
    const { request } = context;
    const url = new URL(request.url);
    const appId = url.searchParams.get("id");

    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=1296000"
    };

    if (!appId) {
        return new Response(JSON.stringify({ error: "Missing id param" }), {
            status: 400,
            headers
        });
    }

    const cacheKey = new Request(url.toString(), request);
    const cache = caches.default;
    let response = await cache.match(cacheKey);

    if (response) {
        return response;
    }

    try {
        const playUrl = `https://play.google.com/store/apps/details?id=${appId}&hl=en`;
        const playResponse = await fetch(playUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
            }
        });

        if (!playResponse.ok) {
            return new Response(JSON.stringify({ error: "Play Store lookup failed" }), {
                status: 404,
                headers
            });
        }

        const html = await playResponse.text();

        const ratingMatch = html.match(/"ratingValue":"([0-9.]+)"/) || html.match(/class="TT9eCd">([0-9,.]+)/);
        const countMatch = html.match(/"ratingCount":"([0-9]+)"/) || html.match(/class="g1rdde">([0-9,.]+) reviews/);

        let formattedRating = null;
        if (ratingMatch && ratingMatch[1]) {
            const rawRating = parseFloat(ratingMatch[1].replace(',', '.'));
            if (!isNaN(rawRating)) {
                formattedRating = rawRating.toFixed(1);
            }
        }

        const data = {
            rating: formattedRating,
            count: countMatch ? countMatch[1] : null,
            updatedAt: new Date().toISOString()
        };

        response = new Response(JSON.stringify(data), { headers });

        context.waitUntil(cache.put(cacheKey, response.clone()));

        return response;

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers
        });
    }
}