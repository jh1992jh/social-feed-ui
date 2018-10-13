import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getStory } from '../../actions/storyActions';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import Loading from '../../utilities/Loading';

class SeeStory extends Component {
componentDidMount() {
    this.props.getStory(this.props.match.params.storyId)
}

componentWillReceiveProps(nextProps) {
    if(nextProps.stories.story.storyDuration) {
        const storyDurationStr = nextProps.stories.story.storyDuration.charAt(7)
        const storyDuration = Number(storyDurationStr)

         setTimeout((storyDuration) => {
            this.props.history.push('/')
        }, (storyDuration * 1000)) 
    }
} 
  render() {
    let outputContent;
    const { story, loading } = this.props.stories;

    if(loading === true || Object.keys(story).length === 0) {
        outputContent = <Loading  />
    } else if (loading === false && Object.keys(story).length > 0) {
        outputContent = (
            <Fragment>
            <div className="storyInfo">
            <div className="storyCreator" >
            <img src={story.profileImage} alt="profile"/>
            <Link to={`/profile/${story.user}`}>
            <span style={{color: `${story.color}`}}>{story.handle}</span>
            </Link>
        </div>
        <div className="storyCreated">
            <Moment style={{color: `${story.color}`}} fromNow>{story.date}</Moment>
        </div>
            </div>
            <p className="storyText" style={{color: `${story.color}`}}>{story.text}</p> 
         <h3 className="storylocation" style={{color: `${story.color}`}}>{story.storyLocation}</h3>
         {story.storyImage.length > 0 ? <img src={story.storyImage} className="storyBackgroundImage" alt="story background" /> : null}  
         <div className={`storyDurationBar ${story.storyDuration}`} />
            </Fragment>
        )
    }
    return (
        <div className="seeStoryContainer">
        {outputContent}
        </div>
    )
    
  }
}

SeeStory.propTypes = {
    stories: PropTypes.object.isRequired,
    getStory: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    stories: state.stories
})

export default connect(mapStateToProps, { getStory })(SeeStory)