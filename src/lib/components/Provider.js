import React from 'react';
import mitt from 'mitt';

import { managerShape, busShape } from '../utils/PropTypes';
import Manager from '../Manager';


export default class Provider extends React.Component {
  constructor() {
    super();
    this._bus = mitt();
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
    }
  }

  render() {
    return this.props.children;
  }
}

Provider.childContextTypes = {
  manager: managerShape,
  bus: busShape
}
