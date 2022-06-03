import Footer from '../Footer';
import Header from '../Header';

const Layout: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
    <div>
        <Header links={[]} />

        {children}

        <Footer />
    </div>
);

export default Layout;
