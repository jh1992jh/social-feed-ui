import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import { getOwnedPosts } from '../../actions/postActions'
import PropTypes from 'prop-types';
import LikeInfo from './LikeInfo';
import LikesContainer from './LikesContainer';

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
      outputContent = <h3>Loading</h3>
    } else if (profile.loading === false && loading === false) {
      outputContent = (
        ownedPosts.map(post => (
          <Fragment key={post._id}>
            <LikeInfo
              postId={post._id}
              comments={post.comments}
              postImage={post.postImage}
            />
          </Fragment>
        ))
      )
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
