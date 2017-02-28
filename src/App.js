import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import AppBar from './AppBar';
import Drafting from './Drafting';
import Settings from './Settings';
import Workspace from './Workspace';

class App extends Component {
  render() {
    return (
      <div>
        <Workspace />
        <AppBar />
        <Settings />
        <Drafting />
      </div>
    );
  }
}

export default App;
