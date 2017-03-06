import React from 'react';
import Toolbar from './Toolbar';
import Viewer from './Viewer';

export default class Feature extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
    this.handleActive = this.handleActive.bind(this);
    this.handleDeactive = this.handleDeactive.bind(this);
  }

  handleActive() {
    this.setState({ active: true });
  }

  handleDeactive() {
    this.setState({ active: false });
  }

  render() {
    const Content = this.state.active
      ? <Viewer.Content>Feature 1 Content</Viewer.Content>
      : null;

    return [
      <Toolbar.Item label="Feature 1"
        onActive={this.handleActive}
        onDeactive={this.handleDeactive} />,
      Content
    ];
  }
}

