import React from 'react';
import Workspace from './Workspace';
import AppBar from './AppBar';

import { Slot, Fill } from '../slots';

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
        <AppBar.UtilityItem
          label="Settings"
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

Settings.Group = (props) =>
  <Fill name="Settings.Group">
    <div>
      {props.label}
      {props.children}
    </div>
  </Fill>

Settings.Checkbox = (props) => {
  const {label, ...rest} = props;

  return (
    <div>
      <input type="checkbox" {...rest} /> {label}
    </div>
  );
}
