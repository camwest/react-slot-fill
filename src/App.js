import React, { Component } from 'react';
import './App.css';
import 'tachyons/css/tachyons.min.css';

import StaticLoader from './extensions/StaticLoader';
import Workspace from './extensions/Workspace';
import AppBar from './extensions/AppBar';
import Drafting from './extensions/Drafting';
import Settings from './extensions/Settings';
import Keybinding from './extensions/Keybinding';
import Canvas from './extensions/Canvas';

class App extends Component {
  render() {
    return (
      <StaticLoader>
        <Workspace />
        <AppBar />
        <Settings />
        <Drafting />
        <Keybinding />
        <Canvas />
      </StaticLoader>
    );
  }
}

export default App;
