import React from 'react';
import { space } from '../../../utils/text';
import { icon, type } from '../../../utils/file';

export default function BrowserFile({ newKey, fileKey, handleFileClick, hovering }) {
    const key = newKey || fileKey;
    const nestingLevel = key.split('/').length - 1;
    const slashIndex = key.lastIndexOf('/');
    const name = slashIndex !== -1 ? key.substr(slashIndex + 1) : key;

    return (
        <tr onClick={() => handleFileClick(fileKey)}>
            <td className="browser-name text-nowrap">
                {space(nestingLevel, hovering)}
                {icon(type(name))}
                {name}
            </td>
        </tr>
    );
}
