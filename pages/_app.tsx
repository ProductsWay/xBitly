import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import '../styles/globals.css';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'yes') {
    if (typeof window === 'undefined') {
        import('../mocks/server').then(({ server }) => {
            server.listen();
        });
    } else {
        import('../mocks/browser').then(({ browser }) => {
            browser.start();
        });
    }
}

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps<any>) {
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
