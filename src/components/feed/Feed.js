import React, { Component } from 'react';

class Feed extends Component {
  render() {
    const { children } = this.props;
    return <div className="feed">{children}</div>;
  }
}

export default Feed;
