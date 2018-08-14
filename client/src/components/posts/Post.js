import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addComment, addCurrentPost, getPost } from '../../actions/post2Actions';
import PostHeader from './PostHeader';
import PostBody from './PostBody';
import PostFooter from './PostFooter';

class Post extends Component {
  componentDidMount() {
  if (this.props.match.params.postId) {
    this.props.getPost(this.props.match.params.postId);
  }
  }

  onAddCurrentPost = () => {
    this.props.addCurrentPost(this.props);
  }

  render() {

    const {
      
          profileImage,
          username,
          postImage,
          text,
          likes,
          date,
          comments,
          postId,
    } = this.props;

    let postContent = (
      <Fragment>
      <Link to={`/post/${postId}`} onClick={this.onAddCurrentPost}>
        <PostHeader
          onToggleMenu={this.onToggleMenu}
          profileImage={profileImage}
          username={username}
        />
        <PostBody
        postImage={postImage}
        postId={postId}
        profileImage={profileImage}
        username={username}
        text={text}
        likes={likes}
        date={date}
        comments={comments}
        />
        <PostFooter
          likes={likes}
          username={username}
          text={text}
          date={date}
          profileImage={profileImage}
          postId={postId}
          comments={comments}     
        />
        </Link>
      </Fragment>
    ) 

    const { post } = this.props.posts2;

    if (Object.keys(post).length > 0) {
      postContent = (
        <Fragment>
          <PostHeader
          showMenu={this.showMenu}
          onToggleMenu={this.onToggleMenu}
          profileImage={post.profileImage}
          username={post.username}
          postId={post.postId}
          postOwner={post.user}
          />
          <PostBody
          postImage={post.postImage}
          postId={post.postId}
          profileImage={post.profileImage}
          username={post.username}
            text={post.text}
            likes={post.likes}
            date={post.date}
            comments={post.comments}
          />
          <PostFooter
          username={post.username}
          text={post.text}
          date={post.date}
          profileImage={post.profileImage}
          postId={post.postId}
          likes={post.likes}
          comments={post.comments}
          


          />
        </Fragment>
      );
    }  else if (
      this.props.match.params.postId && Object.keys(post).length === 0
    ) {
      postContent = <h3>Loading</h3>;
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
  auth: state.auth,
  posts: state.posts,
  posts2: state.posts2
});

export default connect(
  mapStateToProps,
  { addComment, addCurrentPost, getPost }
)(withRouter(Post));
