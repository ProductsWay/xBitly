import Script from 'next/script';

import Footer from '../Footer';
import Header from '../Header';

const Layout: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
    <div>
        <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5337133458846513"
            crossOrigin="anonymous"
        />

        <Script
            data-goatcounter="https://xbitly.goatcounter.com/count"
            async
            src="//gc.zgo.at/count.js"
        />

        <Header links={[]} />

        {children}

        <Footer />
    </div>
);

export default Layout;
