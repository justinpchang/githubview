import React from 'react';

export default function BrowserFile({ newKey, fileKey, handleFileClick }) {
    const getName = () => {
        let name = newKey || fileKey;
        const nestingLevel = name.split('/').length - 1;

        // Remove preceding path
        const slashIndex = name.lastIndexOf('/');
        if (slashIndex !== -1) {
            name = name.substr(slashIndex + 1);
        }

        return `${'-'.repeat(nestingLevel)} ${name}`;
    };

    return (
        <tr onClick={() => handleFileClick(fileKey)}>
            <td>{getName()}</td>
        </tr>
    );
}
