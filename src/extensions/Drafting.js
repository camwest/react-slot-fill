import React from 'react';

import Workspace from './Workspace';
import AppBar from './AppBar';
import Settings from './Settings';

import CreateIcon from 'react-icons/lib/md/create';

export default class Drafting extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false, snapping: false };
    this.handleEnter = this.handleEnter.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.handleEnableSnapping = this.handleEnableSnapping.bind(this);
  }

  handleEnter() {
    this.setState({ active: true });
  }
  handleExit() {
    this.setState({ active: false });
  }

  handleEnableSnapping(e) {
    this.setState({ snapping: e.target.checked });
  }

  render() {
    const snappingNotice = (this.state.snapping)
      ? <div>Snapping is enabled!</div>
      : <div>Snapping is NOT enabled!</div>;

    return (
      <div>
        <AppBar.PrimaryItem
          label="Drafting"
          hotkey="command+shift+d"
          order={0}
          icon={<CreateIcon />}
          onEnter={this.handleEnter}
          onExit={this.handleExit} />

        {this.state.active &&
          <Workspace.Panel title="Drafting">
            {snappingNotice}
          </Workspace.Panel>
        }

        <Settings.Group label="Drafting Options">
          <Settings.Checkbox label="Enable Snapping" checked={this.state.snapping} onChange={this.handleEnableSnapping} />
        </Settings.Group>
      </div>
    );
  }
}

