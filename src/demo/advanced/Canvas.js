import React from 'react';
import Workspace from './Workspace';
import Keybinding from './Keybinding';

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = { focused: false };
    this.handleInvoke = this.handleInvoke.bind(this);
  }

  handleInvoke() {
    this.setState({ focused: true });
  }

  render() {
    const message = this.state.focused
      ? 'Canvas Focused'
      : 'Canvas Unfocused';

    return [
      <Workspace.Canvas>
        {message}
      </Workspace.Canvas>,
      <Keybinding.Binding
        hotkey="g p"
        groupName="Canvas"
        description="Focus the Canvas"
        onInvoke={this.handleInvoke} />
    ]
  }
}