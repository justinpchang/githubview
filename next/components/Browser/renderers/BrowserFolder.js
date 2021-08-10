import React from 'react';
import { BaseFolder } from 'react-keyed-file-browser';

export default class BrowserFolder extends BaseFolder {
    getName() {
        const nestingLevel = this.props.fileKey.split('/').length - 2;
        return `${'-'.repeat(nestingLevel)} ${this.props.name}`;
    }

    render() {
        return (
            <tr
                style={{ fontWeight: 'bold' }}
                onClick={this.handleFolderDoubleClick}
            >
                <td>{this.getName()}</td>
            </tr>
        );
    }
}
