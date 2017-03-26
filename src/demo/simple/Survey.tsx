import * as React from 'react';
import Toolbar from './Toolbar';
import Viewer from './Viewer';

import SurveyForm from './SurveyForm';

export default class Feature extends React.Component<any, any> {
  constructor(props: any) {
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
    return [
      (
        <Toolbar.Item
          label="Survey"
          onActive={this.handleActive}
          onDeactive={this.handleDeactive}
        />
      ),
      this.state.active && <Viewer.Content><SurveyForm /></Viewer.Content>
    ];
  }
}
