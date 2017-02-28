import React from 'react';
import { Slot, Fill } from './slots';

class AppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { primarySelection: null };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    debugger;
  }

  render() {
    return (
      <Fill name="Workspace.AppBar">
        <div className="appBar">
          <Slot name="AppBar.Primary" exposedProps={{ onClick: this.handleClick }} />
          <Slot name="AppBar.Utility" />
        </div>
      </Fill>
    )
  }
}

export default AppBar;
