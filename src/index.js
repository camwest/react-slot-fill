const React = window.React;
const ReactDOMFiber = window.ReactDOMFiber;

import App from './demo/App';

ReactDOMFiber.render(
  <App />,
  document.getElementById('root')
);
