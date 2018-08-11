import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCurrentPost } from '../../actions/postActions';
import { Link, withRouter } from 'react-router-dom';

class PostBody extends Component {
  constructor(props) {
    super(props);

    this.onAddCurrentPost = this.onAddCurrentPost.bind(this);
  }

  onAddCurrentPost() {
    this.props.addCurrentPost(this.props);
  }
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
      comments
    } = this.props;
    return (
      <div className="postBody">
        <div className="postBodyImg">
          <img src={postImg} alt="post" />
        </div>
        <div
          className="postBodyIcons"
          style={
            Object.keys(this.props.match.params).length === 1
              ? { display: 'none' }
              : null
          }
        >
          <div className="postBodyIconsLeft forMobile">
            <i className="far fa-heart" />
            <Link to={`/post/${postId}`}>
              <i className="far fa-comment" onClick={this.onAddCurrentPost} />
            </Link>
            <i className="far fa-paper-plane" />
          </div>

          <div className="postBodyIconsLeft forDesktop">
            <i className="far fa-heart" />

            <i className="far fa-comment" />
          </div>
          <div className="postBodyIconsRight">
            <i className="far fa-bookmark" />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { addCurrentPost }
)(withRouter(PostBody));
