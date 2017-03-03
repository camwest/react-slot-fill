# react-slot-fill

Slot & Fill component for merging React subtrees together.

```
npm install react-slot-fill
```

Check out the [demos](http://react-slot-fill.surge.sh/)

### Toolbar.js

```html
import { Slot, Fill } from 'react-slot-fill';

const Toolbar = (props) =>
  <div>
    <Slot name="Toolbar.Item" />
  </div>

export default Toolbar;

Toolbar.Item = (props) =>
  <Fill name="Toolbar.Item">
    <button>{ props.label }</button>
  </Fill>
```

### Feature.js

```html
import Toolbar from './Toolbar';

const Feature = () =>
  [
    <Toolbar.Item label="My Feature!" />
  ];
```

### App.js

```html
import Toolbar from './Toolbar';
import Feature from './Feature';

const App = () => [
  <Toolbar />,
  <Feature />
];

ReactDOMFiber.render(
  <App />,
  document.getElementById('root')
);
```

