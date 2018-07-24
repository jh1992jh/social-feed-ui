import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import LikesHeader from './LikesHeader';
import LikeInfo from './LikeInfo';
import LikesContainer from './LikesContainer';

class Likes extends Component {
  render() {
    const { posts } = this.props.posts;
    const outputContent = posts.map((post, i) => (
      <Fragment key={i}>
        <LikeInfo
          profPic={post.profPic}
          name={post.name}
          postImg={post.postImg}
          comment={post.comments[0].commentText}
        />
        <LikeInfo
          profPic={post.profPic}
          name={post.name}
          postImg={post.postImg}
          eventInfo="liked your post."
        />
      </Fragment>
    ));
    return (
      <div className="likes">
        <LikesHeader />
        <LikesContainer>{outputContent}</LikesContainer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(mapStateToProps)(Likes);
