import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  addComment,
  addCurrentPost,
  addLike,
  removeLike
} from "../../actions/postActions";
import styled from "styled-components";
import PropTypes from "prop-types";
import PostHeader from "./PostHeader";
// import PostBody from './PostBody';
import PostFooter from "./PostFooter";
import loadable from "@loadable/component";
import Loading from "./Loading";

const PostBody = loadable(() => import("../posts/PostBody"), {
  fallback: <Loading />
});

const PostStyled = styled.div`
  margin: 0.8em 0;
  width: 100%;

  @media (min-width: 1000px) {
    margin: 1em auto !important;
    max-width: 45vw;
    margin: auto;

    border: 1px solid #d0d0d0;
    border-radius: 5px;
    background: #fff;
    box-shadow: 0 1px 3px #d0d0d0;
  }
`;
class Post extends Component {
  state = {
    postlikes: 0,
    liked: false
  };
  componentDidMount() {
    this.setState({ postlikes: this.props.likes.length });
    const { likes } = this.props;
    const { auth } = this.props;

    const checkLikes = () =>
      likes.filter(like => like.user === auth.user.id).length;

    if (checkLikes() === 1) {
      this.setState({ liked: true });
    }
  }

  onAddCurrentPost = () => {
    this.props.addCurrentPost(this.props);
  };

  onAddLike = () => {
    const { postlikes } = this.state;
    this.props.addLike(this.props._id);
    this.setState({ postlikes: postlikes + 1, liked: true });
  };

  onRemoveLike = () => {
    const { postlikes } = this.state;
    this.props.removeLike(this.props._id);
    this.setState({ postlikes: postlikes - 1, liked: false });
  };

  render() {
    const {
      profileImage,
      handle,

      postImage,
      filter,
      text,
      date,
      comments,
      user,
      _id
    } = this.props;

    const { liked, postlikes } = this.state;

    let postContent = (
      <Fragment>
        <PostHeader
          onToggleMenu={this.onToggleMenu}
          profileImage={profileImage}
          handle={handle}
          userId={user}
        />
        <PostBody
          postImage={postImage}
          filter={filter}
          postId={_id}
          profileImage={profileImage}
          handle={handle}
          text={text}
          onAddLike={this.onAddLike}
          onRemoveLike={this.onRemoveLike}
          liked={liked}
          likes={postlikes}
          date={date}
          comments={comments}
        />
        <PostFooter
          postlikes={postlikes}
          userId={user}
          handle={handle}
          text={text}
          date={date}
          profileImage={profileImage}
          postId={_id}
          comments={comments}
        />
      </Fragment>
    );

    return (
      <Fragment>
        <PostStyled>{postContent}</PostStyled>
      </Fragment>
    );
  }
}

Post.propTypes = {
  auth: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  addCurrentPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.posts
});

export default connect(
  mapStateToProps,
  { addComment, addCurrentPost, addLike, removeLike }
)(withRouter(Post));
