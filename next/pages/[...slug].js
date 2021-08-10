import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useFile, useFiles } from '../utils/api';

const Browser = dynamic(() => import('../components/Browser'), {
    ssr: false,
});
const Viewer = dynamic(() => import('../components/Viewer'), {
    ssr: false,
});

/*
const files = [
    {
        key: 'README.md',
    },
    {
        key: 'direct/nested.js',
    },
    {
        key: 'direct/another/super.js',
    },
];
*/

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
        <div className="container mt-3">
            <div className="row">
                <div className="col-2">
                    {filesError ? (
                        <h1>ERROR</h1>
                    ) : filesLoading ? (
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        <Browser files={files} handleFileClick={handleFileClick} />
                    )}
                </div>
                <div className="col">
                    {fileError ? (
                        <h1>ERROR</h1>
                    ) : fileLoading ? (
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        <Viewer file={file} />
                    )}
                </div>
            </div>
        </div>
    );
};