import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import Browser from './components/Browser/Browser';

class App extends React.Component {
  state = {
    apiResponse: '',
    file: ''
  };

  callAPI = () =>
    fetch('http://localhost:3001/testAPI')
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }))
      .catch((err) => err);

  componentDidMount() {
    this.callAPI();
  }

  handleFileClick = (filepath) => {
    console.log(filepath);
  }

  render() {
    return (
      <div className='App'>
        <p>{this.state.apiResponse}</p>
        <Container>
          <Row>
            <Col className='container' sm={4}>
              <Browser handleFileClick={this.handleFileClick} />
            </Col>
            <Col className='container' sm={8}>Code viewer</Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default App;
