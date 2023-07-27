import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

import '../styles/globals.css';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'yes') {
    if (typeof window === 'undefined') {
        import('../mocks/server')
            .then(({ server }) => {
                server.listen();
            })
            .catch(console.error);
    } else {
        import('../mocks/browser')
            .then(async ({ browser }) => browser.start())
            .catch(console.error);
    }
}

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </SessionProvider>
    );
}

export default MyApp;
