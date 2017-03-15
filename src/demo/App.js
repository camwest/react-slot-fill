import React from 'react';
import Advanced from './advanced';
import Simple from './simple';

import './App.css';

const style = {
  App: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%'
  }
}

const examples = {
  simple: {
    label: 'Simple',
    extensions: <Simple />
  },

  advanced: {
    label: 'Advanced',
    extensions: <Advanced />
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { example: Object.keys(examples)[0] }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ example: event.target.value });
  }
  render() {

    return (
      <div style={style.App}>
        <div className="AppHeader">
          <a className="f4 fw7 dib pa2 no-underline bg-animate bg-white hover-bg-light-blue black" href="http://github.com/camwest/react-slot-fill">github</a>

          <select className="ml2" value={this.state.value} onChange={this.handleChange}>
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
