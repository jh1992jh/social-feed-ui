import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFollowedStories } from '../../actions/storyActions';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import Loading from '../../utilities/Loading';

const SeeStoryStyled = styled.div` 
    position: relative;
    height: 100vh;

    img {
        width: 100%;
        height: 100%;
        position: relative;
      }

    @media (min-width: 1000px) {
        height: 100vh;
        width: 100vw;
        background: #222;
        display: flex;
        padding-top: 10%;
        align-items: center;
        flex-direction: column;
        z-index: 0;

        img {
         width: 30%;
         height: 60%;
         position: relative;

        }
    }
`;

const StoryInfo = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1030;
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: ${props => props.color}

    @media (min-width: 1000px) {
    z-index: 1030;
    max-width: 30%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1em;
  
  
    position: static;
    }
`;

const StoryCreator = styled.div`
    display: flex;
    align-items: center;
    margin: 0.5em 0 0 0.5em;
    font-weight: 600;
    span {
        color: ${props => props.color}
    }
    img {
        height: 28px;
        width: 28px;
        border-radius: 360px;
        margin-right: 0.5em;
      }
`

const StoryCreated = styled.div`
    display: flex;
    align-items: center;
    margin: 0.5em 0.5em 0 0;
`;

const StoryText = styled.p`
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
    color: ${(props) => props.color}

    @media (min-width: 1000px) {
    bottom: 35%;
    display: block;
    min-width: 100%;
    font-size: 2rem;
    font-weight: 600;
    }
`;

const StoryLocation = styled.h3`
    position: absolute;
    z-index: 1050;
    bottom: 20%;
    left: 0;
    min-width: 100%;
    text-align: center;
    font-size: 2rem;
    font-weight: 600;
    color: ${props => props.color}

    @media (min-width: 1000px) {
    bottom: 25%;
    }
`;


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

         this.timeoutID = setTimeout((storyDuration) => {
            this.setState({activeStoryIndex: this.state.activeStoryIndex + 1})
        }, (storyDuration * 1000)) 
    }
}

componentWillUnmount() {
    clearTimeout(this.timeoutID)
    //this.props.clearStory();
}
  render() {
    let outputContent;
    const { activeStoryIndex } = this.state;
    const { followedStories, loading } = this.props.stories;

    

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
        // ${followedStories[activeStoryIndex].
        outputContent = (
            <Fragment>
            <StoryInfo color={`${followedStories[activeStoryIndex].color}`}>
            <StoryCreator color={`${followedStories[activeStoryIndex].color}`}>
            <img src={followedStories[activeStoryIndex].profileImage} alt="profile"/>
            <Link to={`/profile/${followedStories[activeStoryIndex].user}`}>
            <span>{followedStories[activeStoryIndex].handle}</span>
            </Link>
        </StoryCreator>
        <StoryCreated>
            <Moment style={{color: `${followedStories[activeStoryIndex].color}`}} fromNow>{followedStories[activeStoryIndex].date}</Moment>
        </StoryCreated>
            </StoryInfo>
            <StoryText color={followedStories[activeStoryIndex].color}>{followedStories[activeStoryIndex].text}</StoryText> 
         <StoryLocation color={followedStories[activeStoryIndex].color}>{followedStories[activeStoryIndex].storyLocation}</StoryLocation>
        {followedStories[activeStoryIndex].storyImage.length > 0 ? <img src={followedStories[activeStoryIndex].storyImage} alt="story background" /> : null} 
         {/* <StoryText color={`${followedStories[activeStoryIndex].color}`}>{followedStories[activeStoryIndex].text}</StoryText> 
         <StoryLocation color={`${followedStories[activeStoryIndex].color}`}>{followedStories[activeStoryIndex].storyLocation}</StoryLocation>
        {followedStories[activeStoryIndex].storyImage.length > 0 ? <img src={followedStories[activeStoryIndex].storyImage} alt="story background" /> : null}   */}
            </Fragment>
        ) }
    }
    return (
        <SeeStoryStyled>
        {outputContent}
        </SeeStoryStyled>
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