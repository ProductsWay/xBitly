import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Layout from '../components/Layout';

const schema = yup.object().shape({
    url: yup.string().url('Must be a valid url').required('URL is required'),
});

type FormValue = {
    url: string;
};

const apiUrl =
    process.env.API_URL ?? 'https://staging-xbitly-vz82.encr.app/url';

export default function Index({ session }: { readonly session: any }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValue>({
        resolver: yupResolver(schema),
    });

    const mutation = useMutation({
        mutationFn: (url: string) =>
            fetch(apiUrl, {
                method: 'POST',
                body: JSON.stringify({
                    url,
                    owner: session
                        ? `${session.user?.name}:${session.user?.image}`
                        : 'anonymous',
                }),
            }).then(async (resp) => resp.json()),
    });

    const onSubmit = (data: FormValue) => {
        mutation.mutate(data.url);
    };

    return (
        <Layout>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="min-h-screen hero bg-base-200">
                    <div className="text-center hero-content">
                        <div className="max-w-lg">
                            <h1 className="text-5xl font-bold">
                                Welcome to xBitly
                            </h1>
                            <p className="py-6">
                                Try SBitly Links for free. Paste your URL to
                                create a shortened link then copy your link.
                            </p>
                            {!session && (
                                <div className="shadow-lg alert alert-info">
                                    <div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            className="flex-shrink-0 w-6 h-6 stroke-current"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span>
                                            Anonymous link will remove in 24
                                            hours. Please sign in if you want to
                                            have permanent link.
                                        </span>
                                    </div>
                                </div>
                            )}

                            {errors.url && (
                                <div className="shadow-lg alert alert-error">
                                    <div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="flex-shrink-0 w-6 h-6 stroke-current"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span>{errors.url.message}</span>
                                    </div>
                                </div>
                            )}
                            <input
                                type="text"
                                {...register('url', {
                                    required: true,
                                })}
                                placeholder="ENTER LONG URL"
                                className="mt-2 w-full max-w-sm input"
                            />

                            {mutation.isPending ? (
                                <button
                                    type="button"
                                    className="mt-2 btn btn-disabled"
                                >
                                    <span className="loading loading-spinner"></span>
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className={'mt-2 btn btn-primary'}
                                >
                                    Create A Short Link
                                </button>
                            )}

                            {mutation.isError ? (
                                <div>
                                    An error occurred:{' '}
                                    {(mutation.error as Error).message}
                                </div>
                            ) : null}

                            {!mutation.isPending && mutation.isSuccess && (
                                <label
                                    htmlFor="my-modal"
                                    className="ml-2 btn modal-button"
                                >
                                    Your Link
                                </label>
                            )}
                        </div>
                    </div>
                </div>
            </form>
            {mutation.isSuccess ? (
                <>
                    <input
                        type="checkbox"
                        id="my-modal"
                        className="modal-toggle"
                    />
                    <div className="modal">
                        <div className="relative modal-box">
                            <label
                                htmlFor="my-modal"
                                className="absolute top-2 right-2 btn btn-sm btn-circle"
                            >
                                ✕
                            </label>
                            <h3 className="text-lg font-bold">
                                Congratulations!
                            </h3>

                            <div className="py-8 form-control">
                                <div className="justify-center join">
                                    <input
                                        disabled={true}
                                        type="text"
                                        placeholder="Search…"
                                        className="input input-bordered join-item"
                                        value={`${window.location.href}${mutation.data?.ID}`}
                                    />
                                    <div
                                        className="tooltip join-item"
                                        data-tip="Copy to clipboard"
                                    >
                                        <CopyToClipboard
                                            text={`${window.location.href}${mutation.data?.ID}`}
                                        >
                                            <button
                                                type="button"
                                                className="btn btn-square"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-6 h-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                                                    />
                                                </svg>
                                            </button>
                                        </CopyToClipboard>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => ({
    props: {
        session: await getSession(ctx),
    },
});
