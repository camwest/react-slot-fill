import * as React from 'react';
import { Slot, Fill } from '../../lib';

export default class Viewer extends React.Component<any, void> {
  static Content = (props: any) => (
    <Fill name="Viewer.Content">
      <div>{props.children}</div>
    </Fill>
  )

  render() {
    return (
      <div>
        <h2>Content</h2>
        <Slot name="Viewer.Content">
          {(items: any) => items[items.length - 1]}
        </Slot>
      </div>
    );
  }
}
