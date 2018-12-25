import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postActions';
import PreviewFilter from './PreviewFilter';
import placeHolder from './placeholder1.png';

const PreviewPostStyled = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    @media (min-width: 1000px) {
      min-height: 100vh;
    }
`

const PreviewHeader = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;

    span {
      margin: 0.5em 1em;
      color: #0099cc;
    }
`;

const PreviewImage = styled.div`
    margin: auto;
    width: 70vw;
    height: 70vw;

    img {
      width: 70vw;
      height: 70vw;
      margin: auto;
    }

    input {
      margin-top: 1em;
      width: 100%;
      background: #fff;
    }

    span {
      display: none;
    }

    @media (min-width: 1000px) {
      margin: 2em auto;
      width: 30vw;
      height: auto;

      img {
        width: 100%;
        height: auto;
        max-height: 55vh;
      }

      span {
        display: block;
        color: #0099cc;
        margin: 0.2em auto 0 auto;
      }
    }
`;

const PostForm = styled.form`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;

    select {
      margin: 4em auto;
      width: calc(100% - 2.5vw);
    }

    button {
      background-color: #0099cc;
      color: #fff;
      font-weight: 600;
      border: none;
      border-radius: 5.5px;
      padding: 0.6em;
      margin: 2em auto;
      width: calc(100% - 2.5vw);
      display: block
    }

    @media (min-width: 1000px) {
        margin: auto;
        max-width: 100%;
        align-items: center;
    }
`;

const TextAndImage = styled.div`
    display: flex;
    width: 100%;
    align-items: flex-start;

    img {
      max-width: 30vw;
      max-height: 30vw;
      margin: 2.5vw;
    }

    textarea {
      margin: 2.5vw 2.5vw 2.5vw 0;
      outline: none;
      width: 60vw;
      height: 30vw;
    }

    @media (min-width: 1000px) {
      img {
        min-width: 30vw;
      min-height: 30vw;
        flex: 3;
        width: 100%;
        height: auto;
      }

      textarea {
        flex: 1;
        
      }
    }
`;
const PreviewFilterContainer = styled.div`
    display: flex;
    width: 100%;
    overflow-x: scroll;
    margin: 3.5em 0;

    @media (min-width: 1000px) {
      margin: 0 auto;
    }
`;
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

    const fd = new FormData()


    fd.append('postImage', this.state.postImage ,this.state.postImage.name )
    fd.append('text', this.state.text )
    fd.append('category', this.state.category )
    fd.append('filter', this.state.filter)
    
    this.props.addPost(fd, this.props.history);
  }

  render() {
    const { previewImage, filter, showForm } = this.state;

    let displayForm;

    if(showForm === 'preview') {
      displayForm = (
        <Fragment>
        <PreviewHeader>
          <span> <i className="fas fa-arrow-left" onClick={() => this.props.history.go(-1)}/>{' '}</span>
          <span className="next" onClick={() => this.setState({ showForm: 'post'})}>Next</span>
        </PreviewHeader>
        <PreviewImage>
            <img src={previewImage}  className={filter} alt="preview"/>
            <input type="file" name="postImage" onChange={this.handleImageUpload}/>
            <span className="next" onClick={() => this.setState({ showForm: 'post'})}>Next</span>
        </PreviewImage>

        <PreviewFilterContainer>
            <PreviewFilter previewImage={previewImage} setFilter={this.setFilter} filter="bw" />
            <PreviewFilter previewImage={previewImage} setFilter={this.setFilter} filter="bright" />
            <PreviewFilter previewImage={previewImage} setFilter={this.setFilter} filter="hue1" />
            <PreviewFilter previewImage={previewImage} setFilter={this.setFilter} filter="hue2" />
            <PreviewFilter previewImage={previewImage} setFilter={this.setFilter} filter="hue3" />
            <PreviewFilter previewImage={previewImage} setFilter={this.setFilter} filter="hue4" />
            <PreviewFilter previewImage={previewImage} setFilter={this.setFilter} filter="hue5" />
            <PreviewFilter previewImage={previewImage} setFilter={this.setFilter} filter="saturate" />
            <PreviewFilter previewImage={previewImage} setFilter={this.setFilter} filter="sepia" />
        </PreviewFilterContainer>
        </Fragment>
      )
    } else {
      displayForm = (
        <Fragment>
        <PreviewHeader>
        <span> <i className="fas fa-arrow-left" onClick={() => this.props.history.go(-1)}/>{' '}</span>
        <span onClick={() => this.setState({ showForm: 'post'})}>Next</span>
      </PreviewHeader>
      <PostForm className="postForm" onSubmit={this.onPostSubmit}>
      <TextAndImage>
      <img src={previewImage}  className={filter} alt="preview"/>
      <textarea name="text" onChange={this.onInputChange} />
      </TextAndImage>

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
      </PostForm>
        </Fragment>
      )
    }
     
    return (
      <PreviewPostStyled>
        {displayForm}
      </PreviewPostStyled>
    )
  }
}

PreviewPost.propTypes = {
  addPost: PropTypes.func.isRequired
}

export default connect(null , { addPost })(PreviewPost)