import * as React from 'react';
// import Advanced from './advanced';
import Simple from './simple';

import './App.css';

const AppStyle: any = {
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
  width: '100%'
};

const linkClass = 'f4 fw7 dib pa2 no-underline bg-animate bg-white hover-bg-light-blue black';

const examples = {
  simple: {
    label: 'Simple',
    extensions: <Simple />
  },

  // advanced: {
  //   label: 'Advanced',
  //   extensions: <Advanced />
  // }
};

export interface State {
  example: string;
}

class App extends React.Component<void, State> {
  constructor() {
    super();
    this.state = { example: Object.keys(examples)[0] };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ example: event.target.value });
  }
  render() {
    return (
      <div style={AppStyle}>
        <div className="AppHeader">
          <a className={linkClass} href="http://github.com/camwest/react-slot-fill">github</a>

          <select className="ml2" value={this.state.example} onChange={this.handleChange}>
            {Object.keys(examples).map(example =>
              <option value={example}>{examples[example].label}</option>
            )}
          </select>
        </div>

        {examples[this.state.example].extensions}
      </div>
    );
  }
}

export default App;
