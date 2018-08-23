import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; 
import { addPost } from '../../actions/postActions';

class PostaPost extends Component {
  state = {
    imageUrl: '',
    text: ''
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value})
  }

  onPostSubmit = e => {
    e.preventDefault();

    const { imageUrl, text } = this.state;
    const { profile } = this.props.profile


    const newPost = {
      postImage: imageUrl,
      text,
      handle: profile.handle,
      profileImage: profile.profileImage

    }

    this.props.addPost(newPost, this.props.history);
  }
  render() {
    const { imageUrl, text } = this.state;
    return (
      <div className="postApost">
        <div className="postImageContainer">
          {imageUrl.length > 0 ? (<img src={imageUrl} alt="post pic"/>) : (<img src="http://placehold.it/200x200/92c952" alt="post pic" />)}
        </div>

        <form className="postForm" onSubmit={this.onPostSubmit}>
          <input type="text" name="imageUrl" value={imageUrl} onChange={this.onInputChange} placeholder="Image"/>
          <input type="text" name="text" value={text} onChange={this.onInputChange} placeholder="text"/>
          <button>Submit <i className="far fa-paper-plane" /></button>
        </form>
      </div>
    )
  }
}

PostaPost.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { addPost })(PostaPost);