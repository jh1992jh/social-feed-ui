import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class ProfileHeaderBottomOther extends Component {
  render() {
    const {
      profileImage,
      handle,
      description,
    } = this.props;
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
            </div>
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
                <p className="name">{handle}</p>
                <p className="profAboutDesc">{description}</p>
              </div>
            </div>
            <div className="forMobile">
            <div className="otherProfileBtns">
            <button className="message">Message HEEYYY</button>
            <button className="follow">
              <i className="fas fa-user-check" />
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

export default withRouter(ProfileHeaderBottomOther);
