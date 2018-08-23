import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ExportItem = ({ post }) => {
  const {  postImage, _id } = post;
  return (
    <Fragment>
      <Link to={`/post/${_id}`}>
        <img
          src={postImage}
          alt="postImg"
        />
      </Link>
    </Fragment>
  );
};

ExportItem.propTypes = {
  post: PropTypes.object.isRequired
}

export default ExportItem;
