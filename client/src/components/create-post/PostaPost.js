import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; 
import { addPost } from '../../actions/postActions';

class PostaPost extends Component {
  state = {
    postImage: null,
    text: ''
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value})
  }

  imageHandler = e => {
    this.setState({postImage: e.target.files[0]})
  }
  
  onPostSubmit = e => {
    e.preventDefault();

    const { postImage, text } = this.state;
    const { profile } = this.props.profile

    const fd = new FormData()
   /*const newPost = {
      postImage: postImage.name,
      text,
      handle: profile.handle,
      profileImage: profile.profileImage

    }*/

    fd.append('postImage', this.state.postImage ,this.state.postImage.name )
    fd.append('text', this.state.text )
    
    this.props.addPost(fd, this.props.history);
  }
  render() {
    const { image, text } = this.state;
    return (
      <div className="postApost">
        <div className="postImageContainer">
          {image !== null ? (<img src={image} alt="post pic"/>) : (<img src="http://placehold.it/200x200/92c952" alt="post pic" />)}
        </div>

        <form className="postForm" encType="multipart/form-data" onSubmit={this.onPostSubmit}>
          <input type="file" name="postImage" onChange={this.imageHandler} placeholder="Image"/>
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