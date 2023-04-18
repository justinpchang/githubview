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
    const [isFilesLoading, setIsFilesLoading] = useState(true);
    const [isFilesError, setIsFilesError] = useState(false);
    const [file, setFile] = useState('');
    const [isFileLoading, setIsFileLoading] = useState(false);

    const [currentBranch, setCurrentBranch] = useState();

    const octokit = new Octokit(session ? { auth: session.accessToken } : {});

    useEffect(() => {
        (async () => {
            if (!repo) return;

            setIsFilesLoading(true);
            setIsFilesError(false);

            try {
                // Get tree
                const commits = (
                    await octokit.request(
                        branch === 'master'
                            ? `GET https://api.github.com/repos/${repo}/commits`
                            : `GET https://api.github.com/repos/${repo}/commits?sha=${branch}`
                    )
                ).data;
                const sha = commits[0].sha;

                const tree = (
                    await octokit.request(
                        `GET https://api.github.com/repos/${repo}/git/trees/${sha}?recursive=true`
                    )
                ).data.tree;

                // Get name of branch
                if (branch === 'master') {
                    octokit
                        .request(
                            `GET https://api.github.com/repos/${repo}/commits/${sha}/branches-where-head`
                        )
                        .then((res) => {
                            res.data.forEach(({ name }) => {
                                if (name === 'master') {
                                    setCurrentBranch('master');
                                    return;
                                }
                                if (name === 'main') {
                                    console.log('main');
                                    setCurrentBranch('main');
                                    return;
                                }
                            });
                            setCurrentBranch(res.data[0].name);
                        });
                } else {
                    setCurrentBranch(branch);
                }

                setFiles(
                    tree.flatMap((file) => {
                        if (file.type !== 'tree') {
                            return [{ key: file.path, url: file.url }];
                        }
                        return [];
                    })
                );
            } catch (err) {
                setIsFilesError(true);
                console.error(err);
            }
            setIsFilesLoading(false);
        })();
    }, [repo, branch]);

    useEffect(() => {
        (async () => {
            if (filepath) await getFile(filepath);
        })();
    }, [filepath]);

    const getFile = async (filepath) => {
        setIsFileLoading(true);
        const url = (
            await octokit.request(`GET /repos/${repo}/contents/${filepath}`)
        ).data.download_url;
        const blob = (await axios.get(url, { responseType: 'blob' })).data;
        const text = await new Response(blob).text();
        setFile(text);
        setIsFileLoading(false);
    };

    const handleFileClick = async (filepath) => {
        router.push({
            pathname: `/${repo}/blob/${currentBranch}/${filepath}`,
        });
    };

    return (
        <>
            <Navbar />
            <div className="container w-100">
                <div className="row flex-lg-nowrap">
                    {isFilesError ? (
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
                                {isFilesLoading ? (
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
                                        files={files}
                                        handleFileClick={handleFileClick}
                                    />
                                )}
                            </div>
                            <div className="col">
                                {isFileLoading ? (
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
                                            file && language(type(filepath))
                                        }
                                        file={file}
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
