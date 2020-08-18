import React from 'react';

class TableFile extends React.Component {
  getName() {
    let name = this.props.newKey || this.props.fileKey;
    const nestingLevel = name.split('/').length - 1;
    // Remove preceding path
    const slashIndex = name.lastIndexOf('/');
    if (slashIndex !== -1) {
      name = name.substr(slashIndex + 1);
    }
    return `${'-'.repeat(nestingLevel)} ${name}`;
  }

  render() {
    return (
      <tr onClick={this.props.handleFileClick.bind(this, this.props.fileKey)}><td>{this.getName()}</td></tr>
    );
  }
};

export default TableFile;