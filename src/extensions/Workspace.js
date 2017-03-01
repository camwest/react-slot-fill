import React from 'react';
import { Slot, Fill } from '../slots'

const style = {
  container: {
    width: '100%',
    height: '100%',
    background: '#FFFFFF',
    opacity: 0.85,
    display: 'flex'
  },

  AppBar: {
    width: '61px',
    background: '#F9F9F9',
    borderRight: 'solid 1px #C2C2C2'
  },

  Panel: {
    width: '301px',
    background: '#FFFFFF',
    borderRight: 'solid 1px #C2C2C2',
    padding: '28px'
  }
}

const Workspace = (props) =>
  <div style={style.container}>
    <Slot name="Workspace.AppBar" style={style.AppBar} />
    <Slot name="Workspace.Panel" style={style.Panel}>
      {items => items[items.length - 1]}
    </Slot>
  </div>

Workspace.AppBar = (props) =>
  <Fill name="Workspace.AppBar" style={props.style}>
    {props.children}
  </Fill>

Workspace.Panel = (props) => {
  const title = props.title
    ? <h3>{props.title}</h3>
    : null;

  return (
    <Fill name="Workspace.Panel">
      <div>
        {title}
        {props.children}
      </div>
    </Fill>
  );
}

export default Workspace;

