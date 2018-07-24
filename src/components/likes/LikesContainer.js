import React, { Component } from 'react';

class LikesContainer extends Component {
  render() {
    const { children } = this.props;
    return <div className="likesContainer">{children}</div>;
  }
}

export default LikesContainer;
