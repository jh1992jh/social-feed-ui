import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const ExportItem = ({ post, onAddCurrentPost }) => {
  const { name, postImg, likes, postText, time, postId } = post;
  return (
    <Fragment>
      <Link to={`/post/${postId}`}>
        <img
          src={postImg}
          alt="postImg"
          onClick={() => onAddCurrentPost(post)}
        />
      </Link>
    </Fragment>
  );
};

export default ExportItem;
