import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const LikeInfo = ({ post }) => {
  const { comments, _id, postImage } = post;
  let like;

  if(comments.length > 0) {
    like = (
      <div className="likeInfo">
      <div className="likeInfoContainer">
        <div className="likeRoundedProfPicSmall">
          <img src={comments[0].profileImage} alt="profPic" />
        </div>
        <p>
        <Link to={`/profile/${comments[0].user}`}>
          <span className="name">{comments[0].handle} </span>
          </Link>
          <Link to={`/post/${_id}`}>
            <span>commented: {comments[0].text}</span>
        
          {' '}
          <Moment fromNow className="ago">{comments[0].date}</Moment>
          </Link>
        </p>
      </div>
      <Link to={`/post/${_id}`} className="likedPostPic">
        <img src={postImage} alt="postPic" />
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

export default LikeInfo;
