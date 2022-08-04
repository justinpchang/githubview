import React from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function Viewer({ language, file }) {
    return (
        <SyntaxHighlighter
            language={language || 'text'}
            showLineNumbers={true}
            showInlineLineNumbers={true}
            style={docco}
            className="viewer"
        >
            {file || 'Click on a file to load it.'}
        </SyntaxHighlighter>
    );
}
