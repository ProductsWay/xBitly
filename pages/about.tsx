import Link from 'next/link';

import Layout from '../components/Layout';

export default function About() {
    return (
        <Layout>
            <div className="p-4 mx-auto max-w-2xl">
                <h1 className="mb-4 text-3xl font-bold">About Us</h1>
                <p className="mb-4">
                    xBitly is a free and open source URL shortener.{' '}
                </p>
                <h2 className="mb-4 text-2xl font-bold">FAQ</h2>
                <h3 className="mb-2 text-xl font-bold">
                    Is xBitly free to use?
                </h3>
                <p className="mb-4">Yes, xBitly is completely free to use.</p>
                <h3 className="mb-2 text-xl font-bold">
                    Is xBitly open source?
                </h3>
                <p className="mb-4">
                    Yes, xBitly is open source and the source code can be found
                    at{' '}
                    <a
                        target="_blank"
                        href="https://github.com/jellydn/xBitly"
                        rel="noreferrer"
                    >
                        xBitly
                    </a>
                </p>
                <h3 className="mb-2 text-xl font-bold">
                    How do I create a shortened link?
                </h3>
                <p className="mb-4">
                    To create a shortened link, paste your URL into the form and
                    click the "Create Link" button. Your shortened link will be
                    displayed and you can copy it to use wherever you like.
                </p>
                <h3 className="mb-2 text-xl font-bold">
                    Are anonymous links permanent?
                </h3>
                <p className="mb-4">
                    No, anonymous links will be removed after 24 hours. If you
                    want to create permanent links, please sign in.
                </p>
            </div>
        </Layout>
    );
}
