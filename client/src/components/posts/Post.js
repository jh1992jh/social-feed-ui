import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addComment, addCurrentPost, getPost } from '../../actions/postActions';
import PropTypes from 'prop-types';
import PostHeader from './PostHeader';
import PostBody from './PostBody';
import PostFooter from './PostFooter';

class Post extends Component {
  componentDidMount() {
  if (this.props.match.params.postId) {
    this.props.getPost(this.props.match.params.postId);
  }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps) console.log(typeof nextProps.posts.post.postImage);
  }

  onAddCurrentPost = () => {
    this.props.addCurrentPost(this.props);
  }

  render() {

    const {
      
          profileImage,
          handle,
          userId,
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
          handle={handle}
          userId={userId}
        />
        <PostBody
        postImage={postImage}
        postId={postId}
        profileImage={profileImage}
        handle={handle}
        text={text}
        likes={likes}
        date={date}
        comments={comments}
        />
        <PostFooter
          likes={likes}
          userId={userId}
          handle={handle}
          text={text}
          date={date}
          profileImage={profileImage}
          postId={postId}
          comments={comments}     
        />
        </Link>
      </Fragment>
    ) 

    const { post } = this.props.posts;

    if (Object.keys(post).length > 0) {
      postContent = (
        <Fragment>
          <PostHeader
          showMenu={this.showMenu}
          onToggleMenu={this.onToggleMenu}
          profileImage={post.profileImage}
          handle={post.handle}
          postId={post.postId}
          userId={post.user}
          />
          <PostBody
          postImage={post.postImage}
          postId={post.postId}
          profileImage={post.profileImage}
          handle={post.handle}
            text={post.text}
            likes={post.likes}
            date={post.date}
            comments={post.comments}
          />
          <PostFooter
          handle={post.handle}
          text={post.text}
          date={post.date}
          profileImage={post.profileImage}
          postId={post.postId}
          likes={post.likes}
          comments={post.comments}
          userId={post.user}
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

Post.propTypes = {
  auth: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  addCurrentPost: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.posts
});

export default connect(
  mapStateToProps,
  { addComment, addCurrentPost, getPost }
)(withRouter(Post));
