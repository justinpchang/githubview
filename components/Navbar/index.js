import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';

export default function Navbar() {
    const router = useRouter();
    const [session, loading] = useSession();
    const [repo, setRepo] = React.useState('');

    const changeRepo = (e) => {
        setRepo(e.target.value);
    };

    const submitRepo = (e) => {
        e.preventDefault();
        router.push('/' + repo);
    };

    const handleSignOut = async () => {
        await signOut();
        router.push('/');
    };

    const handleSignIn = async () => {
        await signIn('github');
    };

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <Link href="/">
                    <a className="navbar-brand">
                        GithubView
                    </a>
                </Link>
                {!loading &&
                    (session ? (
                        <>
                            <form className="d-flex" onSubmit={submitRepo}>
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="owner/repository"
                                    aria-label="owner/repository"
                                    style={{ fontFamily: 'Courier New' }}
                                    value={repo}
                                    onChange={changeRepo}
                                />
                                <button
                                    className="btn btn-outline-primary"
                                    type="submit"
                                >
                                    Search
                                </button>
                            </form>
                            <button
                                type="button"
                                className="btn btn-danger text-nowrap ms-3"
                                onClick={handleSignOut}
                            >
                                Sign out
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            className="btn btn-success text-nowrap"
                            onClick={handleSignIn}
                        >
                            Sign in with Github
                        </button>
                    ))}
            </div>
        </nav>
    );
}
