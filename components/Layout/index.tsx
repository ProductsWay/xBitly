import Script from 'next/script';
import type { ReactNode } from 'react';

import Footer from '../Footer';
import Header from '../Header';

function Layout({ children }: { readonly children: ReactNode }) {
    return (
        <div>
            <Script
                async={true}
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5337133458846513"
                crossOrigin="anonymous"
            />

            <Script
                async={true}
                data-goatcounter="https://xbitly.goatcounter.com/count"
                src="//gc.zgo.at/count.js"
            />

            <Script
                async={true}
                defer={true}
                src="https://analytics.umami.is/script.js"
                data-website-id="b46103f1-1f8f-46d5-9fcb-0b2cbaaf6252"
            />

            <Header
                links={[
                    {
                        title: 'Home',
                        url: '/',
                    },

                    {
                        title: 'About Us',
                        url: '/about',
                    },
                ]}
            />

            {children}

            <Footer />
        </div>
    );
}

export default Layout;
