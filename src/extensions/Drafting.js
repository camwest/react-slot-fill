import React from 'react';
import Workspace from './Workspace';
import AppBar from './AppBar';

import CreateIcon from 'react-icons/lib/md/create';

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
        <AppBar.PrimaryItem
          label="Drafting"
          icon={<CreateIcon />}
          onEnter={this.handleEnter}
          onExit={this.handleExit} />

        {this.state.active &&
          <Workspace.Panel>
            <div>Hello Drafting</div>
          </Workspace.Panel>
        }
      </div>
    );
  }
}

