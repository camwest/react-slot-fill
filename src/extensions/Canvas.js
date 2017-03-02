import React from 'react';

import Workspace from './Workspace';
import Keybinding from './Keybinding';

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.handleInvoke = this.handleInvoke.bind(this);
  }

  handleInvoke() {
    debugger;
  }

  render() {
    return (
      <Keybinding.Binding
        hotkey="cmd+shift+c"
        groupName="Canvas"
        description="Focus the Canvas"
        onInvoke={this.handleInvoke}>
        <Workspace.Canvas>
          Canvas!
          <input type="text" ref={r => this.input = r} />
        </Workspace.Canvas>
      </Keybinding.Binding>
    );
  }
}