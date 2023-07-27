import Script from 'next/script';

import Footer from '../Footer';
import Header from '../Header';

function Layout({ children }: { readonly children: React.ReactNode }) {
    return (
        <div>
            <Script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5337133458846513"
                crossOrigin="anonymous"
            />

            <Script
                async
                data-goatcounter="https://xbitly.goatcounter.com/count"
                src="//gc.zgo.at/count.js"
            />

            <Script
                async
                defer
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
