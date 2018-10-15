import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getPosts, getFollowedPosts, clearCurrentPost } from '../../actions/postActions';
import { getCurrentProfile } from '../../actions/profileActions';
import PropTypes from 'prop-types';
import NavbarTop from '../navbars/NavbarTop';
import Feed from '../feed/Feed';
import Stories from '../stories/Stories';
import Post from '../posts/Post';
import Loading from '../../utilities/Loading';

class MainView extends Component {

  componentDidMount() {
    this.props.clearCurrentPost();
    this.props.getPosts();
    this.props.getCurrentProfile();
    this.props.getFollowedPosts(this.props.auth.user.id);
   
  }

  render() {
    const { posts, auth, profile } = this.props;
  
    let outputPosts; 
    
    if(posts.loading === true || profile.profile === null ){
      outputPosts = <Loading />
    } else if (posts.loading === false && posts.followedPosts.length > 0 && Object.keys(profile.profile).length > 0) {
      outputPosts = posts.followedPosts.map((post, i) => (
        <Post
          key={post._id}
          postId={post._id}
          profileImage={post.profileImage}
          handle={post.handle}
          userId={post.user}
          postImage={post.postImage}
          filter={post.filter}
          text={post.text}
          likes={post.likes}
          comments={post.comments}
          date={post.date}
        />
      ));
    } else if (Object.keys(profile.profile).length === 0 && profile.loading === false) {
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
    } else if (profile.profile.following.length === 0) {
      outputPosts = (
        <div className="notFollowing">
          <p>You have not followed anyone yet<br />
          <Link to="/explore" className="notFollwingLink">
            click here{' '}
          </Link>
            to see posts <br />and to find people to follow.
          </p>
        </div>
      )
    }
    return (
      <Fragment>
        <NavbarTop />
        <Feed>
          <Stories />
          {outputPosts}
        </Feed>
      </Fragment>
    );
  }
}

/* MainView.propTypes = {
  posts: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  clearCurrentPost: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
} */

const mapStateToProps = state => ({
  posts: state.posts,
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getPosts ,clearCurrentPost, getFollowedPosts, getCurrentProfile }
)(withRouter(MainView));
