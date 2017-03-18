# react-slot-fill &middot; [![CircleCI Status](https://circleci.com/gh/camwest/react-slot-fill.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/camwest/react-slot-fill) [![Codacy Badge](https://api.codacy.com/project/badge/Coverage/e7c3e47817fc4a81baca16cdb9a78ac1)](https://www.codacy.com/app/cameron_4/react-slot-fill?utm_source=github.com&utm_medium=referral&utm_content=camwest/react-slot-fill&utm_campaign=Badge_Coverage) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)



![Image](images/slot-fill-logo.png)

Slot & Fill component for merging React subtrees together.

**WARNING** This library is considered alpha and has not been released check out the demos and feel free to give me feedback  star the repository and I'll get it released soon!

## Installation

```
npm install react-slot-fill --save
```

### Check out the examples locally

```
git clone https://github.com/camwest/react-slot-fill
cd react-slot-fill
npm start
```

## Usage

**Note** These examples use React Fiber Alpha

### Toolbar.js

```jsx
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

```jsx
import Toolbar from './Toolbar';

const Feature = () =>
  [
    <Toolbar.Item label="My Feature!" />
  ];
```

### App.js

```jsx
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

## Components

### <Slot>

Expose a global extension point

```javascript
import { Slot } from 'react-slot-fill';
```

#### Props

```typescript
interface Props {
  /**
   * The name of the component. Use a symbol if you want to be 100% sue the Slot
   * will only be filled by a component you create
   */
  name: string | Symbol;

  /**
   * Props to be applied to the child Element of every fill which has the same name.
   *
   *  If the value is a function, it must have the following signature:
   *    (target: Fill, fills: Fill[]) => void;
   *
   *  This allows you to access props on the fill which invoked the function
   *  by using target.props.something()
   */
  fillChildProps?: {[key: string]: any}

  /**
   * A an optional function which gets all of the current fills for this slot
   * Allows sorting, or filtering before rendering. An example use-case could
   * be to only show a limited amount of fills.
   */
  children?: (fills) => JSX.Element
}
```

### <Fill>

Render children into a Slot

```javascript
import { Fill } from 'react-slot-fill';
```


#### Props

```typescript
interface Props {
  /**
   * The name of the slot that this fill should be related to.
   */
  name: string | Symbol

  /**
   * one or more JSX.Elements which will be rendered
   */
  children: JSX.Element | JSX.Element[]
}
```

You can add additional props to the Fill which can be accessed in the parent node of the slot via fillChildProps.
