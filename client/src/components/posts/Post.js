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
   // let postContent;


    const {
      
          profileImage,
          username,
          postImage,
          text,
          likes,
          date,
          comments,
          postId,
      /* postImg,
      likes,
      name,
      postText,
      date,
      profPic,
      userId,
      loggedUserProfPic,
      authUser,
      comments */
    } = this.props;

    let postContent = (
      <Fragment>
      <Link to={`/post/${postId}`} onClick={this.onAddCurrentPost}>
        <PostHeader
          
          onToggleMenu={this.onToggleMenu}
          profileImage={profileImage}
          username={username}
         /* postImg={postImg}
          likes={likes}
          postText={postText}
          date={date}
          postId={postId}
          userId={userId}*/
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

          /* profPic={profPic}
          likes={likes}
          name={name}
          postText={postText}
          date={date}
          comments={comments} */
        />
        <PostFooter
          likes={likes}
          username={username}
          text={text}
          date={date}
          profileImage={profileImage}
          postId={postId}
         /* authUserProfPic={authUser.profPic}
    userId={userId} */
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
         // likes={post.likes}
          username={post.username}
          text={post.text}
          date={post.date}
          profileImage={post.profileImage}
          postId={post.postId}
          likes={post.likes}
         /* authUserProfPic={authUser.profPic}
    userId={userId} */
          comments={post.comments}
          


          />
        </Fragment>
      );
    }  else if (
      this.props.match.params.postId && Object.keys(post).length === 0
    ) {
      postContent = <h3>Loading</h3>;
    }/* else {
      postContent = (
        <Fragment>
          <PostHeader
     
            showMenu={showMenu}
            onToggleMenu={this.onToggleMenu}
            profPic={profPic}
            postImg={postImg}
            likes={likes}
            name={name}
            postText={postText}
            date={date}
            postId={postId}
            userId={userId}
          />
          <PostBody
            profPic={profPic}
            postImg={postImg}
            likes={likes}
            name={name}
            postText={postText}
            date={date}
            postId={postId}
            comments={comments}
          />
          <PostFooter
            likes={likes}
            name={name}
            postText={postText}
            authUserProfPic={authUser.profPic}
            date={date}
            userId={userId}
            comments={comments}
            commentInput={commentInput}
        
 
          />
        </Fragment>
      );
    } */
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
