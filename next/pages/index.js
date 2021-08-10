export default function Home() {
    return (
        <div className="container position-relative">
            <h1 className="display-3 text-center mt-5">
                Welcome to GithubView
            </h1>
            <p className="lead text-center mt-5">
                Navigate to a GitHub repo and replace the base URL with{' '}
                <pre>githubview.com</pre>
            </p>
        </div>
    );
}
