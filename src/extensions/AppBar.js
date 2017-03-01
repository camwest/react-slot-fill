import React from 'react';
import { Slot, Fill } from '../slots';
import Workspace from './Workspace';

class AppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { primarySelection: null };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(target, items) {
    target.props.onEnter();
    items.filter(item => item !== target).forEach(item => item.props.onExit());
  }

  render() {
    return (
      <Workspace.AppBar>
        <Slot name="AppBar.Primary" exposedProps={{ onClick: this.handleClick }} />
        <Slot name="AppBar.Utility" />
      </Workspace.AppBar>
    )
  }
}

AppBar.PrimaryItem = (props) =>
  <Fill name="AppBar.Primary" onEnter={props.onEnter} onExit={props.onExit}>
    <button>{props.label}</button>
  </Fill>

AppBar.PrimaryItem.defaultProps = {
  onEnter: () => { /* no-op */ },
  onExit: () => { /* no-op */ }
}

AppBar.UtilityItem = (props) =>
  <Fill name="AppBar.Utility" onEnter={props.onEnter} onExit={props.onExit}>
    <button>{props.label}</button>
  </Fill>

export default AppBar;
