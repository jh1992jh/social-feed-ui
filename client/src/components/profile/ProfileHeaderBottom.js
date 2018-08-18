import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

class ProfileHeaderBottom extends Component {
  render() {
    const {
      profileImage,
      username,
      description,
      show,
    } = this.props;
    let profileButtons = (
      <Fragment>
        <p className="nameLarge forDesktop">{username}</p>
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
                <p>127</p>
                <span>posts</span>
              </div>
              <div className="profileHeaderContent">
                <p>103</p>
                <span>followers</span>
              </div>
              <div className="profileHeaderContent">
                <p>83</p>
                <span>following</span>
              </div>
            </div>
            <br />
            <div className="forDesktop">
              <div
                className="profileAboutDesktop"
            
              >
                <p className="name">{username}</p>
                <p className="profAboutDesc">{description}</p>
              </div>
            </div>
            <div className="forMobile">{profileButtons}</div>
          </div>
        </div>
        <div className="profileAbout">
          <p className="name">{username}</p>
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
