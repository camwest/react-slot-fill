import React from 'react';
import { Slot, Fill } from '../../lib';

const Viewer = (props) =>
  <div>
    <h2>Content</h2>
    <Slot name="Viewer.Content">
      {items => items[items.length - 1]}
    </Slot>
  </div>

export default Viewer;

Viewer.Content = (props) =>
  <Fill name="Viewer.Content">
    <div>{props.children}</div>
  </Fill>

