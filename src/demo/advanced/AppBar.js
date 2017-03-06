import React from 'react';
import { Slot, Fill } from '../../lib';
import Workspace from './Workspace';
import Keybinding from './Keybinding';

import './AppBar.css';

const style = {
  AppBar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'
  },

  AppBarGroup: {
    display: 'flex',
    flexDirection: 'column'
  }
}

class AppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selection: null };
    this.handleActivate = this.handleActivate.bind(this);
  }

  handleActivate(target) {
    if (this.state.selection === target) {
      target.props.onExit();
      this.setState({ selection: null });
    } else {
      target.props.onEnter();

      // Remove old selection if we have one
      if (this.state.selection) {
        this.state.selection.props.onExit();
      }

      // Remember selection
      this.setState({ selection: target });
    }
  }

  render() {
    return (
      <Workspace.AppBar style={style.AppBar}>
        <div style={style.AppBarGroup}>
          <Slot name="AppBar.Primary" exposedProps={{ onActivate: this.handleActivate }} />
        </div>
        <div style={style.AppBarGroup}>
          <Slot name="AppBar.Utility" exposedProps={{ onActivate: this.handleActivate }}  />
        </div>
      </Workspace.AppBar>
    )
  }
}

export default AppBar;

AppBar.PrimaryItem = (props) => <BasicIcon fill="AppBar.Primary" {...props} />
AppBar.UtilityItem = (props) => <BasicIcon fill="AppBar.Utility" {...props} />

class HotkeyButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleActivate = this.handleActivate.bind(this);
  }

  handleActivate() {
    this.props.onActivate();
  }

  render() {
    // eslint-disable-next-line
    const { children, hotkey, onActivate, label, ...rest } = this.props;

    return [
      <Keybinding.Binding
        hotkey={hotkey}
        groupName="App Bar"
        description={`Activate ${label}`}
        onInvoke={this.handleActivate} />,
      <button {...rest} onClick={this.handleActivate}>
        {children}
      </button>
    ];
  }
}

HotkeyButton.defaultProps = {
  onActivate: () => { /* no-op */ }
}

class BasicIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
    this.handleEnter = this.handleEnter.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }

  handleEnter() {
    this.setState({ active: true });
    this.props.onEnter();
  }

  handleExit() {
    this.setState({ active: false });
    this.props.onExit();
  }

  render() {
    const { icon, fill, label, order, hotkey } = this.props;

    const iconElement = icon
      ? React.cloneElement(icon, { size: 30, className: 'AppBar-AppBarItemIcon' })
      : null;

    let className = 'AppBar-AppBarItem';

    if (this.state.active) {
      className += ' AppBar-AppBarItem--active';
    }

    return (
      <Fill name={fill} onEnter={this.handleEnter} onExit={this.handleExit}>
        <HotkeyButton hotkey={hotkey} label={label} className={className} style={{ order }}>
          {iconElement}
          {label}
        </HotkeyButton>
      </Fill>
    )
  }
}

BasicIcon.defaultProps = {
  icon: null,
  order: null,
  onEnter: () => { /* no-op */ },
  onExit: () => { /* no-op */ }
}
