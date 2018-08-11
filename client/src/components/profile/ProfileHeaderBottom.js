import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class ProfileHeaderBottom extends Component {
  render() {
    const {
      onShowAccountsOff,
      profPic,
      name,
      description,
      show,
      showOtherProfileBtn,
      authUserId,
      profile
    } = this.props;
    let profileButtons = (
      <Fragment>
        <p className="nameLarge forDesktop">{name}</p>
        <button
          className="editProfileBtn"
          style={show === false ? { display: 'none' } : null}
        >
          Edit Profile
        </button>
        <i className="fas fa-cog forDesktop" />
      </Fragment>
    );

    if (
      showOtherProfileBtn === true &&
      this.props.match.params.userId !== authUserId
    ) {
      profileButtons = (
        <Fragment>
          <div className="otherProfileBtnsDesktop">
            <p className="nameLarge">{name}</p>
            <button className="follow">Follow</button>
            <button className="suggested">
              <i className="fas fa-caret-down" />
            </button>
            <i className="fas fa-ellipsis-h" />
          </div>

          <div className="otherProfileBtns">
            <button className="message">Message</button>
            <button className="follow">
              <i className="fas fa-user-check" />
            </button>
            <button className="suggested">
              <i className="fas fa-caret-down" />
            </button>
          </div>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <div className="profileHeaderBottom" onMouseOver={onShowAccountsOff}>
          <div className="profileHeaderBottomLeft">
            <div className="roundedProfPicLarge">
              <img src={profPic} alt="profPic" />
              {Object.keys(profile.currentProfile).length === 0 ? (
                <i className="fas fa-plus-circle" />
              ) : null}
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
                onMouseOver={onShowAccountsOff}
              >
                <p className="name">{name}</p>
                <p className="profAboutDesc">{description}</p>
              </div>
            </div>
            <div className="forMobile">{profileButtons}</div>
          </div>
        </div>
        <div className="profileAbout" onMouseOver={onShowAccountsOff}>
          <p className="name">{name}</p>
          <p className="description">{description}</p>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps)(withRouter(ProfileHeaderBottom));
