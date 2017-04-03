import * as React from 'react';
import Toolbar from './Toolbar';
import Viewer from './Viewer';
import News from './News';
import Survey from './Survey';

import { Provider } from '../../lib';

export const Simple = () =>
  (
    <Provider>
      <div>
        <Toolbar />
        <Viewer />
        <News />
        <Survey />
      </div>
    </Provider>
  );

export default Simple;