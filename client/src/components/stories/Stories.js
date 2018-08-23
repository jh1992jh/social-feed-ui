import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getStories, getFollowedStories } from '../../actions/storyActions';
import PropTypes from 'prop-types';
import MyStory from './MyStory';
import Story from './Story';
import StoryContainerHeader from './StoryContainerHeader';
import InfoFooter from './InfoFooter';

class Stories extends Component {
  componentDidMount() {
    this.props.getStories();
    this.props.getFollowedStories(this.props.auth.user.id);
  }
  render() {
    const { showLikes, profile } = this.props;
    const { loading, followedStories } = this.props.stories;
 

    let outputMyStory; 
    let outputStories;

    if (profile.loading === true || profile.profile === null) {
      outputMyStory = <h3>Loading</h3>
    } else if ( Object.keys(profile.profile).length > 0) {
      outputMyStory = <MyStory handle={profile.profile.handle} profileImage={profile.profile.profileImage} />
    }

    if(loading === true || followedStories.length === 0 ) {
      outputStories = <h3>Loading</h3>
    } else if (loading === false && followedStories.length > 0) {
      outputStories = followedStories.map(story => (
        <Link key={story._id} to={`/story/${story._id}`}>
       <Story storyImage={story.storyImage} handle={story.handle} />
       </Link>
     ));
    }
    return (
      <div
        className="stories"
        style={showLikes ? { paddingTop: '32.28%' } : null}
      >
        <div
          className="forDesktop"
          style={showLikes ? { display: 'none' } : null}
        >
        {outputMyStory}
        </div>

        <hr className="forDesktop" />
        <div
          className="forDesktop"
          style={showLikes ? { display: 'none' } : null}
        >
          <StoryContainerHeader />
        </div>
        <div
          className="storiesContainer"
          style={showLikes ? { display: 'none' } : null}
        >
          <div className="forMobile">
            {outputMyStory}
          </div>
          {outputStories}
        </div>
        <hr className="forDesktop" />
        <div className="forDesktop">
          <InfoFooter />
        </div>
      </div>
    );
  }
}

Stories.propTypes = {
  auth: PropTypes.object.isRequired,
  stories: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getStories: PropTypes.func.isRequired,
  getFollowedStories: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  stories: state.stories,
  profile: state.profile
})

export default connect(mapStateToProps, { getStories, getFollowedStories })(Stories);
