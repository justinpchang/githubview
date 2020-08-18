import React from 'react';

import FileBrowser from 'react-keyed-file-browser';
import {
  TableHeader,
  TableFolder,
  TableFile,
} from './renderers';

class Browser extends React.Component {
  state = {
    files: [
      {
        key: 'README.md',
      },
      {
        key: 'direct/nested.js',
      },
      {
        key: 'direct/another/super.js',
      },
    ],
  };

  render() {
    return (
      <FileBrowser
        files={this.state.files}
        showActionBar={false}
        headerRenderer={TableHeader}
        fileRenderer={TableFile}
        fileRendererProps={{
          handleFileClick: this.props.handleFileClick
        }}
        folderRenderer={TableFolder}
      />
    );
  }
}

export default Browser;
