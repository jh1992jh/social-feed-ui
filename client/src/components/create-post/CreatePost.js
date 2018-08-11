import React, { Component } from 'react';
import CreatePostHeader from './CreatePostHeader';
import CreatePostContent from './CreatePostContent';

class CreatePost extends Component {
  render() {
    return (
      <div className="createPost">
        <CreatePostHeader />
        <CreatePostContent />
      </div>
    );
  }
}

export default CreatePost;
