import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class ProfileBodyTop extends Component {
  render() {
    let outputContent;

    outputContent = (
      <div className="forDesktop">
        <div className="tab selected">
          <i className="fas fa-th" /> <span>POSTS</span>
        </div>
        <div className="tab">
          <i className="fas fa-tv muted" />{' '}
          <span className="muted">IGTV</span>
        </div>
        <div className="tab">
          <i className="far fa-bookmark muted" />{' '}
          <span className="muted">SAVED</span>
        </div>
        <div className="tab">
          <i className="fas fa-user-tag muted" />{' '}
          <span className="muted">TAGGED</span>
        </div>
      </div>
    );
    /* if (
      Object.keys(this.props.match.params).length > 0 &&
      Object.keys(this.props.profile.currentProfile).length > 0
    ) {
      outputContent = (
        <div className="forDesktop">
          <div className="tab selected">
            <i className="fas fa-th" /> <span>POSTS</span>
          </div>
          <div className="tab">
            <i className="fas fa-user-tag muted" />{' '}
            <span className="muted">TAGGED</span>
          </div>
        </div>
      );
    } else {
      outputContent = (
        <div className="forDesktop">
          <div className="tab selected">
            <i className="fas fa-th" /> <span>POSTS</span>
          </div>
          <div className="tab">
            <i className="fas fa-tv muted" />{' '}
            <span className="muted">IGTV</span>
          </div>
          <div className="tab">
            <i className="far fa-bookmark muted" />{' '}
            <span className="muted">SAVED</span>
          </div>
          <div className="tab">
            <i className="fas fa-user-tag muted" />{' '}
            <span className="muted">TAGGED</span>
          </div>
        </div>
      );
    } */
    return (
      <div className="profileBodyTop">
        {outputContent}
        <div className="forMobile">
          <i className="fas fa-th selected" />
          <i className="fas fa-arrows-alt-v" />
          <i className="fas fa-user-tag" />
        </div>
      </div>
    );
  }
}

export default connect(null)(withRouter(ProfileBodyTop));
