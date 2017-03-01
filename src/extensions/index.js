import React from 'react';

class Extensions extends React.Component {
  constructor(props) {
    super(props);
    this.state = { extensions: [] };
  }

  componentDidMount() {
    require.ensure([], require => {
      this.setState({ extensions: this.props.import.map(ext => require(`./${ext}`).default) });
    });
  }

  componentWillReceiveProps(nextProps) {
    require.ensure([], require => {
      this.setState({ extensions: nextProps.import.map(ext => require(`./${ext}`).default) });
    });
  }

  render() {
    return (
      <div >
        {this.state.extensions.map((ext, index) => React.createElement(ext, { key: this.props.import[index] }))}
      </div >
    );
  }
}

Extensions.defaultProps = {
  import: []
};

export default Extensions;