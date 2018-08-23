import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import ProfileHeaderTop from './ProfileHeaderTop';
import ProfileHeaderTopOther from './ProfileHeaderTopOther';
import ProfileHeaderBottom from './ProfileHeaderBottom';
import ProfileHeaderBottomOther from './ProfileHeaderBottomOther';
import ProfileBodyTop from './ProfileBodyTop';
import ProfileBody from './ProfileBody';
import NavbarTop from '../navbars/NavbarTop';
import { getPosts, getOwnedPosts } from '../../actions/postActions';
import { getCurrentProfile, getProfileById } from '../../actions/profileActions';
import PropTypes from 'prop-types';

class Profile extends Component {
  componentDidMount() {
   
   if(this.props.match.url === '/my-profile') {
      this.props.getCurrentProfile()
      this.props.getOwnedPosts(this.props.auth.user.id)
    } else {
      this.props.getProfileById(this.props.match.params.userId)
      this.props.getOwnedPosts(this.props.match.params.userId)
    }
    this.props.getPosts();
  }

  render() {
    const { posts, profile, auth } = this.props;
    let outputProfile;
    if(posts.loading === true || profile.loading === true || profile.profile === null) {
      outputProfile = <h3>Loading</h3>
    } else if (posts.loading === false && posts.posts.length > 0 && Object.keys(profile.profile).length > 0 && profile.profile.user._id === auth.user.id)  {
      outputProfile = (
        <Fragment>
          <div className="forDesktop">
            <NavbarTop />
          </div>
          <ProfileHeaderTop
            username={auth.user.username}
          />
          <ProfileHeaderBottom
            profileImage={profile.profile.profileImage ? profile.profile.profileImage : auth.user.profileImage}
            userId={profile.profile.user._id}
            following={profile.profile.following}
            followers={profile.profile.followers}
            handle={profile.profile.handle}
            description={profile.profile.description}
            ownedPosts={posts.ownedPosts}
          />
          <ProfileBodyTop />
          <ProfileBody
            ownedPosts={posts.ownedPosts}
          />
        </Fragment>
      );
    } else if (posts.loading === false && posts.posts.length > 0 && Object.keys(profile.profile).length > 0 && profile.profile.user._id !== auth.user.id)  {
      outputProfile = (
        <Fragment>
          <div className="forDesktop">
            <NavbarTop />
          </div>
          <ProfileHeaderTopOther handle={profile.profile.handle} />
          <ProfileHeaderBottomOther
            profileImage={profile.profile.profileImage}
            profileId={profile.profile._id}
            userId={profile.profile.user._id}
            handle={profile.profile.handle}
            description={profile.profile.description}
            following={profile.profile.following}
            followers={profile.profile.followers}
            ownedPosts={posts.ownedPosts}
          />
          <ProfileBodyTop />
          <ProfileBody
            ownedPosts={posts.ownedPosts}
          />
        </Fragment>
      );
    } 
     else if (Object.keys(profile.profile).length === 0) {
      outputProfile = (
        <div className="noProfile">
        <i className="far fa-user-circle" />
        <h3>Hey {auth.user.username}<br /></h3>
        <p>you have no profile yet<br />
        click this link to to make one <br />
        <Link to="/create-profile" className="createProfileLink"> 
          Create a profile
        </Link>
        </p>
        </div>
      )
    }
    return <div className="profile">{outputProfile}</div>;
  }
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  getOwnedPosts: PropTypes.func.isRequired,
  getProfileById: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.posts,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, getPosts, getOwnedPosts, getProfileById }
)(withRouter(Profile));
