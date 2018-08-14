import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPosts, clearCurrentPost } from '../../actions/post2Actions';
import NavbarTop from '../navbars/NavbarTop';
import Feed from '../feed/Feed';
import Stories from '../stories/Stories';
import Post from '../posts/Post';

class MainView extends Component {
  constructor(props) {
    super(props);

    this.onToggleLikesMenu = this.onToggleLikesMenu.bind(this);

    this.state = {
      showLikes: false
    };
  }

  componentDidMount() {
    this.props.clearCurrentPost();
    this.props.getPosts();
  }

  onToggleLikesMenu() {
    const { showLikes } = this.state;

    this.setState({ showLikes: !showLikes });
  }
  render() {
    const { showLikes } = this.state;
    const { authUser, posts2, auth } = this.props;
  
    let outputPosts; 
    
    if(posts2.loading === true) {
      outputPosts = <h3>Loading</h3>
    } else if (posts2.loading === false && posts2.posts.length > 0) {
      outputPosts = posts2.posts.map((post, i) => (
        <Post
          key={post._id}
          postId={post._id}
          profileImage={post.profileImage}
          username={post.username}
          postImage={post.postImage}
          text={post.text}
          likes={post.likes}
          comments={post.comments}
          date={post.date}
          /* profPic={post.profPic}
          name={post.name}
          postImg={post.postImg}
          likes={post.likes}
          postText={post.postText}
          time={post.time}
          postId={post.postId}
          userId={post.userId}
          comments={post.comments} */
        />
      ));
    }

    
   /* const outputPosts = posts.map((post, i) => (
      <Post
        key={i}
        profPic={post.profPic}
        name={post.name}
        postImg={post.postImg}
        likes={post.likes}
        postText={post.postText}
        time={post.time}
        postId={post.postId}
        userId={post.userId}
        comments={post.comments}
      />
    ));*/
    return (
      <Fragment>
        <NavbarTop
          showLikes={showLikes}
          onToggleLikesMenu={this.onToggleLikesMenu}
        />
        <Feed>
          <Stories authUser={authUser} showLikes={showLikes} />
          {outputPosts}
        </Feed>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  posts2: state.posts2,
  profile: state.profile,
  authUser: state.authUser,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { clearCurrentPost, getPosts }
)(withRouter(MainView));
