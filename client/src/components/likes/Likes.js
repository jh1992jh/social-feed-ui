import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import { getOwnedPosts, getPostNotifications } from '../../actions/postActions'
import PropTypes from 'prop-types';
import LikeInfo from './LikeInfo';
import LikesContainer from './LikesContainer';
import Loading from '../../utilities/Loading';

class Likes extends Component {
  componentDidMount() {
  this.props.getPostNotifications(this.props.auth.user.id)
  }
  render() {
    const { loading } = this.props.posts;
    const { postNotifications } = this.props.posts;
    const { profile } = this.props

    
    let outputContent; 
    
    if(profile.loading === true || loading === true ) {
      outputContent = <Loading />
    } else if (profile.loading === false && loading === false && postNotifications.length > 0)  {
      postNotifications.sort((a, b ) => a.date < b.date.toString())
      outputContent = (
        postNotifications.map(post => (
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
    } else if (profile.loading === false && loading === false && postNotifications.length === 0) {
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

export default connect(mapStateToProps, { getCurrentProfile, getOwnedPosts, getPostNotifications})(Likes);
