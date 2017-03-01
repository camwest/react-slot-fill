import React, { Component } from 'react';
import './App.css';

import StaticLoader from './extensions/StaticLoader';
import Workspace from './extensions/Workspace';
import AppBar from './extensions/AppBar';
import Drafting from './extensions/Drafting';
import Settings from './extensions/Settings';

class App extends Component {
  render() {
    return (
      <StaticLoader>
        <Workspace />
        <AppBar />
        <Settings />
        <Drafting />
      </StaticLoader>
    );
  }
}

export default App;
