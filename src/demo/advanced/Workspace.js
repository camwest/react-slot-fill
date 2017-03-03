const React = window.React;

import { Slot, Fill } from '../../lib'
import './Workspace.css';

const style = {
  container: {
    background: '#FFFFFF',
    opacity: 0.85,
    display: 'flex',
    flexGrow: 1
  },

  AppBar: {
    width: '61px',
    background: '#F9F9F9',
    borderRight: 'solid 1px #C2C2C2'
  },

  Panel: {
    background: '#FFFFFF',
    borderRight: 'solid 1px #C2C2C2',
    padding: '28px',
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
        <div style={style.Panel}>
          <Slot name="Workspace.Panel"
            exposedProps={{ onMount: this.handleOnMount, onUnmount: this.handleOnUnmount }}>
            {items => items[items.length - 1]}
          </Slot>
        </div>
      )
    } else {
      content = (
        <Slot name="Workspace.Panel" style={style.Panel}
          exposedProps={{ onMount: this.handleOnMount, onUnmount: this.handleOnUnmount }}>
          {items => items[items.length - 1]}
        </Slot>
      );
    }

    return (
      <div style={style.container}>
        <div style={style.AppBar}>
          <Slot name="Workspace.AppBar" />
        </div>
        {content}
        {canvas}
      </div>
    );
  }
}

Workspace.AppBar = (props) =>
  <Fill name="Workspace.AppBar">
    <div style={props.style}>{props.children}</div>
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

    return [
      title,
      this.props.children
    ];
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

