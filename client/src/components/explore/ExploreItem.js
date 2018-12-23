import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';


const ExploreItem = ({ post }) => {
  const {  postImage, _id, filter } = post;
  return (
    <Fragment>
      <Link to={`/post/${_id}`}>
        <img
          src={postImage}
          alt="postImg"
          className={filter !== 'none' ? filter : null }
        />
      </Link>
    </Fragment>
  );
};

ExploreItem.propTypes = {
  post: PropTypes.object.isRequired
}

export default ExploreItem;
