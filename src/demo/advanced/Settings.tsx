import * as React from 'react';
import SettingsIcon from 'react-icons/lib/md/settings';

import { Slot, Fill } from '../../lib';
import AppBar from './AppBar';
import Workspace from './Workspace';

export default class Settings extends React.Component<any, any> {
  static Group = ({ label, children }: any) => (
    <Fill name="Settings.Group">
      <h4>{label}</h4>
      {children}
    </Fill>
  )

  static TextInput = ({ label, ...rest }: any) => (
    <div>
      <input type="text" {...rest} /> {label}
    </div>
  )

  static Checkbox = ({ label, ...rest }: any) => (
    <div>
      <input type="checkbox" {...rest} /> {label}
    </div>
  )

  constructor(props: any) {
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
    // const Panel = this.state.active
      // ? <Workspace.Panel title="Settings"><Slot name="Settings.Group" /></Workspace.Panel>
      // : null;

    return (
      <div>
        <AppBar.UtilityItem
          label="Settings"
          hotkey="command+,"
          order={1}
          icon={<SettingsIcon />}
          onEnter={this.handleEnter}
          onExit={this.handleExit}
        />
        {/*{Panel}*/}
      </div>
    );
  }
}
