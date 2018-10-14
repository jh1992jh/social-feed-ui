import React, { Component } from 'react';
import { connect } from 'react-redux';
import { watchAllStories } from '../../actions/storyActions';

class StoryContainerHeader extends Component {
  render()  {
    return (
 
        <div className="storyContainerHeader">
          <span className="muted">Stories</span>
          <span onClick={() => this.props.watchAllStories()}>Watch All</span>
        </div>
      
    )
  }
}

export default connect(null, { watchAllStories })(StoryContainerHeader);