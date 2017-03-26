import * as React from 'react';

import { Slot, Fill } from '../../lib';

class Toolbar extends React.Component<any, any> {
  static Item = ({ label, onActive, onDeactive }: any) => (
    <Fill name="Toolbar.Item" label={label} onActive={onActive} onDeactive={onDeactive}>
      <button>{label}</button>
    </Fill>
  )

  constructor(props: any) {
    super(props);
    this.state = { currentItem: null };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick({ props }: any) {
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

        <Slot name="Toolbar.Item" fillChildProps={{ onClick: this.handleClick }} />
      </div>
    );
  }
}

export default Toolbar;
