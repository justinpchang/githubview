import { signIn, signOut, useSession } from 'next-auth/client';

export default function Home() {
    const [session, loading] = useSession();

    return (
        <div className="container position-relative">
            <h1 className="display-3 text-center mt-5">
                Welcome to GithubView
            </h1>
            <p className="lead text-center mt-5">
                Navigate to a GitHub repo and replace the base URL with{' '}
                <pre>githubview.vercel.app</pre>
            </p>
            <br />
            {!session ? <>
                <h5 className="h5">Not signed in</h5>
                <br />
                <button className="btn btn-primary" onClick={() => signIn()}>Sign in</button>
            </> : <>
                <h5 className="h5">Signed in as {session.user.name}</h5>
                <br />
                <button className="btn btn-primary" onClick={() => signOut()}>Sign out</button>
            </>}
        </div>
    );
}
