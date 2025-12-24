/**
 * Cloudflare Worker to scrape Google Play Store ratings.
 * Caches results for 15 days to minimize origin requests.
 */
export default {
    async fetch(request, env, ctx) {
        const corsHeaders = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
            "Access-Control-Max-Age": "86400",
        };

        if (request.method === "OPTIONS") {
            return new Response(null, { headers: corsHeaders });
        }

        const url = new URL(request.url);
        const appId = url.searchParams.get("id");

        if (!appId) {
            return new Response("Missing app ID", { status: 400, headers: corsHeaders });
        }

        const cacheUrl = new URL(request.url);
        const cacheKey = new Request(cacheUrl.toString(), request);
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
                throw new Error("Play Store lookup failed");
            }

            const html = await playResponse.text();

            const ratingMatch = html.match(/"ratingValue":"([0-9.]+)"/);
            const countMatch = html.match(/"ratingCount":"([0-9]+)"/);

            const data = {
                rating: ratingMatch ? ratingMatch[1] : null,
                count: countMatch ? countMatch[1] : null,
                updated: Date.now()
            };

            response = new Response(JSON.stringify(data), {
                headers: {
                    ...corsHeaders,
                    "Content-Type": "application/json",
                    "Cache-Control": "public, max-age=1296000"
                }
            });

            ctx.waitUntil(cache.put(cacheKey, response.clone()));

            return response;

        } catch (error) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
                headers: corsHeaders
            });
        }
    }
};