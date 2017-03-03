const React = window.React;

import Toolbar from './Toolbar';
import Viewer from './Viewer';
import Feature1 from './Feature1';
import Feature2 from './Feature2';

export const Simple = () => [
  <Toolbar />,
  <Viewer />,
  <Feature1 />,
  <Feature2 />
];

export default Simple;