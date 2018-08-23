import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getPosts, getFollowedPosts, clearCurrentPost } from '../../actions/post2Actions';
import { getCurrentProfile } from '../../actions/profile2Actions';
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
    this.props.getCurrentProfile();
    this.props.getFollowedPosts(this.props.auth.user.id);
  }

  onToggleLikesMenu() {
    const { showLikes } = this.state;

    this.setState({ showLikes: !showLikes });
  }
  render() {
    const { showLikes } = this.state;
    const { posts2, auth, profile2 } = this.props;
  
    let outputPosts; 
    
    if(posts2.loading === true || profile2.loading === true || profile2.profile === null) {
      outputPosts = <h3>Loading</h3>
    } else if (posts2.loading === false && posts2.posts.length > 0 && Object.keys(profile2.profile).length > 0) {
      outputPosts = posts2.followedPosts.map((post, i) => (
        <Post
          key={post._id}
          postId={post._id}
          profileImage={post.profileImage}
          handle={post.handle}
          userId={post.user}
          postImage={post.postImage}
          text={post.text}
          likes={post.likes}
          comments={post.comments}
          date={post.date}
        />
      ));
    } else if (Object.keys(profile2.profile).length === 0) {
      outputPosts = (
        <div className="noProfile">
        <i className="far fa-user-circle" />
        <h3>Hey {auth.user.username}<br /></h3>
        <p>you have no profile yet<br />
        click this link to to make one <br />
        <Link to="/create-profile" className="createProfileLink"> 
          Create a profile
        </Link>
        </p>
        </div>
      )
    }
    return (
      <Fragment>
        <NavbarTop
          showLikes={showLikes}
          onToggleLikesMenu={this.onToggleLikesMenu}
        />
        <Feed>
          <Stories showLikes={showLikes} />
          {outputPosts}
        </Feed>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  posts2: state.posts2,
  profile2: state.profile2,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { clearCurrentPost, getPosts, getFollowedPosts, getCurrentProfile }
)(withRouter(MainView));
