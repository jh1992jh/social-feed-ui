import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFollowedStories } from '../../actions/storyActions';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import Loading from '../../utilities/Loading';

class WatchAll extends Component {
    state = {
        activeStoryIndex: 0
    }

componentDidMount() {
    this.props.getFollowedStories();
}

componentWillReceiveProps(nextProps) {
    if(nextProps.stories.story.storyDuration) {
        const storyDurationStr = nextProps.stories.story.storyDuration.charAt(7)
        const storyDuration = Number(storyDurationStr)

         setTimeout((storyDuration) => {
            this.setState({activeStoryIndex: this.state.activeStoryIndex + 1})
        }, (storyDuration * 1000)) 
    }
}
  render() {
    let outputContent;
    const { activeStoryIndex } = this.state;
    const { followedStories, loading } = this.props.stories;
    let progressBar;
    

    if(loading === true || followedStories.length === 0) {
        outputContent = <Loading  />
    } else if (loading === false && followedStories.length > 0) {
        if(activeStoryIndex > followedStories.length - 1) {
            this.props.history.push('/')
        } else {
            const storyDurationStr = followedStories[activeStoryIndex].storyDuration.charAt(7)
            const storyDuration = Number(storyDurationStr)
                if(activeStoryIndex > 0) {
                    clearTimeout(this.timeout);
                }
                 this.timeout  = setTimeout((storyDuration) => {
                this.setState({activeStoryIndex: this.state.activeStoryIndex + 1})
                this.forceUpdate();
            }, (storyDuration * 1000)) 
        
        outputContent = (
            <Fragment>
            <div className="storyInfo">
            <div className="storyCreator" >
            <img src={followedStories[activeStoryIndex].profileImage} alt="profile"/>
            <Link to={`/profile/${followedStories[activeStoryIndex].user}`}>
            <span style={{color: `${followedStories[activeStoryIndex].color}`}}>{followedStories[activeStoryIndex].handle}</span>
            </Link>
        </div>
        <div className="storyCreated">
            <Moment style={{color: `${followedStories[activeStoryIndex].color}`}} fromNow>{followedStories[activeStoryIndex].date}</Moment>
        </div>
            </div>
            <p className="storyText" style={{color: `${followedStories[activeStoryIndex].color}`}}>{followedStories[activeStoryIndex].text}</p> 
         <h3 className="storylocation" style={{color: `${followedStories[activeStoryIndex].color}`}}>{followedStories[activeStoryIndex].storyLocation}</h3>
         {followedStories[activeStoryIndex].storyImage.length > 0 ? <img src={followedStories[activeStoryIndex].storyImage} className="storyBackgroundImage" alt="story background" /> : null}  
         {/* TODO: ADD BACK WHEN YOU KNOW HOW TO MAKE IT WORK PROPERLY, RIGHT NOW THE ANIMATION DOESN'T RESET
        <div className={`storyDurationBar ${followedStories[activeStoryIndex].storyDuration}`} /> */}
            </Fragment>
        ) }
    }
    return (
        <div className="seeStoryContainer">
        {outputContent}
        </div>
    )
    
  }
}

WatchAll.propTypes = {
    stories: PropTypes.object.isRequired,
    getStory: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    stories: state.stories
})

export default connect(mapStateToProps, {getFollowedStories})(WatchAll)