import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile2Actions';
import { getOwnedPosts } from '../../actions/post2Actions'
import LikesHeader from './LikesHeader';
import LikeInfo from './LikeInfo';
import LikesContainer from './LikesContainer';

class Likes extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getOwnedPosts(this.props.auth.user.id);
  }
  render() {
    const { loading } = this.props.posts2;
    const { ownedPosts } = this.props.posts2;
    const { profile2 } = this.props
    let outputContent; 
    
    if(profile2.loading === true || loading === true ) {
      outputContent = <h3>Loading</h3>
    } else if (profile2.loading === false && loading === false) {
      outputContent = (
        ownedPosts.map(post => (
          <Fragment key={post._id}>
            <LikeInfo
              postId={post._id}
              comments={post.comments}
              postImage={post.postImage}
            />
            {/*<LikeInfo
              profPic={post.profPic}
              name={post.name}
              postImg={post.postImg}
              eventInfo="liked your post."
            />*/}
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

const mapStateToProps = state => ({
  auth: state.auth,
  posts2: state.posts2,
  profile2: state.profile2
});

export default connect(mapStateToProps, { getCurrentProfile, getOwnedPosts})(Likes);
