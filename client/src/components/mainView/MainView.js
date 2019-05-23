import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getPosts,
  getFollowedPosts,
  clearCurrentPost
} from "../../actions/postActions";
import { getCurrentProfile } from "../../actions/profileActions";

// import PropTypes from 'prop-types';

import Feed from "../feed/Feed";
import Stories from "../stories/Stories";
import Post from "../posts/Post";
import NoPosts from "../posts/NoPosts";
import Loading from "../../utilities/Loading";

class MainView extends Component {
  componentDidMount() {
    if (Object.keys(this.props.posts.post).length > 0) {
      this.props.clearCurrentPost();
    }

    let followedPosts = true;
    this.props.getCurrentProfile(followedPosts);
    this.props.getPosts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile !== null) {
      if (Object.keys(nextProps.profile.profile).length === 0) {
        this.props.history.push("/no-profile");
      }
    }
  }

  render() {
    const { posts, profile } = this.props;

    let outputPosts = null;

    let outputStories;

    if (profile.profile !== null) {
      if (Object.keys(profile.profile).length > 0) {
        outputStories = <Stories />;
      } else {
        outputStories = null;
      }
    }

    if (posts.loading === true || profile.profile === null || profile.loading) {
      outputPosts = <Loading />;
    } else if (
      posts.loading === false &&
      posts.followedPosts.length > 0 &&
      Object.keys(profile.profile).length > 0
    ) {
      outputPosts = posts.followedPosts.map((post, i) => (
        <Post {...post} key={post._id} />
      ));
    } /* else if (Object.keys(profile.profile).length > 0) {
      if (profile.profile.following.length === 0) {
        outputPosts = <NoPosts message="You are not following any one yet" />;
      }
    } */

    if (posts.followedPosts.length === 0) {
      if (profile.profile !== null) {
        if (
          Object.keys(profile.profile).length > 0 &&
          profile.profile.following.length > 0
        ) {
          outputPosts = <NoPosts message={null} />;
        }

        if (
          Object.keys(profile.profile).length > 0 &&
          profile.profile.following.length === 0
        ) {
          outputPosts = <NoPosts message="You are not following any one yet" />;
        }
      }
    }
    return (
      <Fragment>
        <Feed>
          {outputStories}
          {outputPosts}
        </Feed>
      </Fragment>
    );
  }
}

/* MainView.propTypes = {
  posts: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  clearCurrentPost: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
} */

const mapStateToProps = state => ({
  posts: state.posts,
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getPosts, clearCurrentPost, getFollowedPosts, getCurrentProfile }
)(withRouter(MainView));
