import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { postStory } from '../../actions/storyActions'
import PropTypes from 'prop-types';

class PreviewStory extends Component {
    onPostStory = () => {
  
       
            const storyData = {
                text: this.props.stories.previewStory.text,
            color: this.props.stories.previewStory.color,
            storyImage: this.props.stories.previewStory.storyImage,
            storyBackground: this.props.stories.previewStory.storyBackground,
            storyDuration: this.props.stories.previewStory.storyDuration,
            storyLocation: this.props.stories.previewStory.storyLocation
            }

        
        this.props.postStory(storyData, this.props.history)
    }
  render() {
    let outputContent;
    const { previewStory } = this.props.stories;

    if(previewStory === null || previewStory === undefined) {
        outputContent = <h3>Loading</h3>
    } else if (previewStory !== null || previewStory !== undefined) {
        outputContent = (
            <Fragment>
            <p className="storyText" style={{color: `${previewStory.color}`}}>{previewStory.text}</p> 
         <h3 className="storylocation" style={{color: `${previewStory.color}`}}>{previewStory.storyLocation}</h3>
         {previewStory.storyImage.length > 0 ? <img src={previewStory.storyImage} className="storyBackgroundImage" alt="story background" /> : null}  
            </Fragment>
        )
    }
    return (
        <div className="submitStoryContainer">
        {outputContent}
        <button onClick={this.onPostStory}>Submit <i className="far fa-paper-plane" /></button>
        </div>
    )
    
  }
}

PreviewStory.propTypes = {
    stories: PropTypes.object.isRequired,
    postStory: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    stories: state.stories
})

export default connect(mapStateToProps, { postStory})(PreviewStory)