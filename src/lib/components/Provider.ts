import * as React from 'react';
import * as mitt from 'mitt';

import { Requireable } from 'prop-types';

import { managerShape, busShape } from '../utils/PropTypes';
import Manager from '../Manager';
import Fill from './Fill';

export default class Provider extends React.Component<{}, {}> {
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
    return React.Children.only(this.props.children);
  }

  /**
   * Returns instances of Fill react components
   */
  getFillsByName(name: string): Fill[] {
    return this._manager.getFillsByName(name);
  }

  /**
   * Return React elements that were inside Fills
   */
  getChildrenByName(name: string): React.ReactChild[] {
    return this._manager.getChildrenByName(name);
  }
}
