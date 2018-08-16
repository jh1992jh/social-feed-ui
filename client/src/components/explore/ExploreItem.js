import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const ExportItem = ({ post }) => {
  const {  postImage, _id } = post;
  return (
    <Fragment>
      <Link to={`/post/${_id}`}>
        <img
          src={postImage}
          alt="postImg"
         /* onClick={() => onAddCurrentPost(post)} */
        />
      </Link>
    </Fragment>
  );
};

export default ExportItem;
