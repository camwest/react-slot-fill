import React from 'react';
import Workspace from './Workspace';
import AppBar from './AppBar';

import SettingsIcon from 'react-icons/lib/md/settings';

export default class Settings extends React.Component {
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
          label="Settings"
          icon={<SettingsIcon />}
          onEnter={this.handleEnter}
          onExit={this.handleExit} />

        {this.state.active &&
          <Workspace.Panel>
            <div>Hello Settings</div>
          </Workspace.Panel>
        }
      </div>
    );
  }
}

