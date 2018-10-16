import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { watchAllStories } from '../../actions/storyActions';

class StoryContainerHeader extends Component {
  render()  {
    return (
 
        <div className="storyContainerHeader">
          <span className="muted">Stories</span>
          <Link to="/stories">
          <span>Watch All</span>
          </Link>
        </div>
      
    )
  }
}

export default connect(null, { watchAllStories })(StoryContainerHeader);