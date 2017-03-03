const React = window.React;
const ReactDOMFiber = window.ReactDOMFiber;

import App from './demo/App';
import 'tachyons/css/tachyons.min.css';

ReactDOMFiber.render(
  <App />,
  document.getElementById('root')
);
