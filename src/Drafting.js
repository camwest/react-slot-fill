import { Fill } from './slots';
import React from 'react';

export default class Drafting extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
    this.handleActivate = this.handleActivate.bind(this);
    this.handleDeactivate = this.handleDeactivate.bind(this);
  }

  handleActivate() {
    this.setState({ active: !this.state.active });
  }
  handleDeactivate() {
    debugger;
  }

  render() {
    return (
      <div>
        <Fill name="AppBar.Primary">
          <button>Drafting</button>
        </Fill>

        {this.state.active &&
          <Fill name="Workspace.Panel">
            <div>Hello Drafting</div>
          </Fill>
        }
      </div>
    );
  }
}

