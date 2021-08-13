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
        await signIn('github');
    };

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    GithubView
                </a>
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
