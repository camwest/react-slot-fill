import React from 'react';

import { busShape } from '../utils/PropTypes';

export default class Fill extends React.Component {
  componentWillMount() {
    this.context.bus.emit('fill-mount', {
      fill: this
    });
  }

  componentDidUpdate() {
    this.context.bus.emit('fill-updated', {
      fill: this
    });
  }

  componentWillUnmount() {
    this.context.bus.emit('fill-unmount', {
      fill: this
    })
  }

  render() {
    return null;
  }
}

Fill.contextTypes = {
  bus: busShape
}