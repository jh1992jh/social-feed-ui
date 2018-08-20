import React, { Component } from 'react';
import { connect } from 'react-redux';
import { previewStory } from '../../actions/storyActions';


class CreateStory extends Component {
    state = {
        text: '',
        color: '',
        storyImage: '',
        storyBackground: 'None',
        storyDuration: 4,
        storyLocation: ''
    }

    onInputChange = e => {
        this.setState({[e.target.name]: e.target.value })
    }

    onFormSubmit = e => {
        e.preventDefault();

        const { text, color, storyImage, storyBackground, storyDuration, storyLocation } = this.state;

        const storyData = {
            text,
            color,
            storyImage,
            storyBackground,
            storyDuration,
            storyLocation
        }

        this.props.previewStory(storyData, this.props.history);
    }
  render() {
      const { text, color, storyImage, storyBackground, storyDuration, storyLocation } = this.state;
    return (
      <div className="createStory">
        <h3>Create A Story</h3>
        <div className="previewStoryContainer">
        {storyImage.length > 0 ? <img src={storyImage} className="storyBackgroundImage" alt="story background" /> : null}
        {text.length > 0 ? <p className="storyText" style={{color: `${color}`}}>{text}</p> : null}
        {storyLocation.length > 0 ? <h4 className="storyLocation" style={{color: `${color}`}}>{storyLocation}</h4> : null}
        </div>

        <form className="createStoryForm" onSubmit={this.onFormSubmit}>
            <input type="text" name="text" value={text} onChange={this.onInputChange} placeholder="Story Text"/>
            <input type="text" name="storyImage" value={storyImage} onChange={this.onInputChange} placeholder="Story Image URL"/>
            <input type="text" name="storyLocation" value={storyLocation} onChange={this.onInputChange} placeholder="Location"/>
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
            <select name="storyBackground" value={storyBackground} onChange={this.onInputChange} >
                <option value="none">None</option> 
                <option value="blueGradient">Blue Gradient</option>
                <option value="greenGradient">Green Gradient</option>
                <option value="PinkGradient">Pink Gradient</option>
                <option value="goldGradient">Gold Gradient</option>
            </select>
            <select name="storyDuration" value={storyDuration} onChange={this.onInputChange}>
            <option value="seconds2">2 Seconds</option>
            <option value="seconds4">4 Seconds</option>
            <option value="seconds6">6 Seconds</option>
            <option value="seconds8">8 Seconds</option>
            </select> 
            <button>Preview <i className="fas fa-share-square" /></button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    stories: state.stories
})

export default connect(mapStateToProps, { previewStory })(CreateStory);