import * as React from 'react';
import Workspace from './Workspace';
import Keybinding from './Keybinding';

import './Canvas.css';

export default class Canvas extends React.Component<any, any> {
  private _canvas: any;

  constructor(props: any) {
    super(props);
    this.state = { focused: false };
    this.handleInvoke = this.handleInvoke.bind(this);
    this.handleFocusIn = this.handleFocusIn.bind(this);
    this.handleFocusOut = this.handleFocusOut.bind(this);
  }

  handleInvoke() {
    this._canvas.focus();
  }

  handleFocusIn() {
    this.setState({ focused: true });
  }

  handleFocusOut() {
    this.setState({ focused: false });
  }

  render() {
    const message = this.state.focused
      ? 'Canvas Focused'
      : 'Canvas Unfocused';

    return (
      <div>
        <Workspace.Canvas>
          <div
            className="Canvas"
            tabIndex={0}
            ref={r => this._canvas = r}
            onFocus={this.handleFocusIn}
            onBlur={this.handleFocusOut}
          >
            {message}
          </div>
        </Workspace.Canvas>
        <Keybinding.Binding
          hotkey="g c"
          groupName="Canvas"
          description="Focus the Canvas"
          onInvoke={this.handleInvoke}
        />
      </div>
    );
  }
}