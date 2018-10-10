import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AboutMe from './AboutMe'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Ray Shaw's Git Page power by reactjs
          </p>
          more details are coming...
        </header>
      </div>
    );
  }
}

export default App;
