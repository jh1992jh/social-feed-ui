import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { previewStory } from '../../actions/storyActions';
import { postStory } from '../../actions/storyActions';
import styled from 'styled-components';
// import PropTypes from 'prop-types';

const CreateStoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    background: #222;
`;

const PreviewStory = styled.div`
    width: 100vw;
    height: 76vh;
    position: relative;
    font-weight: 600;
    img {
        width: 100%;
        height: 100%;
        position: relative;
      }

    @media (min-width: 1000px) {
        width: 30vw;
        min-height: 30%;
        height: auto;
        display: block;
        margin: auto;
    }
`;

const StoryText = styled.input`
    position: absolute;
    bottom: 40%;
    left: 0;
    min-width: 100%;
    max-width: 100%;
    background: transparent;
    font-size: 2rem;
    font-weight: 600;
    z-index: 1050;
    text-align: center;
    color: ${props => props.color};
`

const StoryLocation = styled.input`
position: absolute;
bottom: 10%;
left: 0;
text-align: center;
font-size: 2rem;
font-weight: 600;
min-width: 100%;
max-width: 100%;
background: transparent;
color: ${props => props.color};
`

const CreateStoryForm = styled.form`
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
    background: #222;

    input, select {
        margin: 0.5em;
        width: 46%;
        max-height: 1rem;
        box-shadow: 0 2px 0 -1px #808080;
        border: none;
        outline: none;
    }

    button {
        background-color: #0099cc;
        color: #fff;
        font-weight: 600;
        border: none;
        border-radius: 5.5px;
        padding: 0.6em;
        margin: 1em auto;
        width: 96%;
        display: block;

        .fa-share-square {
            margin: 0 0.5em;
          }
      }

      @media (min-width: 1000px) {
          justify-content: center;
          width: 60%;
          margin: 0 auto;
      }
`;


const ImageInput = styled.input`
    min-width: 96%;
    background: #fff;
    min-height: 1.3rem;
`
class CreateStory extends Component {
    state = {
        text: '',
        color: '',
        storyImage: null,
        storyImagePrev: null,
        storyBackground: 'None',
        storyDuration: 'seconds4',
        storyLocation: ''
    }

    onInputChange = e => {
        this.setState({[e.target.name]: e.target.value })
    }

    storyImageHandler = e => {
        this.setState({storyImage: e.target.files[0], storyImagePrev: URL.createObjectURL(e.target.files[0]) })
    }

    onFormSubmit = e => {
        e.preventDefault();

        const { text, color, storyImage, storyBackground, storyDuration, storyLocation } = this.state;

        /*const storyData = {
            text,
            color,
            storyImage,
            storyImagePrev,
            storyBackground,
            storyDuration,
            storyLocation
        }*/

        const fd = new FormData();
        fd.append('text', text);
        fd.append('color', color);
        fd.append('storyImage', storyImage);
        fd.append('storyBackground', storyBackground);
        fd.append('storyDuration', storyDuration);
        fd.append('storyLocation', storyLocation);

        this.props.postStory(fd, this.props.history);
    }
  render() {
      const { color, storyImagePrev, storyDuration, storyLocation } = this.state;
    return (
      <CreateStoryStyled>
      
      <PreviewStory>
      {storyImagePrev !== null ? <img src={storyImagePrev} alt="story background" /> : null}
      <StoryText color={color} name="text" onChange={this.onInputChange} placeholder="Text"/>
      <StoryLocation type="text"  color={color} name="storyLocation" value={storyLocation} onChange={this.onInputChange} placeholder="Location"/>
      </PreviewStory>
      
      <CreateStoryForm onSubmit={this.onFormSubmit}>
        <ImageInput type="file" name="storyImage" accept="image/*" onChange={this.storyImageHandler} placeholder="Story Image" />
           
            <select name="color" value={color} onChange={this.onInputChange}>
                <option value="black">Black</option>
                <option value="blue">Blue</option>
                <option value="lightblue">Light Blue</option>
                <option value="green">Green</option>
                <option value="lightgreen">Light Green</option>
                <option value="yellow">Yellow</option>
                <option value="red">Red</option>
                <option value="pink">Pink</option>
                <option value="violet">Violet</option>
            </select>
            <select name="storyDuration" value={storyDuration} onChange={this.onInputChange}>
            <option value="seconds2">2 Seconds</option>
            <option value="seconds4">4 Seconds</option>
            <option value="seconds6">6 Seconds</option>
            <option value="seconds8">8 Seconds</option>
            </select> 
            <button>Share <i className="fas fa-share-square" /></button>
        </CreateStoryForm>
      </CreateStoryStyled>
    )
  }
}

/* CreateStory.propTypes = {
    stories: PropTypes.object.isRequired,
    previewStory: PropTypes.func.isRequired
} */

const mapStateToProps = state => ({
    stories: state.stories
})

export default connect(mapStateToProps, { postStory })(CreateStory);