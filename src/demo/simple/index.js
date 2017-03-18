import React from 'react';
import Toolbar from './Toolbar';
import Viewer from './Viewer';
import News from './News';
import Survey from './Survey';

import { Provider } from '../../lib';

export const Simple = () =>
  <Provider>
    <Toolbar />
    <Viewer />
    <News />
    <Survey />
  </Provider>

export default Simple;