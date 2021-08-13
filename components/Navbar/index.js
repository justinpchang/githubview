import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';

export default function Navbar() {
    const [session, loading] = useSession();
    const [repo, setRepo] = React.useState('');

    const changeRepo = (e) => {
        setRepo(e.target.value);
    };

    const submitRepo = (e) => {
        e.preventDefault();
        window.location = '/' + repo;
    };

    const handleSignOut = async () => {
        await signOut();
        window.location = '/';
    };

    const handleSignIn = async () => {
        await signIn();
    };

    return (
        <nav class="navbar navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">
                    GithubView
                </a>
                {!loading &&
                    (session ? (
                        <>
                            <form class="d-flex" onSubmit={submitRepo}>
                                <input
                                    class="form-control me-2"
                                    type="search"
                                    placeholder="owner/repository"
                                    aria-label="owner/repository"
                                    value={repo}
                                    onChange={changeRepo}
                                />
                                <button
                                    class="btn btn-outline-primary"
                                    type="submit"
                                >
                                    Search
                                </button>
                            </form>
                            <button
                                type="button"
                                class="btn btn-danger text-nowrap ms-3"
                                onClick={handleSignOut}
                            >
                                Sign out
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            class="btn btn-success text-nowrap"
                            onClick={handleSignIn}
                        >
                            Sign in with Github
                        </button>
                    ))}
            </div>
        </nav>
    );
}
