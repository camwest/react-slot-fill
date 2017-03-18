import React from 'react';
import Workspace from './Workspace';
import AppBar from './AppBar';
import Drafting from './Drafting';
import Settings from './Settings';
import Keybinding from './Keybinding';
import Canvas from './Canvas';

import { Provider } from '../../lib'

export const Advanced = () =>
  <Provider>
    <Workspace />
    <AppBar />
    <Drafting />
    <Settings />
    <Keybinding />
    <Canvas />
  </Provider>

export default Advanced;