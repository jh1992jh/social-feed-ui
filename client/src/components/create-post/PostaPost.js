import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; 
import { addPost } from '../../actions/postActions';

class PostaPost extends Component {
  state = {
    postImage: null,
    postImagePrev: null,
    text: '',
    category: 'all',
    filter: 'none'
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value})
  }

  imageHandler = e => {
    this.setState({postImage: e.target.files[0], postImagePrev: URL.createObjectURL(e.target.files[0])})
  }
  
  onPostSubmit = e => {
    e.preventDefault();

    const { postImage, text, filter } = this.state;
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
    fd.append('category', this.state.category )
    fd.append('filter', this.state.filter)
    
    this.props.addPost(fd, this.props.history);
  }
  render() {
    const { postImagePrev, text, category, filter } = this.state;
    return (
      <div className="postApost">
        <div className="postImageContainer">
          {postImagePrev !== null ? (
            <img src={postImagePrev} className={filter !== null ? `${filter}` : null} alt="post pic"/>
          ) : (<img src="http://placehold.it/200x200/92c952" alt="post pic" />)}
        </div>

        <form className="postForm" encType="multipart/form-data" onSubmit={this.onPostSubmit}>
          <input type="file" name="postImage" onChange={this.imageHandler} placeholder="Image"/>
          <input type="text" name="text" value={text} onChange={this.onInputChange} placeholder="Text"/>
          <select name="filter" onChange={this.onInputChange}>
            <option value="none">None</option>
            <option value="bw">Black and white</option>
            <option value="bright">Bright</option>
            <option value="hue1">Hue 1</option>
            <option value="hue5">Hue 5</option>
            <option value="saturate">Saturate</option>
            <option value="sepia">Sepia</option>
          </select>
          <select name="category" onChange={this.onInputChange}>
            <option value="all">All</option>
            <option value="diy">DIY</option>
            <option value="music">Music</option>
            <option value="art">Art</option>
            <option value="gaming">Gaming</option>
            <option value="fitness">Fitness</option>
            <option value="tech">Tech</option>
          </select>
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