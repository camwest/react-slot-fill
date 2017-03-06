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
      ? <Viewer.Content>
        <form className="pa4">
          <fieldset id="favorite_movies" className="bn">
            <legend className="fw7 mb2">Favorite Movies</legend>
            <div className="flex items-center mb2">
              <input className="mr2" type="checkbox" id="spacejam" value="spacejam" />
              <label for="spacejam" className="lh-copy">Space Jam</label>
            </div>
            <div className="flex items-center mb2">
              <input className="mr2" type="checkbox" id="airbud" value="airbud" />
              <label for="airbud" className="lh-copy">Air Bud</label>
            </div>
            <div className="flex items-center mb2">
              <input className="mr2" type="checkbox" id="hocuspocus" value="hocuspocus" />
              <label for="hocuspocus" className="lh-copy">Hocus Pocus</label>
            </div>
            <div className="flex items-center mb2">
              <input className="mr2" type="checkbox" id="diehard" value="diehard" />
              <label for="diehard" className="lh-copy">Die Hard</label>
            </div>
            <div className="flex items-center mb2">
              <input className="mr2" type="checkbox" id="primer" value="primer" />
              <label for="primer" className="lh-copy">Primer</label>
            </div>
            <div className="flex items-center mb2">
              <input className="mr2" type="checkbox" id="proxy" value="proxy" />
              <label for="proxy" className="lh-copy">Hudsucker Proxy</label>
            </div>
            <div className="flex items-center mb2">
              <input className="mr2" type="checkbox" id="homealone" value="homealone" />
              <label for="homealone" className="lh-copy">Home Alone</label>
            </div>
          </fieldset>
        </form>
      </Viewer.Content>
      : null;

    return [
      <Toolbar.Item label="Survey"
        onActive={this.handleActive}
        onDeactive={this.handleDeactive} />,
      Content
    ];
  }
}

