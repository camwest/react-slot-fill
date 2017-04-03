import * as React from 'react';
import Workspace from './Workspace';
import AppBar from './AppBar';
import Drafting from './Drafting';
import Settings from './Settings';
import Keybinding from './Keybinding';
import Canvas from './Canvas';

import { Provider } from '../../lib';

export const Advanced = () => (
  <Provider>
    <div>
      <Workspace />
      <AppBar />
      <Drafting />
      <Settings />
      <Keybinding />
      <Canvas />
    </div>
  </Provider>
);

export default Advanced;