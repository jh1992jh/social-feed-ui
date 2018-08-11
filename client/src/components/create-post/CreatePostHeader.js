import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class CreatePostHeader extends Component {
  constructor(props) {
    super(props);

    this.onGoBack = this.onGoBack.bind(this);
  }
  onGoBack() {
    this.props.history.goBack();
  }
  render() {
    return (
      <div className="createPostHeader">
        <div className="createPostHeaderLeft">
          <i className="fas fa-times" onClick={this.onGoBack} />
          <select>
            <option defaultValue="gallery">Gallery</option>
            <option value="camera">Camera</option>
            <option value="videos">Videos</option>
            <option value="Screenshots">Screenshots</option>
          </select>
        </div>
        <div className="createPostHeaderRight">
          <span>Next</span>
        </div>
      </div>
    );
  }
}

export default withRouter(CreatePostHeader);
