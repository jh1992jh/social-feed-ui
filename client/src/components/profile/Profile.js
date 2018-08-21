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
import { getPosts, getOwnedPosts } from '../../actions/post2Actions';
import { getCurrentProfile, getProfileById } from '../../actions/profile2Actions';;

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
    const { posts2, profile2, auth, authUser } = this.props;
    let outputProfile;
    if(posts2.loading === true || profile2.loading == true || profile2.profile === null) {
      outputProfile = <h3>Loading</h3>
    } else if (posts2.loading === false && posts2.posts.length > 0 && Object.keys(profile2.profile).length > 0 && profile2.profile.user._id === auth.user.id)  {
      outputProfile = (
        <Fragment>
          <div className="forDesktop">
            <NavbarTop />
          </div>
          <ProfileHeaderTop
            username={auth.user.username}
          />
          <ProfileHeaderBottom
            profileImage={profile2.profile.profileImage ? profile2.profile.profileImage : auth.user.profileImage}
            userId={profile2.profile.user._id}
            following={profile2.profile.following}
            followers={profile2.profile.followers}
            handle={profile2.profile.handle}
            description={profile2.profile.description}
            ownedPosts={posts2.ownedPosts}
          />
          <ProfileBodyTop />
          <ProfileBody
            ownedPosts={posts2.ownedPosts}
          />
        </Fragment>
      );
    } else if (posts2.loading === false && posts2.posts.length > 0 && Object.keys(profile2.profile).length > 0 && profile2.profile.user._id !== auth.user.id)  {
      outputProfile = (
        <Fragment>
          <div className="forDesktop">
            <NavbarTop />
          </div>
          <ProfileHeaderTopOther handle={profile2.profile.handle} />
          <ProfileHeaderBottomOther
            profileImage={profile2.profile.profileImage}
            profileId={profile2.profile._id}
            userId={profile2.profile.user._id}
            handle={profile2.profile.handle}
            description={profile2.profile.description}
            following={profile2.profile.following}
            followers={profile2.profile.followers}
            ownedPosts={posts2.ownedPosts}
          />
          <ProfileBodyTop />
          <ProfileBody
            ownedPosts={posts2.ownedPosts}
          />
        </Fragment>
      );
    } 
     else if (Object.keys(profile2.profile).length === 0) {
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

const mapStateToProps = state => ({
  auth: state.auth,
  posts2: state.posts2,
  profile2: state.profile2
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, getPosts, getOwnedPosts, getProfileById }
)(withRouter(Profile));
