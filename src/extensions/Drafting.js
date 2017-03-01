import React from 'react';
import Workspace from './Workspace';
import AppBar from './AppBar';

export default class Drafting extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
    this.handleEnter = this.handleEnter.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }

  handleEnter() {
    this.setState({ active: true });
  }
  handleExit() {
    this.setState({ active: false });
  }

  render() {
    return (
      <div>
        <AppBar.PrimaryItem label="Drafting" onEnter={this.handleEnter} onExit={this.handleExit} />

        {this.state.active &&
          <Workspace.Panel>
            Hello Drafting
          </Workspace.Panel>
        }
      </div>
    );
  }
}

