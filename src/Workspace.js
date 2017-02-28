import React from 'react';
import { Slot } from './slots'

const Workspace = (props) =>
  <div>
    <Slot name="Workspace.AppBar" />
    <Slot name="Workspace.Panel">
      {items => items[items.length - 1]}
    </Slot>
  </div>

export default Workspace;
