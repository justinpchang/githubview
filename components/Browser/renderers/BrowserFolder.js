import React from 'react';
import { BaseFolder } from 'react-keyed-file-browser';
import { IoChevronForwardOutline, IoChevronDownOutline } from 'react-icons/io5';
import { space } from '../../../utils/text';

export default class BrowserFolder extends BaseFolder {
    render() {
        return (
            <tr onClick={this.handleFolderDoubleClick}>
                <td className="browser-name">
                    {space(this.props.fileKey.split('/').length - 2, this.props.hovering)}
                    {this.props.isOpen ? <IoChevronDownOutline className="icon" /> : <IoChevronForwardOutline className="icon" />}
                    {this.props.name}
                </td>
            </tr>
        );
    }
}
