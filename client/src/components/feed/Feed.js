import React, { Component } from 'react';
import styled from 'styled-components';

const FeedStyled = styled.div`
  max-width: 100%;
  max-height: 1000px;
  overflow-y: scroll;
  margin-bottom: 2.8em;

@media (min-width: 1000px) {
    overflow-y: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    max-width: 100%;
    max-height: 100%;
    padding: 1em 3em;
    margin: 4.8em 0 3em -13em;
    z-index: 1;

    img {
      max-width: 38vw;
    }
}
`
class Feed extends Component {
  render() {
    const { children } = this.props;
    return <FeedStyled>{children}</FeedStyled>;
  }
}

export default Feed;
