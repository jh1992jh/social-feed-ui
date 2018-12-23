import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ProfileHeaderBottomStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em 1.2em 0.8em 0.5em;

@media (min-width: 1000px) {
  width: 80vw;
  margin: 5em auto;
}
`

const ProfileHeaderBottomLeft = styled.div`
@media (min-width: 1000px) {
  height: 30vh;
  width: 100%;
  display: flex;
  justify-content: center;
}
`;

const ProfileImage = styled.div`
  height: 85px;
  width: 85px;
  border-radius: 360px;
  border: 1px solid #808080;
  position: relative;

    img {
      height: 85px;
      width: 85px;
      border-radius: 360px;
    }

  @media (min-width: 1000px) {
    border-radius: 0;
    height: 100%;
    width: 34%;

    img {
      border-radius: 0;
      height: 100%;
      width: auto;
      margin: 0 auto;
      display: block;
    }
  }
`

const ProfileHeaderBottomRight = styled.div`
  width: 60vw;
  margin: -0.5em -0.5em 0 0;

p {
  text-align: center;
  font-weight: 600;
}

span {
  color: #808080;
}

@media (min-width: 1000px) {
  width: 100%;
}
`
const RightSubContainer = styled.div`
  display: flex;
  justify-content: space-around;
`
const ProfileContent = styled.div`
  line-height: 0.5rem;
`

const ProfileButtons = styled.div`
  button {
    border: 1px solid #808080;
    border-radius: 5px;
    padding: 0.2em;
    box-shadow: 0;
    background: #fff;
    margin: 0.2em;
    width: 100%;
  }

  @media (min-width: 1000px) {
    width: 30%;
    margin: 2em auto;
  }
`;

const ProfileName = styled.p`
    font-weight: 600;
    margin-top: -0.5em;
`;

const ProfileDescription = styled.p`
  margin-top: -0.7em;
`;

const ProfileAbout = styled.div`
  line-height: 1rem;
  padding: 0 0 0.5em 0.5em;
  margin: auto;
  @media (min-width: 1000px) {
    width: 80vw;
    margin: 0 auto;
}
` 

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
      
      </Fragment>
    );

    return (
      <Fragment>
        <ProfileHeaderBottomStyled>
          <ProfileHeaderBottomLeft>
            <ProfileImage>
              <img src={profileImage} alt="profPic" />
            </ProfileImage>
          </ProfileHeaderBottomLeft>
          <ProfileHeaderBottomRight>
            {/* <div className="forDesktop">{profileButtons}</div> */}
            <RightSubContainer>
              <ProfileContent>
              <a>
                <p>{ownedPosts.length}</p>
                </a>
                <span>posts</span>
              </ProfileContent>
              <ProfileContent>
              <Link to={`/profile/followers/${userId}`}>
              <p>{followers.length}</p>
              </Link>
                <span>followers</span>
              </ProfileContent>
              <ProfileContent>
              <Link to={`/profile/following/${userId}`} >
                <p>{following.length}</p>
                </Link>
                <span>following</span>
              </ProfileContent>
            </RightSubContainer>
            <br />
            {/* <dv className="forDesktop">
              <div
                className="profileAboutDesktop"
            
              >
                <p className="name">{handle}</p>
                <p className="profAboutDesc">{description}</p>
              </div>
            </div> */}
            <ProfileButtons>{profileButtons}</ProfileButtons>
          </ProfileHeaderBottomRight>
        </ProfileHeaderBottomStyled>
        <ProfileAbout>
          <ProfileName>{handle}</ProfileName>
          <ProfileDescription>{description}</ProfileDescription>
        </ProfileAbout>
      </Fragment>
    );
  }
}

ProfileHeaderBottom.propTypes = {
      profileImage: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
      ownedPosts: PropTypes.array.isRequired,
      following: PropTypes.array.isRequired,
      followers: PropTypes.array.isRequired,
      handle: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(ProfileHeaderBottom));
