import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getOwnedPosts } from '../../actions/post2Actions';

class ProfileHeaderBottom extends Component {
  render() {
    const {
      profileImage,
      userId,
      ownedPosts,
      following,
      followers,
      handle,
      description,
      show,
    } = this.props;
    let profileButtons = (
      <Fragment>
        <p className="nameLarge forDesktop">{handle}</p>
        <Link to="/edit-profile">
        <button
          className="editProfileBtn"
          style={show === false ? { display: 'none' } : null}
        >
          Edit Profile
        </button>
        </Link>
        <i className="fas fa-cog forDesktop" />
      </Fragment>
    );

    return (
      <Fragment>
        <div className="profileHeaderBottom">
          <div className="profileHeaderBottomLeft">
            <div className="roundedProfPicLarge">
              <img src={profileImage} alt="profPic" />
                <i className="fas fa-plus-circle" />
            </div>
          </div>
          <div className="profileHeaderBottomRight">
            <div className="forDesktop">{profileButtons}</div>
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
              <Link to={`/profile/following/${userId}`} >
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
            <div className="forMobile">{profileButtons}</div>
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
});

export default connect(mapStateToProps)(withRouter(ProfileHeaderBottom));
