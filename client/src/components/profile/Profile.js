import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import ProfileHeaderTopOther from './ProfileHeaderTopOther';
import ProfileHeaderBottomOther from './ProfileHeaderBottomOther';
// import ProfileBodyTop from './ProfileBodyTop';
import ProfileBody from './ProfileBody';

// import Loading from '../../utilities/Loading';
import {  getOwnedPosts } from '../../actions/postActions';
import { getProfileById, clearCurrentProfile } from '../../actions/profileActions';
import PropTypes from 'prop-types';
import Loading from '../posts/Loading';

class Profile extends Component {
  componentDidMount() {
      this.props.getProfileById(this.props.match.params.userId)
      this.props.getOwnedPosts(this.props.match.params.userId)
  }

  componentWillUnmount() {
    this.props.clearCurrentProfile();
  }

 
  render() {
    const { posts, profile, auth } = this.props;
    let outputProfile;
    if(posts.loading === true || profile.loading === true || profile.profile === null) {
      outputProfile = <Loading height="100vh" />
    } else  if (posts.loading === false && posts.ownedPosts.length > 0)  {
      outputProfile = (
        <Fragment>
          <div className="forDesktop">
         
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
      {/* TODO: MAKE VISIBLE AFTER THE ROUTES FOR THE LINKS IN THE COMPONENT ARE FINISHED <ProfileBodyTop /> */}
          <ProfileBody
            ownedPosts={posts.ownedPosts}
          />
        </Fragment>
      );
    } else  if (posts.loading === false && posts.ownedPosts.length === 0) {
      outputProfile = (
        <Fragment>
          <div className="forDesktop">
         
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
      {/* TODO: MAKE VISIBLE AFTER THE ROUTES FOR THE LINKS IN THE COMPONENT ARE FINISHED <ProfileBodyTop /> */}
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
  { getOwnedPosts, getProfileById, clearCurrentProfile }
)(withRouter(Profile));
