import React from 'react';
import { Slot, Fill } from '../slots'

const Workspace = (props) =>
  <div>
    <Slot name="Workspace.AppBar" />
    <Slot name="Workspace.Panel">
      {items => items[items.length - 1]}
    </Slot>
  </div>

Workspace.AppBar = (props) =>
  <Fill name="Workspace.AppBar">
    <div>{ props.children }</div>
  </Fill>

Workspace.Panel = (props) =>
  <Fill name="Workspace.Panel">
    <div>{ props.children }</div>
  </Fill>

export default Workspace;

