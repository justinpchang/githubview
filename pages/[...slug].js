import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useFile, useFiles } from '../utils/api';
import Navbar from '../components/Navbar';
import { type, language } from '../utils/file';

const Browser = dynamic(() => import('../components/Browser'), {
    ssr: false,
});
const Viewer = dynamic(() => import('../components/Viewer'), {
    ssr: false,
});

export default function Home() {
    const router = useRouter();
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
                    <div className="col-2">
                        {filesError ? (
                            <h1>ERROR</h1>
                        ) : filesLoading ? (
                            <div className="spinner-border" role="status">
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
                            <div className="spinner-border" role="status">
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
                </div>
            </div>
        </>
    );
}
