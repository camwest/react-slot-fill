import React from 'react';

export default class StaticLoader extends React.Component {
  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        { this.props.children }
      </div>
    )
  }
}