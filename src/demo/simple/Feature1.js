const React = window.React;

import Toolbar from './Toolbar';
import Viewer from './Viewer';

export default class Feature extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ active: true });
  }

  render() {
    const Content = this.state.active
      ? <Viewer.Content>Feature 1 Content</Viewer.Content>
      : null;

    return [
      <Toolbar.Item label="Feature 1" onClick={this.handleClick} />,
      Content
    ];
  }
}

