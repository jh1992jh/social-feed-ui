import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getStories, getFollowedStories } from '../../actions/storyActions';
//import PropTypes from 'prop-types';
import MyStory from './MyStory';
//import Story from './Story';
import StoryContainerHeader from './StoryContainerHeader';
// import InfoFooter from './InfoFooter';
import loadable from '@loadable/component'
import styled from 'styled-components';

const Story = loadable(() => import('./Story'), {
  fallback: <div style={{width: '50px', height:'50px', border: '1px solid oranged', borderRadius: '100%'}} />,
})

const StoriesStyled = styled.div`
  @media (min-width: 1000px) {
    width: 25vw;
    min-height: 550px;
    
    display: flex;
    flex-direction: column;
    font-size: 0.7rem;
    position: fixed;
    top: 15.5%;
    right: 8%;
    z-index: 0;
    
    border-radius: 15px;
  } 
`

const MyStoryContainerDesktop = styled.div`
min-height: 100px;
display: flex;
padding: 1em;
justify-content: flex-start;
@media (max-width: 980px) {
  display: none
}
`

const ForDesktop = styled.div`
@media (max-width: 980px) {
  display: none
}
`

const ForMobile = styled.div`
@media (min-width: 1000px) {
  display: none;
}
`


// NOTE STORIES NOT ALLIGNED 100% EQUALLY (MYSTORY VS OTHER STORY) BECAUSE OF A LINK TAG THAT WRAPS A OTHERSTORY COMPONENT
const StoriesContainer = styled.div`
margin-top: 0em;
max-width: 100%; 
height: 58px;
display: flex;
padding: 30px 0 5px 18px;
align-items: center;
@media (max-width: 980px) {
  position: fixed;
  z-index: 1050;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
}
justify-content: flex-start;
@media (max-width: 980px) {
  box-shadow: 0 0.5px 1px #909090;
}

@media (min-width: 1000px) {
  width: 100%;
  display: flex;
  flex-direction: column;
 
  height: 100%;
  
}
` 

const OtherStories = styled.div`
display: flex;

margin: 0 0.5em; 
align-items: flex-start;
padding-bottom: 19px;
@media (min-width: 1000px) {
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

`

const DesktopHr = styled.hr`
  margin: 1em 0;
  min-height: 1px;
  background: #d0d0d0;
  border: none;
  max-width: 100% !important;

  @media (max-width: 980px) {
    display: none
  }
`


class Stories extends Component {
  componentDidMount() {
    //this.props.getStories();
    this.props.getFollowedStories(this.props.auth.user.id);
    
  }
  render() {
    const { profile } = this.props;
    const { loading, followedStories } = this.props.stories;
 

    let outputMyStory; 
    let outputStories;

    if (profile.loading === true || profile.profile === null) {
      outputMyStory = <MyStory />
    } else if ( Object.keys(profile.profile).length > 0) {
      outputMyStory = <MyStory handle={profile.profile.handle} profileImage={profile.profile.profileImage} />
    }

    if(loading === true) {
      outputStories = <Story />
    } else if (loading === false && followedStories.length === 0) {
      outputStories = null;
    } else if (loading === false && followedStories.length > 0) {
      outputStories = followedStories.map(story => (
        <Link key={story._id} to={`/story/${story._id}`}>
       <Story storyImage={story.storyImage} handle={story.handle} />
       </Link>
     ));
    }
    return (
      <StoriesStyled>
        <MyStoryContainerDesktop>
        {outputMyStory}
        </MyStoryContainerDesktop>

        <DesktopHr />
        <ForDesktop
        >
          <StoryContainerHeader />
        </ForDesktop>
        <StoriesContainer>
          <ForMobile>
            {outputMyStory}
          </ForMobile>
          <OtherStories>
          {outputStories}
          </OtherStories>
        </StoriesContainer>

        {/* <div className="forDesktop">
          <InfoFooter />
    </div> */}
      </StoriesStyled>
    );
  }
}

/* Stories.propTypes = {
  auth: PropTypes.object.isRequired,
  stories: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getStories: PropTypes.func.isRequired,
  getFollowedStories: PropTypes.func.isRequired
} */

const mapStateToProps = state => ({
  auth: state.auth,
  stories: state.stories,
  profile: state.profile
})

export default connect(mapStateToProps, { getStories, getFollowedStories })(Stories);
