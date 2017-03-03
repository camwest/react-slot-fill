const React = window.React;

import './App.css';
import 'tachyons/css/tachyons.min.css';

import Workspace from './extensions/Workspace';
import AppBar from './extensions/AppBar';
import Drafting from './extensions/Drafting';
import Settings from './extensions/Settings';
import Keybinding from './extensions/Keybinding';
import Canvas from './extensions/Canvas';

class App extends React.Component {
  render() {
    return [
      <Workspace />,
      <AppBar />,
      <Settings />,
      <Drafting />,
      <Keybinding />,
      <Canvas />
    ];
  }
}

export default App;
