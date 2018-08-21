import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

class ProfileHeaderBottomOther extends Component {
  render() {
    const {
      profileImage,
      userId,
      handle,
      description,
      ownedPosts,
      followers,
      following
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
                <p>{ownedPosts.length}</p>
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
