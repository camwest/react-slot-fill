import React from 'react';
import { Slot, Fill } from '../slots'
import SplitPane from 'react-split-pane';

import './Workspace.css';

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

  SplitPaneContainer: {
    position: 'relative',
    width: '100%'
  },

  Panel: {
    background: '#FFFFFF',
    borderRight: 'solid 1px #C2C2C2',
    padding: '28px',
    height: '100%',
    overflow: 'hidden'
  }
}

class Workspace extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showPanel: false, size: 500 };
    this.handleOnMount = this.handleOnMount.bind(this);
    this.handleOnUnmount = this.handleOnUnmount.bind(this);
    this.handleSplitChange = this.handleSplitChange.bind(this);
  }

  handleOnMount(fill) {
    this.setState({ showPanel: true });
  }

  handleOnUnmount(fill) {
    this.setState({ showPanel: false });
  }

  handleSplitChange(size) {
    this.setState({ size });
  }

  render() {
    const canvas = <Slot name="Workspace.Canvas" />;

    let content;

    if (this.state.showPanel) {
      content = (
        <div style={style.SplitPaneContainer}>
          <SplitPane split="vertical" size={this.state.size} defaultSize={300} minSize={300} maxSize={-300} onChange={ this.handleSplitChange }>
            <Slot name="Workspace.Panel" style={style.Panel}
              exposedProps={{ onMount: this.handleOnMount, onUnmount: this.handleOnUnmount }}>
              {items => items[items.length - 1]}
            </Slot>
            {canvas}
          </SplitPane>
        </div>
      )
    } else {
      content = (
        <div style={style.SplitPaneContainer}>
          <Slot name="Workspace.Panel" style={style.Panel}
            exposedProps={{ onMount: this.handleOnMount, onUnmount: this.handleOnUnmount }}>
            {items => items[items.length - 1]}
          </Slot>
          {canvas}
        </div>
      );
    }

    return (
      <div style={style.container}>
        <Slot name="Workspace.AppBar" style={style.AppBar} />
        {content}
      </div>
    );
  }
}

Workspace.AppBar = (props) =>
  <Fill name="Workspace.AppBar" style={props.style}>
    {props.children}
  </Fill>

class Panel extends React.Component {
  componentDidMount() {
    this.props.onMount();
  }

  componentWillUnmount() {
    this.props.onUnmount();
  }

  render() {
    const title = this.props.title
      ? <h3>{this.props.title}</h3>
      : null;

    return (
      <div>
        {title}
        {this.props.children}
      </div>
    )
  }
}

Workspace.Panel = (props) => {
  return (
    <Fill name="Workspace.Panel">
      <Panel {...props} />
    </Fill>
  );
}

Workspace.Canvas = (props) => {
  return (
    <Fill name="Workspace.Canvas">
      <div>{props.children}</div>
    </Fill>
  )
}

export default Workspace;

