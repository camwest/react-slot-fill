import * as React from 'react';
import * as mitt from 'mitt';

import { managerShape, busShape } from '../utils/PropTypes';
import Manager from '../Manager';

export default class Provider extends React.Component<void, void> {
  static childContextTypes = {
    manager: managerShape,
    bus: busShape
  };

  private _bus: mitt.Emitter;
  private _manager: Manager;

  constructor() {
    super();
    this._bus = new mitt();
    this._manager = new Manager(this._bus);
    this._manager.mount();
  }

  componentWillUnmount() {
    this._manager.unmount();
  }

  getChildContext() {
    return {
      bus: this._bus,
      manager: this._manager
    };
  }

  render() {
    return this.props.children;
  }
}
