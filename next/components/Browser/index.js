import React from 'react';

import FileBrowser from 'react-keyed-file-browser';
import { BrowserHeader, BrowserFile, BrowserFolder } from './renderers';

export default function Browser({ files, handleFileClick }) {
    return files ? (
        <FileBrowser
            files={files}
            showActionBar={false}
            headerRenderer={BrowserHeader}
            fileRenderer={BrowserFile}
            fileRendererProps={{ handleFileClick }}
            folderRenderer={BrowserFolder}
        />
    ) : (
        <h1>Loading</h1>
    );
}
