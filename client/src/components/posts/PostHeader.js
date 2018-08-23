import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { deletePost } from '../../actions/postActions';
import PropTypes from 'prop-types';

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
      handle,
      userId,
      profileImage,
    } = this.props;

    const { showMenu } = this.state;

    return (
      <div className="postHeader">
      {this.props.match.params.postId ? <button onClick={this.onGoBack}>Go back</button> : null}
        <div className="postHeaderProfInfo">
          <div className="roundedProfThumbSmall">
            <img src={profileImage} alt="profPic" />
          </div>
          <Link to={`/profile/${userId}`}>
            <p className="profileName">{handle}</p>{' '}
    </Link> 
        </div>
        <div className="postHeaderProfInfo2">
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
        </div>
      </div>
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
