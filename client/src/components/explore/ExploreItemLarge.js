import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ExploreItemLg = styled.div`
  height: 66vw
  width: 66vw

  img {
    height: 66vw
    width: 66vw
  }

`
import PropTypes from 'prop-types';


const ExportItemLarge = ({ post }) => {
  const {  postImage, _id, filter } = post;
  return (
    <ExploreItemLg>
      <Link to={`/post/${_id}`}>
        <img
          src={postImage}
          alt="postImg"
          className={filter !== 'none' ? filter : null }
        />
      </Link>
    </ExploreItemLg>
  );
};

ExportItemLarge.propTypes = {
  post: PropTypes.object.isRequired
}

export default ExportItemLarge;
