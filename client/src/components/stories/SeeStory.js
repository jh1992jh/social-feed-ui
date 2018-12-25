import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getStory, clearStory } from '../../actions/storyActions';
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

const StoryDurationBar = styled.div`
    width: 1%;
    height: 50px;
    background: red;
    position: absolute;
    bottom: 3em;
    left: 0;
`

class SeeStory extends Component {
componentDidMount() {
    this.props.getStory(this.props.match.params.storyId)
}

componentWillReceiveProps(nextProps) {
    if(nextProps.stories.story.storyDuration) {
        const storyDurationStr = nextProps.stories.story.storyDuration.charAt(7)
        const storyDuration = Number(storyDurationStr)

        this.timeoutID =  setTimeout((storyDuration) => {
            this.props.history.push('/')
        }, (storyDuration * 1000)) 
    }
} 

componentWillUnmount() {
    clearTimeout(this.timeoutID)
    this.props.clearStory();
}
  render() {
    let outputContent;
    const { story, loading } = this.props.stories;

    if(loading === true || Object.keys(story).length === 0) {
        outputContent = <Loading  />
    } else if (loading === false && Object.keys(story).length > 0) {
        outputContent = (
            <Fragment>
            <StoryInfo color={`${story.color}`}>
            <StoryCreator color={`${story.color}`}>
            <img src={story.profileImage} alt="profile"/>
            <Link to={`/profile/${story.user}`}>
            <span>{story.handle}</span>
            </Link>
        </StoryCreator>
        <StoryCreated>
            <Moment style={{color: `${story.color}`}} fromNow>{story.date}</Moment>
        </StoryCreated>
            </StoryInfo>
            <StoryText color={`${story.color}`}>{story.text}</StoryText> 
         <StoryLocation color={`${story.color}`}>{story.storyLocation}</StoryLocation>
         {story.storyImage.length > 0 ? <img src={story.storyImage} alt="story background" /> : null}  
         <StoryDurationBar className={`storyDurationBar ${story.storyDuration}`} />
            </Fragment>
        )
    }
    return (
        <SeeStoryStyled>
        {outputContent}
        </SeeStoryStyled>
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

export default connect(mapStateToProps, { getStory, clearStory})(SeeStory)