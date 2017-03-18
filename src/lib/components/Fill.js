import React from 'react';

import { busShape } from '../utils/PropTypes';

export default class Fill extends React.Component {
  componentWillMount() {
    this.context.bus.dispatchEvent(new CustomEvent('fill-mount', {
      detail: {
        fill: this
      }
    }));
  }

  componentDidUpdate() {
    this.context.bus.dispatchEvent(new CustomEvent('fill-updated', {
      detail: {
        fill: this,
      }
    }));
  }

  componentWillUnmount() {
    this.context.bus.dispatchEvent(new CustomEvent('fill-unmount', {
      detail: {
        fill: this,
      }
    }))
  }

  render() {
    return null;
  }
}

Fill.contextTypes = {
  bus: busShape
}