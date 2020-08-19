import React from 'react';
import { withRouter } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import Browser from './components/Browser';
import Viewer from './components/Viewer';

// Helpers
import { getRepoString } from './api';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filepath: '',
      file: '',
      repoString: '',
      files: []
    };
  }

  getFiles = () => {
    fetch('http://localhost:3001/api/tree/' + this.state.repoString)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ files: res.files });
        console.log(this.state.files);
      })
      .catch((err) => err);
  }

  getFile = () => {
    fetch('http://localhost:3001/api/file/' + this.state.repoString + '?filepath=' + Buffer.from(this.state.filepath).toString('base64'))
      .then((res) => res.text())
      .then((res) => this.setState({ file: res }))
      .catch((err) => err);
  }

  componentDidMount() {
    getRepoString(this.props.location.pathname)
      .then((repoString) => {
        this.setState({ repoString });
        // Need some kind of loading screen to wait for this response
        this.getFiles();
      });
  }

  handleFileClick = (filepath) => {
    this.setState({ filepath }, this.getFile);
  };

  render() {
    return (
      <div className='App'>
        <p>Currently viewing: {this.state.repoString}</p>
        <Container>
          <Row>
            <Col className='container' sm={4}>
              <Browser files={this.state.files} handleFileClick={this.handleFileClick} />
            </Col>
            <Col className='container' sm={8}>
              <Viewer file={this.state.file} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(App);
