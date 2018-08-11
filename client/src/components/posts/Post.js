import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deletePost } from '../../actions/postActions';
import PostHeader from './PostHeader';
import PostBody from './PostBody';
import PostFooter from './PostFooter';

class Post extends Component {
  constructor(props) {
    super(props);

    this.onDeletePost = this.onDeletePost.bind(this);
    this.onToggleMenu = this.onToggleMenu.bind(this);
    this.onCommentInputChange = this.onCommentInputChange.bind(this);

    this.state = {
      showMenu: false,
      commentInput: ''
    };
  }

  componentDidMount() {}

  onDeletePost(postId) {
    this.props.deletePost(postId);
    this.setState({ showMenu: false });
  }

  onToggleMenu() {
    const { showMenu } = this.state;
    this.setState({ showMenu: !showMenu });
  }

  onCommentInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    let postContent;
    const { showMenu, commentInput } = this.state;

    const {
      postImg,
      likes,
      name,
      postText,
      time,
      profPic,
      postId,
      userId,
      loggedUserProfPic,
      authUser,
      comments
    } = this.props;

    const { currentPost } = this.props.posts;

    if (currentPost.name) {
      postContent = (
        <Fragment>
          <PostHeader
            post={currentPost}
            showMenu={showMenu}
            onToggleMenu={this.onToggleMenu}
            onDeletePost={this.onDeletePost}
            profPic={currentPost.profPic}
            name={currentPost.name}
            userId={currentPost.userId}
          />
          <PostBody
            profPic={currentPost.profPic}
            postImg={currentPost.postImg}
            likes={currentPost.likes}
            name={currentPost.name}
            postText={currentPost.postText}
            time={currentPost.time}
            postId={currentPost.postId}
            comments={currentPost.comments}
          />
          <PostFooter
            likes={currentPost.likes}
            name={currentPost.name}
            postText={currentPost.postText}
            authUserProfPic={authUser.profPic}
            time={currentPost.time}
            userId={currentPost.userId}
            comments={currentPost.comments}
            commentInput={commentInput}
            onCommentInputChange={this.onCommentInputChange}
            onCommentSubmit={this.onCommentSubmit}
          />
        </Fragment>
      );
    } else if (
      Object.keys(this.props.match.params).length === 1 &&
      currentPost.length === 0
    ) {
      postContent = <h3>Loading</h3>;
    } else {
      postContent = (
        <Fragment>
          <PostHeader
            onDeletePost={this.onDeletePost}
            showMenu={showMenu}
            onToggleMenu={this.onToggleMenu}
            profPic={profPic}
            postImg={postImg}
            likes={likes}
            name={name}
            postText={postText}
            time={time}
            postId={postId}
            userId={userId}
          />
          <PostBody
            profPic={profPic}
            postImg={postImg}
            likes={likes}
            name={name}
            postText={postText}
            time={time}
            postId={postId}
            comments={comments}
          />
          <PostFooter
            likes={likes}
            name={name}
            postText={postText}
            authUserProfPic={authUser.profPic}
            time={time}
            userId={userId}
            comments={comments}
            commentInput={commentInput}
            onCommentInputChange={this.onCommentInputChange}
            onCommentSubmit={this.onCommentSubmit}
          />
        </Fragment>
      );
    }
    return (
      <Fragment>
        <div className="post">{postContent}</div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.authUser,
  posts: state.posts
});

export default connect(
  mapStateToProps,
  { deletePost }
)(withRouter(Post));
