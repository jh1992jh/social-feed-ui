import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const LikeInfo = ({ comments, postImage, postId}) => {
  return (
    <div className="likeInfo">
      <div className="likeInfoContainer">
        <div className="likeRoundedProfPicSmall">
          <img src={comments[0].profileImage} alt="profPic" />
        </div>
        <p>
        <Link to={`/profile/${comments[0].user}`}>
          <span className="name">{comments[0].handle} </span>
          </Link>
          <Link to={`/post/${postId}`}>
            <span>commented: {comments[0].text}</span>
        

          <span className="ago">{new Date().getHours()}h</span>
          </Link>
        </p>
      </div>
      <div className="likedPostPic">
        <img src={postImage} alt="postPic" />
      </div>
    </div>
  );
};

LikeInfo.propTypes = {
  comments: PropTypes.array.isRequired,
  postImage: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired
}

export default LikeInfo;
