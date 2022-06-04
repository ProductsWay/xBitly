import Head from 'next/head';

import Footer from '../Footer';
import Header from '../Header';

const Layout: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
    <div>
        <Head>
            <script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5337133458846513"
                crossOrigin="anonymous"
            ></script>
        </Head>
        <Header links={[]} />

        {children}

        <Footer />
    </div>
);

export default Layout;
