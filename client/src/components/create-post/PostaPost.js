import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { addPost } from '../../actions/post2Actions';

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
    const { user } = this.props.auth


    const newPost = {
      postImage: imageUrl,
      text,
      username: user.username,
      profileImage: user.profileImage

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

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { addPost })(PostaPost);