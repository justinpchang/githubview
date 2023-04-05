import React from 'react';

import FileBrowser from 'react-keyed-file-browser';
import { BrowserHeader, BrowserFile, BrowserFolder } from './renderers';

export default function Browser({ files, handleFileClick }) {
    const [hovering, setHovering] = React.useState(false);

    return files ? (
        <div
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            <FileBrowser
                files={files}
                showActionBar={false}
                headerRenderer={BrowserHeader}
                fileRenderer={BrowserFile}
                fileRendererProps={{ handleFileClick, hovering }}
                folderRenderer={BrowserFolder}
                folderRendererProps={{ hovering }}
            />
        </div>
    ) : (
        <h1>Loading</h1>
    );
}
