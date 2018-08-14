import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { deletePost } from '../../actions/post2Actions';

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
      auth,
      username,
      profileImage,
      postId,
      postOwner
    } = this.props;

    const { showMenu } = this.state;

    return (
      <div className="postHeader">
      {this.props.match.params.postId ? <button onClick={this.onGoBack}>Go back</button> : null}
        <div className="postHeaderProfInfo">
          <div className="roundedProfThumbSmall">
            <img src={profileImage} alt="profPic" />
          </div>
         {/* <Link to={`/profile/${userId}`}>
            <p className="profileName">{username}</p>{' '}
    </Link> */}
    <p className="profileName">{username}</p>
        </div>
        <div className="postHeaderProfInfo2">
          <i onClick={this.onToggleMenu} className="fas fa-ellipsis-v" />
          {showMenu === true ? (
            <div className="showMenuContainer">
              { postOwner === auth.user.id ? (
                <p onClick={this.onDeletePost}>Delete</p> 
              ) : (
                <p>Copy Url</p>
              )}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost }
)(withRouter(PostHeader));
