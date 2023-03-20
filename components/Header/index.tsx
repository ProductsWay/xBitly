import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

import { HeaderProps } from './types';

const Header: React.FC<React.PropsWithChildren<HeaderProps>> = ({
    links = [],
}) => {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    if (loading) {
        return (
            <div className="spinner" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
    }

    return (
        <header className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="lg:hidden btn btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="p-2 mt-3 w-52 shadow menu menu-compact dropdown-content bg-base-100 rounded-box"
                    >
                        {links.map((link) => (
                            <li key={link.url}>
                                <Link href={link.url} legacyBehavior>
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <Link href="/" className="text-xl normal-case btn btn-ghost">
                    xBitly | URL Shortener
                </Link>
            </div>
            <div className="hidden lg:flex navbar-center">
                <ul className="p-0 menu menu-horizontal">
                    {links.map((link) => (
                        <li key={link.url}>
                            <Link href={link.url} legacyBehavior>
                                {link.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="navbar-end">
                {!session && (
                    <button
                        type="button"
                        onClick={() => signIn()}
                        className="btn"
                    >
                        Sign In
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="ml-1 w-4 h-4"
                            viewBox="0 0 24 24"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                )}

                {session && (
                    <div className="dropdown dropdown-end">
                        <label
                            tabIndex={0}
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 rounded-full">
                                <Image
                                    alt={
                                        session.user.email || session.user.name
                                    }
                                    src={session.user.image}
                                />
                            </div>
                        </label>
                        <ul
                            tabIndex={0}
                            className="p-2 mt-3 w-52 shadow menu menu-compact dropdown-content bg-base-100 rounded-box"
                        >
                            <li>
                                <Link
                                    passHref
                                    href="/api/auth/signout"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        signOut();
                                    }}
                                >
                                    Sign out
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
export * from './types';
