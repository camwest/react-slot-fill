import React from 'react';

import { Slot, Fill } from '../../lib';

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentItem: null };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick({ props }) {
    if (this.state.currentItem) {
      this.state.currentItem.onDeactive();
    }

    props.onActive();
    this.setState({ currentItem: props });
  }

  render() {
    return (
      <div>
        <h2>Toolbar</h2>
        {this.state.currentItem &&
          <h3>Current Item: {this.state.currentItem.label}</h3>}

        <Slot name="Toolbar.Item" exposedProps={{ onClick: this.handleClick }} />
      </div>
    );
  }
}

export default Toolbar;

  Toolbar.Item = ({ label, onActive, onDeactive }) =>
    <Fill name="Toolbar.Item" label={label} onActive={onActive} onDeactive={onDeactive}>
      <button>{label}</button>
    </Fill>