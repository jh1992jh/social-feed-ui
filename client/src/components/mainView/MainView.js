import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clearCurrentPost } from '../../actions/postActions';
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
  }

  onToggleLikesMenu() {
    const { showLikes } = this.state;

    this.setState({ showLikes: !showLikes });
  }
  render() {
    const { showLikes } = this.state;
    const { authUser } = this.props;
    const { posts } = this.props.posts;
    const outputPosts = posts.map((post, i) => (
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
    ));
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
  profile: state.profile,
  authUser: state.authUser
});

export default connect(
  mapStateToProps,
  { clearCurrentPost }
)(withRouter(MainView));
