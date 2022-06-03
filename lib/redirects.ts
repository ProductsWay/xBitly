// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from 'next/server';

const apiUrl =
    process.env.API_URL ?? 'https://staging-demo-backend-app-eyk2.encr.app/url';

export default async function redirects(req: NextRequest) {
    const url = req.nextUrl.clone();

    if (
        url.pathname.length === 9 &&
        url.pathname.startsWith('/') &&
        !url.pathname.includes('api')
    ) {
        const redirectUrl = apiUrl + url.pathname;
        const result = await fetch(redirectUrl);
        if (result.ok) {
            const data = await result.json();
            return NextResponse.redirect(data.URL);
        }
    }
}
