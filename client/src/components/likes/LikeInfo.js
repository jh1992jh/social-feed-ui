import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { toggleLikesMenu } from '../../actions/postActions';

const LikeInfo = ({ post }) => {
  const { comments, _id, postImage } = post;
  let like;

  if(comments.length > 0) {
    like = (
      <div className="likeInfo">
      <Link to={`/post/${_id}`} onClick={() => this.props.toggleLikesMenu()}>
      <div className="likeInfoContainer">
        <div className="likeRoundedProfPicSmall">
          <img src={comments[0].profileImage} alt="profPic" />
        </div>
        <p>
       
          <span className="name">{comments[0].handle} </span>

            <span>commented: {comments[0].text}</span>
        
          {' '}
          <Moment fromNow className="ago">{comments[0].date}</Moment>
         
        </p>
        <div className="likedPostPic">
          <img src={postImage} alt="postPic" />
          </div>
      </div>
      </Link>
    </div>
    ) 
  } else {
    like = null
  }
  return like;
};

LikeInfo.propTypes = {
  comments: PropTypes.array.isRequired,
  postImage: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired
}

export default connect(null, { toggleLikesMenu })(LikeInfo);
