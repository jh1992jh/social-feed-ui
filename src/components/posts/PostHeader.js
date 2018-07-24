import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { deletePost } from '../../actions/postActions';

class PostHeader extends Component {
  render() {
    const {
      postImg,
      likes,
      name,
      postText,
      time,
      profPic,
      postId,
      onDeletePost,
      showMenu,
      onToggleMenu,
      authUser,
      currentPost,
      userId
    } = this.props;


    return (
      <div className="postHeader">
        <div className="postHeaderProfInfo">
          <div className="roundedProfThumbSmall">
            <img src={profPic} alt="profPic" />
          </div>
          <Link to={`/profile/${userId}`}>
            <p className="profileName">{name}</p>{' '}
          </Link>
        </div>
        <div className="postHeaderProfInfo2">
          <i onClick={onToggleMenu} className="fas fa-ellipsis-v" />
          {showMenu === true ? (
            <div className="showMenuContainer">
              {this.props.authUser.name === name ? (
                <p onClick={() => onDeletePost(postId)}>Delete</p>
              ) : (
                <p>Share</p>
              )}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.authUser
});

export default connect(
  mapStateToProps,
  { deletePost }
)(withRouter(PostHeader));
