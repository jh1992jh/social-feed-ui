import React, { Component } from 'react';

class LikesHeader extends Component {
  render() {
    return (
      <div className="likesHeader">
        <div className="likesHeaderFollowing">
          <p>FOLLOWING</p>
        </div>
        <div className="likesHeaderYou selected">
          <p>YOU</p>
        </div>
      </div>
    );
  }
}

export default LikesHeader;
