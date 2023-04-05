/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import { type, language } from '../utils/file';
import { useSession } from 'next-auth/client';
import parseGithubUrl from 'parse-github-url';
import { Octokit } from 'octokit';
import axios from 'axios';

const Browser = dynamic(() => import('../components/Browser'), {
    ssr: false,
});
const Viewer = dynamic(() => import('../components/Viewer'), {
    ssr: false,
});

export default function Home() {
    const router = useRouter();
    const [session] = useSession();

    const { slug } = router.query;
    const { repo, branch, filepath } = parseGithubUrl(slug?.join('/')) || {};

    const [files, setFiles] = useState([]);
    const [file, setFile] = useState('');

    const octokit = new Octokit(session ? { auth: session.accessToken } : {});

    useEffect(() => {
        (async () => {
            if (!repo) return;

            const commits = (
                await octokit.request(
                    `GET https://api.github.com/repos/${repo}/commits`
                )
            ).data;
            const sha = commits[0].sha;

            const tree = (
                await octokit.request(
                    `GET https://api.github.com/repos/${repo}/git/trees/${sha}?recursive=true`
                )
            ).data.tree;

            setFiles(
                tree.flatMap((file) => {
                    if (file.type !== 'tree') {
                        return [{ key: file.path, url: file.url }];
                    }
                    return [];
                })
            );
        })();
    }, [session, slug]);

    const handleFileClick = async (filepath) => {
        const url = (
            await octokit.request(`GET /repos/${repo}/contents/${filepath}`)
        ).data.download_url;
        const blob = (await axios.get(url, { responseType: 'blob' })).data;
        const text = await new Response(blob).text();
        setFile(text);
    };

    return (
        <>
            <Navbar />
            <div className="container w-100">
                <div className="row flex-lg-nowrap">
                    <div className="col-2">
                        <Browser
                            files={files}
                            handleFileClick={handleFileClick}
                        />
                    </div>
                    <div className="col">
                        <Viewer
                            language={file && language(type(filepath))}
                            file={file}
                        />
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <>
            <Navbar />
            <div className="container w-100">
                <div className="row flex-lg-nowrap">
                    {filesError ? (
                        <p className="lead text-center mt-5">
                            Could not find repository/file.
                            {!session && (
                                <>
                                    <br />
                                    You must sign in to view your private
                                    repositories.
                                </>
                            )}
                        </p>
                    ) : (
                        <>
                            <div className="col-2">
                                {filesError ? (
                                    <h1>Error</h1>
                                ) : filesLoading ? (
                                    <div
                                        className="spinner-border"
                                        role="status"
                                    >
                                        <span className="visually-hidden">
                                            Loading...
                                        </span>
                                    </div>
                                ) : (
                                    <Browser
                                        files={{ files }}
                                        handleFileClick={handleFileClick}
                                    />
                                )}
                            </div>
                            <div className="col">
                                {fileLoading ? (
                                    <div
                                        className="spinner-border"
                                        role="status"
                                    >
                                        <span className="visually-hidden">
                                            Loading...
                                        </span>
                                    </div>
                                ) : (
                                    <Viewer
                                        language={
                                            !fileError &&
                                            file &&
                                            language(type(filepath))
                                        }
                                        file={!fileError && file}
                                    />
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
