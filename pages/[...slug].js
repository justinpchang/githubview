import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useFile, useFiles } from '../utils/api';
import Navbar from '../components/Navbar';
import { type, language } from '../utils/file';
import { useSession } from 'next-auth/client';

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
    const [filepath, setFilepath] = React.useState(['']);
    const { files, filesLoading, filesError } = useFiles(slug?.join('/'));
    const { file, fileLoading, fileError } = useFile(slug?.join('/'), filepath);

    const handleFileClick = (filepath) => {
        setFilepath(filepath);
    };

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
                                        files={files}
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
