const React = window.React;

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
          <select value={this.state.value} onChange={this.handleChange}>
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
