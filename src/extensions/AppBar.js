import React from 'react';
import { Slot, Fill } from '../slots';
import Workspace from './Workspace';

import './AppBar.css';

const style = {
  AppBar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
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
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(target) {
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
        <Slot name="AppBar.Primary" exposedProps={{ onClick: this.handleClick }} style={style.AppBarGroup} />
        <Slot name="AppBar.Utility" exposedProps={{ onClick: this.handleClick }} style={style.AppBarGroup} />
      </Workspace.AppBar>
    )
  }
}

export default AppBar;

AppBar.PrimaryItem = (props) => <BasicIcon fill="AppBar.Primary" {...props} />
AppBar.UtilityItem = (props) => <BasicIcon fill="AppBar.Utility" {...props} />

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
    const { icon, fill, label, order } = this.props;

    const iconElement = icon
      ? React.cloneElement(icon, { size: 30, className: 'AppBar-AppBarItemIcon' })
      : null;

    let className = 'AppBar-AppBarItem';

    if (this.state.active) {
      className += ' AppBar-AppBarItem--active';
    }

    return (
      <Fill name={fill} onEnter={this.handleEnter} onExit={this.handleExit}>
        <button className={className} style={{ order }}>
          {iconElement}
          {label}
        </button>
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
