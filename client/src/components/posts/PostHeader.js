import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { deletePost } from '../../actions/postActions';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PostHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;

  button {
    border: none;
  }

  @media (min-width: 1000px) {
    padding: 0.5em;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex: 1;

  @media (min-width: 1000px) {
    align-items: center;
  }
`;

const ProfileThumbnail = styled.div`
  height: 25px;
  width: 30px;
  border-radius: 360px;
  border: 1px solid #808080;
  margin: 0 0.5em 0.3em 0.2em;
  position: relative;
  background: #eee;

  img {
    height: 30px;
    width: 30px;
    border-radius: 360px;
    position: absolute;
    bottom: -0.1em;
    left: 0;
  }

  @media (min-width: 1000px) {
    margin: 0;
  }
`

const ProfileName = styled.p`
  color: #222;
  font-size: 0.6rem;
  font-weight: 500;
  margin-bottom: -100px;

  @media (min-width: 1000px) {
    margin: 1em;
    display: block;
  }
`

class PostHeader extends Component {
  state = {
    showMenu: false
  }

  onGoBack = () => {
    this.props.history.go(-1);
  }

  onToggleMenu = () => {
    const { showMenu } = this.state;
    this.setState({ showMenu: !showMenu });
  }

  onDeletePost = () => {
    this.props.deletePost(this.props.match.params.postId, this.props.history)
  } 
  render() {
    const {
      handle,
      userId,
      profileImage,
    } = this.props;



    return (
      <PostHeaderStyled>
      {this.props.match.params.postId ? <button onClick={this.onGoBack} className="goBackBtn"><i className="fas fa-arrow-left" /> Go back</button> : null}
        <ProfileInfo>
          <ProfileThumbnail>
            <img src={profileImage} alt="profPic" />
          </ProfileThumbnail>
          <Link to={`/profile/${userId}`}>
            <ProfileName>{handle}</ProfileName>{' '}
          </Link> 
        </ProfileInfo>
       {/* <div className="postHeaderProfInfo2">
          <i onClick={this.onToggleMenu} className="fas fa-ellipsis-v" />
          {showMenu === true ? (
            <div className="showMenuContainer">
              { userId === auth.user.id ? (
                <p onClick={this.onDeletePost}>Delete</p> 
              ) : (
                <p>Copy Url</p>
              )}
            </div>
          ) : null}
              </div> */}
      </PostHeaderStyled>
    );
  }
}

PostHeader.propTypes = {
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost }
)(withRouter(PostHeader));
