import React, { Component } from 'react';
import './App.css';

import Extensions from './extensions/index';

const extensions = [
  'Workspace', 'AppBar', 'Drafting', 'Settings'
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // set all extensions to inactive
      active: extensions.reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {})
    };

    this.handleExtensionChange = this.handleExtensionChange.bind(this);
  }

  handleExtensionChange(e) {
    this.setState({
      active: {
        ...this.state.active,
        [e.target.name]: e.target.checked
      }
    });
  }

  loadedExtensions() {
    return extensions.filter(ext => {
      return this.state.active[ext];
    });
  }

  render() {
    return (
      <div>
        <ul>
          {extensions.map(ext =>
            <li key={ext}><input type="checkbox" name={ext} checked={this.state.active[ext]} onChange={this.handleExtensionChange} /> {ext}</li>
          )}
        </ul>
        <Extensions import={this.loadedExtensions()} />
      </div>
    );
  }
}

export default App;
