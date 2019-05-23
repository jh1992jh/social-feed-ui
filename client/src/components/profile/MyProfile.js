import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import ProfileHeaderTop from "./ProfileHeaderTop";
import ProfileHeaderBottom from "./ProfileHeaderBottom";
import ProfileBody from "./ProfileBody";

import Loading from "../posts/Loading";
//import Loading from '../../utilities/Loading';
import { getOwnedPosts } from "../../actions/postActions";
import { getCurrentProfile } from "../../actions/profileActions";
import styled from "styled-components";
import PropTypes from "prop-types";
import { icons } from "../../images-and-icons";

const NoProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4em 2em 2em 2em;
  text-align: center;

  a {
    color: #0099cc;
  }
`;

class MyProfile extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getOwnedPosts(this.props.auth.user.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile !== null) {
      if (Object.keys(nextProps.profile.profile).length === 0) {
        this.props.history.push("/no-profile");
      }
    }
  }
  onGoBack = () => {
    this.props.history.go(-1);
  };

  render() {
    const { posts, profile, auth } = this.props;
    let outputProfile;
    if (
      posts.loading === true ||
      profile.loading === true ||
      profile.profile === null
    ) {
      outputProfile = <Loading height="100vh" />;
    } else if (posts.loading === false && profile.loading === false) {
      if (Object.keys(profile.profile).length !== 0) {
        outputProfile = (
          <Fragment>
            <div className="forDesktop" />
            <ProfileHeaderTop
              username={auth.user.username}
              onGoBack={this.onGoBack}
            />
            <ProfileHeaderBottom
              profileImage={
                profile.profile.profileImage
                  ? profile.profile.profileImage
                  : auth.user.profileImage
              }
              userId={profile.profile.user._id}
              following={profile.profile.following}
              followers={profile.profile.followers}
              handle={profile.profile.handle}
              description={profile.profile.description}
              ownedPosts={posts.ownedPosts}
            />
            {/* TODO: MAKE VISIBLE AFTER THE ROUTES FOR THE LINKS IN THE COMPONENT ARE FINISHED <ProfileBodyTop /> */}
            <ProfileBody ownedPosts={posts.ownedPosts} />
          </Fragment>
        );
      } else if (Object.keys(profile.profile).length === 0) {
        this.props.history.push("/no-profile");
      }
    }
    return <div className="profile">{outputProfile}</div>;
  }
}

MyProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  getOwnedPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.posts,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, getOwnedPosts }
)(withRouter(MyProfile));
