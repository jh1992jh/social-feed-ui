import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { followProfile, unfollowProfile } from '../../actions/profile2Actions';

class ProfileHeaderBottomOther extends Component {
  onFollowProfile = () => {
    const { profileId, userId } = this.props;

    this.props.followProfile(profileId, userId)
  }

  onUnfollowProfile = () => {
    const { profileId, userId } = this.props;

    this.props.unfollowProfile(profileId, userId)
  }
  render() {
    const {
      profileImage,
      profileId,
      userId,
      auth,
      handle,
      description,
      ownedPosts,
      followers,
      following
    } = this.props;
    const checkFollowing = followers.filter(follower => follower.user === auth.user.id).length
    return (
      <Fragment>
        <div className="profileHeaderBottom">
          <div className="profileHeaderBottomLeft">
            <div className="roundedProfPicLarge">
              <img src={profileImage} alt="profPic" />
            </div>
          </div>
          <div className="profileHeaderBottomRight">
            <div className="forDesktop">
            <div className="otherProfileBtnsDesktop">
            <p className="nameLarge">{handle}</p>
            <button className="follow" onClick={checkFollowing === 1 ? this.onUnfollowProfile : this.onFollowProfile}>{checkFollowing === 1 ? 'Unfollow': 'Follow'}</button>
            <button className="suggested">
              <i className="fas fa-caret-down" />
            </button>
            <i className="fas fa-ellipsis-h" />
          </div>

          <div className="otherProfileBtns">
            <button className="follow" onClick={checkFollowing === 1 ? this.onUnfollowProfile : this.onFollowProfile}>
             {checkFollowing === 1 ? 'Unfollow' : 'Follow'}
            </button>
            <button className="suggested">
              <i className="fas fa-caret-down" />
            </button>
          </div>
            </div>
            <div className="profileHeaderBottomRightSubContainer">
              <div className="profileHeaderContent">
              <a>
                <p>{ownedPosts.length}</p>
                </a>
                <span>posts</span>
              </div>
              <div className="profileHeaderContent">
              <Link to={`/profile/followers/${userId}`}>
              <p>{followers.length}</p>
              </Link>
                <span>followers</span>
              </div>
              <div className="profileHeaderContent">
              <Link to={`/profile/following/${userId}`}>
              <p>{following.length}</p>
              </Link>
                <span>following</span>
              </div>
            </div>
            <br />
            <div className="forDesktop">
              <div
                className="profileAboutDesktop"
              >
                <p className="name">{handle}</p>
                <p className="profAboutDesc">{description}</p>
              </div>
            </div>
            <div className="forMobile">
            <div className="otherProfileBtns">
            <button className="follow" onClick={checkFollowing === 1 ? this.onUnfollowProfile : this.onFollowProfile}>
            {checkFollowing === 1 ? 'Unfollow' : 'Follow'}
            </button>
            <button className="suggested">
              <i className="fas fa-caret-down" />
            </button>
          
          </div>
            </div>
          </div>
        </div>
        <div className="profileAbout">
          <p className="name">{handle}</p>
          <p className="description">{description}</p>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { followProfile, unfollowProfile })(withRouter(ProfileHeaderBottomOther));
