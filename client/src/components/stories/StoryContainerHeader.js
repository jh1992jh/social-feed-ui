import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { watchAllStories } from "../../actions/storyActions";
import styled from "styled-components";

const StoryContHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  margin: 1em 0;
  min-width: 100% !important;

  a {
    color: #0099cc;
  }
`;

const Muted = styled.span`
  color: #0099cc;
`;

class StoryContainerHeader extends Component {
  render() {
    const { showWatchAll } = this.props;
    return (
      <StoryContHeader>
        <Muted>Stories</Muted>
        {showWatchAll && (
          <Link to="/stories">
            <span>Watch All</span>
          </Link>
        )}
      </StoryContHeader>
    );
  }
}

export default connect(
  null,
  { watchAllStories }
)(StoryContainerHeader);
