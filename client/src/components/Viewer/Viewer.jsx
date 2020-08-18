import React from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

class Viewer extends React.Component {
  render() {
    return (
      <SyntaxHighlighter
        language='javascript'
        showLineNumbers={true}
        showInlineLineNumbers={true}
        style={docco}
      >
        {this.props.filepath || 'Click on a file to load it.'}
      </SyntaxHighlighter>
    );
  }
}

export default Viewer;