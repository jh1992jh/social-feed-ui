import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { postStory } from '../../actions/storyActions'

class PreviewStory extends Component {
  render() {
    let outputContent;
    const { previewStory } = this.props.stories;

    if(previewStory === null || previewStory === undefined) {
        outputContent = <h3>Loading</h3>
    } else if (previewStory !== null || previewStory !== undefined) {
        outputContent = (
            <Fragment>
            <p className="previewStoryText">{previewStory.text}</p> 
         <h3 className="previewStorylocation">{previewStory.storyLocation}</h3>  
            </Fragment>
        )
    }
    return (
        <div className="submitStoryContainer">
        {outputContent}
        </div>
    )
    
  }
}

const mapStateToProps = state => ({
    stories: state.stories
})

export default connect(mapStateToProps, { postStory})(PreviewStory)