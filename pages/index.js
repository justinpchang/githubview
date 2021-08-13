import Navbar from '../components/Navbar';

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="container position-relative">
                <h1 className="display-3 text-center mt-5">
                    Welcome to GithubView
                </h1>
                <p className="lead text-center mt-5">
                    Navigate to a GitHub repo and replace the base URL with{' '}
                    <pre>githubview.vercel.app</pre>
                </p>
            </div>
        </>
    );
}
