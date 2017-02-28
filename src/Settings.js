import React from 'react';
import { Fill } from './slots';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ active: !this.state.active });
  }

  render() {
    return (
      <div>
        <Fill name="AppBar.Primary">
          <button onClick={this.handleClick}>Settings</button>
        </Fill>

        {this.state.active &&
          <Fill name="Workspace.Panel">
            <div>Hello Settings</div>
          </Fill>
        }
      </div>
    );
  }
}

