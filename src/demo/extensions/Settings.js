import React from 'react';
import SettingsIcon from 'react-icons/lib/md/settings';

import { Slot, Fill } from '../../lib';
import AppBar from './AppBar';
import Workspace from './Workspace';

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
        <AppBar.UtilityItem
          label="Settings"
          hotkey="command+,"
          order={1}
          icon={<SettingsIcon />}
          onEnter={this.handleEnter}
          onExit={this.handleExit} />

        {this.state.active &&
          <Workspace.Panel title="Settings">
            <Slot name="Settings.Group" />
          </Workspace.Panel>
        }
      </div>
    );
  }
}


Settings.Group = class extends React.Component {
  render() {
    return (
      <Fill name="Settings.Group">
        <h4>{this.props.label}</h4>
        {this.props.children}
      </Fill>
    );
  }
}

Settings.TextInput = (props) => {
  const { label, ...rest } = props;

  return (
    <div>
      <input type="text" {...rest} /> {label}
    </div>
  )
}

Settings.Checkbox = (props) => {
  const { label, ...rest } = props;

  return (
    <div>
      <input type="checkbox" {...rest} /> {label}
    </div>
  );
}
