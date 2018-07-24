import React from 'react';

const LikeInfo = ({ profPic, name, eventInfo, postImg, comment }) => {
  return (
    <div className="likeInfo">
      <div className="likeInfoContainer">
        <div className="likeRoundedProfPicSmall">
          <img src={profPic} alt="profPic" />
        </div>
        <p>
          <span className="name">{name} </span>
          {comment ? (
            <span>commented: {comment}</span>
          ) : (
            <span>{eventInfo}</span>
          )}{' '}
          <span className="ago">{new Date().getHours()}h</span>
        </p>
      </div>
      <div className="likedPostPic">
        <img src={postImg} alt="postPic" />
      </div>
    </div>
  );
};

export default LikeInfo;
