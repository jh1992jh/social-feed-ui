import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStories } from '../../actions/storyActions';
import { storyItems } from './storyItems';
import MyStory from './MyStory';
import Story from './Story';
import StoryContainerHeader from './StoryContainerHeader';
import InfoFooter from './InfoFooter';

class Stories extends Component {
 state = {
      stories: storyItems
 }  

  componentDidMount() {
    this.props.getStories();
  }
  render() {
    const { authUser, showLikes } = this.props;
    const { stories } = this.state;

    const outputStories = stories.map((story, i) => (
      <Story key={i} img={story.img} name={story.name} />
    ));
    return (
      <div
        className="stories"
        style={showLikes ? { paddingTop: '32.28%' } : null}
      >
        <div
          className="forDesktop"
          style={showLikes ? { display: 'none' } : null}
        >
          <MyStory authUser={authUser} />
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
            <MyStory authUser={authUser} />
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

const mapStateToProps = state => ({
  stories: state.stories
})

export default connect(mapStateToProps, { getStories })(Stories);
