import { yupResolver } from '@hookform/resolvers/yup';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Layout from '../components/Layout';

const schema = yup.object().shape({
    url: yup.string().url('Must be a valid url').required('URL is required'),
});

type FormValue = {
    url: string;
};

export default function Index() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormValue>({
        resolver: yupResolver(schema),
    });
    const onSubmit = (data) => console.log(data);
    return (
        <Layout>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="min-h-screen hero bg-base-200">
                    <div className="text-center hero-content">
                        <div className="max-w-md">
                            <h1 className="text-5xl font-bold">
                                Welcome to xBitly
                            </h1>
                            <p className="py-6">
                                Try SBitly Links for free. Paste your URL to
                                create a shortened link then copy your link.
                            </p>

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
                                className="w-full max-w-sm mt-2 input"
                            />

                            <button className="mt-2 btn btn-primary">
                                Create A Short Link
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => ({
    props: {
        session: await getSession(ctx),
    },
});
