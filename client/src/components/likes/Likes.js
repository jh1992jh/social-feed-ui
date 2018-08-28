import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import { getOwnedPosts } from '../../actions/postActions'
import PropTypes from 'prop-types';
import LikeInfo from './LikeInfo';
import LikesContainer from './LikesContainer';
import Spinner from '../../utilities/Spinner';

class Likes extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getOwnedPosts(this.props.auth.user.id);
  }
  render() {
    const { loading } = this.props.posts;
    const { ownedPosts } = this.props.posts;
    const { profile } = this.props
    let outputContent; 
    
    if(profile.loading === true || loading === true ) {
      outputContent = <Spinner width="200px" />
    } else if (profile.loading === false && loading === false && ownedPosts.length > 0)  {
      outputContent = (
        ownedPosts.map(post => (
          <Fragment key={post._id}>
            <LikeInfo
              postId={post._id}
              comments={post.comments}
              postImage={post.postImage}
              post={post}
            />
          </Fragment>
        ))
      )
    } else if (profile.loading === false && loading === false && ownedPosts.length === 0) {
      outputContent = <h3>Your Posts don't have any comments yet</h3>
    }
    
    return (
      <div className="likes">
       {/* <LikesHeader /> */} 
        <LikesContainer>{outputContent}</LikesContainer>
      </div>
    );
  }
}

Likes.propTypes = {
  auth: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  getOwnedPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.posts,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, getOwnedPosts})(Likes);
