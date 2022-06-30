import logger from 'loglevel';
import { NextRequest, NextResponse } from 'next/server';
import QuickLRU from 'quick-lru';

const lru = new QuickLRU<string, { URL: string }>({ maxSize: 1000 });
const apiUrl =
    process.env.API_URL ?? 'https://staging-xbitly-vz82.encr.app/url';

export default async function redirects(req: NextRequest) {
    const url = req.nextUrl.clone();

    if (
        url.pathname.length === 9 &&
        url.pathname.startsWith('/') &&
        !url.pathname.includes('api')
    ) {
        const redirectUrl = apiUrl + url.pathname;
        if (lru.has(redirectUrl)) {
            logger.info('Found in cache', redirectUrl);
            const data = lru.get(redirectUrl);
            if (data.URL) {
                return NextResponse.redirect(data.URL);
            }
        }

        const result = await fetch(redirectUrl);
        if (result.ok) {
            const data = await result.json();
            lru.set(redirectUrl, data);
            const res = NextResponse.redirect(data.URL);
            // add cache control, refer https://vercel.com/docs/concepts/functions/serverless-functions/edge-caching
            res.headers.set('Cache-Control', 'max-age=0, s-maxage=86400');

            return res;
        }
    }
}
