import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postActions';
import PreviewFilter from './PreviewFilter';
import placeHolder from './placeholder1.png';

class PreviewPost extends Component {
    state = {
        previewImage: placeHolder,
        postImage: null,
        filter: 'none',
        text: '',
        category: 'all',
        showForm: 'preview'
    }

    handleImageUpload = (e) => {
      this.setState({ previewImage: URL.createObjectURL(e.target.files[0]), postImage: e.target.files[0]})
    }

    setFilter = (filter) => {
      this.setState({ filter: filter })
    }

    onInputChange = e => {
      this.setState({ [e.target.name]: e.target.value})
    }
     
  onPostSubmit = e => {
    e.preventDefault();

    const { postImage, text, filter } = this.state;

    const fd = new FormData()


    fd.append('postImage', this.state.postImage ,this.state.postImage.name )
    fd.append('text', this.state.text )
    fd.append('category', this.state.category )
    fd.append('filter', this.state.filter)
    
    this.props.addPost(fd, this.props.history);
  }

  render() {
    const { previewImage, postImage, filter, showForm } = this.state;

    let displayForm;

    if(showForm === 'preview') {
      displayForm = (
        <Fragment>
        <div className="previewHeader">
          <span> <i className="fas fa-arrow-left" onClick={() => this.props.history.go(-1)}/>{' '}</span>
          <span className="next" onClick={() => this.setState({ showForm: 'post'})}>Next</span>
        </div>
        <div className="previewImage">
            <img src={previewImage}  className={filter} alt="preview"/>
            <input type="file" name="postImage" onChange={this.handleImageUpload}/>
        </div>

        <div className="previewFilterContainer">
            <PreviewFilter previewImage={previewImage} setFilter={this.setFilter} filter="bw" />
            <PreviewFilter previewImage={previewImage} setFilter={this.setFilter} filter="bright" />
            <PreviewFilter previewImage={previewImage} setFilter={this.setFilter} filter="hue1" />
            <PreviewFilter previewImage={previewImage} setFilter={this.setFilter} filter="hue2" />
            <PreviewFilter previewImage={previewImage} setFilter={this.setFilter} filter="hue3" />
            <PreviewFilter previewImage={previewImage} setFilter={this.setFilter} filter="hue4" />
            <PreviewFilter previewImage={previewImage} setFilter={this.setFilter} filter="hue5" />
            <PreviewFilter previewImage={previewImage} setFilter={this.setFilter} filter="saturate" />
            <PreviewFilter previewImage={previewImage} setFilter={this.setFilter} filter="sepia" />
        </div>
        </Fragment>
      )
    } else {
      displayForm = (
        <Fragment>
        <div className="previewHeader">
        <span> <i className="fas fa-arrow-left" onClick={() => this.props.history.go(-1)}/>{' '}</span>
        <span className="next" onClick={() => this.setState({ showForm: 'post'})}>Next</span>
      </div>
      <form className="postForm" onSubmit={this.onPostSubmit}>
      <div className="textAndImage">
      <img src={previewImage}  className={filter} alt="preview"/>
      <textarea name="text" onChange={this.onInputChange} />
      </div>

      <select name="category" onChange={this.onInputChange}>
      <option value="all">All</option>
      <option value="diy">DIY</option>
      <option value="music">Music</option>
      <option value="art">Art</option>
      <option value="gaming">Gaming</option>
      <option value="fitness">Fitness</option>
      <option value="tech">Tech</option>
    </select>

      <button>Share  <i className="far fa-paper-plane" /></button>
      </form>
        </Fragment>
      )
    }
     
    return (
      <div className="previewPost">
        {displayForm}
      </div>
    )
  }
}

PreviewPost.propTypes = {
  addPost: PropTypes.func.isRequired
}

export default connect(null , { addPost })(PreviewPost)