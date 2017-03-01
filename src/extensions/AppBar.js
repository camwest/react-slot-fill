import React from 'react';
import { Slot, Fill } from '../slots';
import Workspace from './Workspace';

import './AppBar.css';

const style = {
  AppBar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
}

class AppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { primarySelection: null };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(target) {
    target.props.onEnter();

    // Primary and Utility share the same selection grouping
    [this._primary, this._utility]
      .forEach(slot => slot.fills
        .filter(fill => fill !== target)
        .forEach(fill => fill.props.onExit()));
  }

  render() {
    return (
      <Workspace.AppBar style={style.AppBar}>
        <Slot name="AppBar.Primary" ref={ref => this._primary = ref} exposedProps={{ onClick: this.handleClick }} />
        <Slot name="AppBar.Utility" ref={ref => this._utility = ref} exposedProps={{ onClick: this.handleClick }} />
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
    const { icon, fill, label } = this.props;

    const iconElement = icon
      ? React.cloneElement(icon, { size: 30, className: 'AppBar-AppBarItemIcon' })
      : null;

    let className = 'AppBar-AppBarItem';

    if (this.state.active) {
      className += ' AppBar-AppBarItem--active';
    }

    return (
      <Fill name={fill} onEnter={this.handleEnter} onExit={this.handleExit}>
        <button className={className}>
          {iconElement}
          {label}
        </button>
      </Fill>
    )
  }
}

BasicIcon.defaultProps = {
  icon: null,
  onEnter: () => { /* no-op */ },
  onExit: () => { /* no-op */ }
}
