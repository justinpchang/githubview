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

const mockTree = [{"key":".eslintrc"},{"key":".gitignore"},{"key":".prettierrc"},{"key":"LICENSE"},{"key":"README.md"},{"key":"components/Browser/index.js"},{"key":"components/Browser/renderers/BrowserFile.js"},{"key":"components/Browser/renderers/BrowserFolder.js"},{"key":"components/Browser/renderers/BrowserHeader.js"},{"key":"components/Browser/renderers/index.js"},{"key":"components/Viewer/index.js"},{"key":"next.config.js"},{"key":"package-lock.json"},{"key":"package.json"},{"key":"pages/[...slug].js"},{"key":"pages/_app.js"},{"key":"pages/api/file/[...slug].js"},{"key":"pages/api/index.js"},{"key":"pages/api/tree/[...slug].js"},{"key":"pages/index.js"},{"key":"pages/old/index.js"},{"key":"public/favicon.ico"},{"key":"public/vercel.svg"},{"key":"styles/globals.css"},{"key":"styles/old.module.css"},{"key":"utils/api.js"},{"key":"yarn.lock"}];

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
                    <Browser files={mockTree} />
                    {/*filesError ? (
                        <h1>ERROR</h1>
                    ) : filesLoading ? (
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        <Browser files={files} handleFileClick={handleFileClick} />
                    )*/}
                </div>
                <div className="col">
                    {fileLoading ? (
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        <Viewer file={!fileError && file} />
                    )}
                </div>
            </div>
        </div>
    );
};