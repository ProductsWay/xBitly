import { Provider as AuthProvider } from 'next-auth/client';
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

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider session={pageProps.session}>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </AuthProvider>
    );
}

export default MyApp;
