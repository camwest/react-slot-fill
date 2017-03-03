const React = window.React;


import Workspace from './Workspace';
import AppBar from './AppBar';
import Drafting from './Drafting';
import Settings from './Settings';
import Keybinding from './Keybinding';
import Canvas from './Canvas';

export const Advanced = () => [
  <Workspace />,
  <AppBar />,
  <Drafting />,
  <Settings />,
  <Keybinding />,
  <Canvas />
];

export default Advanced;