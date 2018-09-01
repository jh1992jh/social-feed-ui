import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileBody = ({ ownedPosts }) => {
  let outputContent;

  if(ownedPosts.length > 0) {
    outputContent = ownedPosts.map(post => (
      <Link to={`/post/${post._id}`} key={post._id} className="profileBodyItem">
        <img src={post.postImage} className={post.filter !== 'none' ? post.filter : null} alt="postImg" />
      </Link>
    ));
  } else if (ownedPosts.length === 0) {
    outputContent = ( 
      <div className="noPosts">
    <i className="far fa-image" />
    <p>You have no posts yet <br /> 
      start by adding some
    </p>
    </div>
  )
  }
  return (
    <div className="profileBody">
      {outputContent}
    </div>
  );
};

ProfileBody.propTypes = {
  ownedPosts: PropTypes.array.isRequired
}

export default ProfileBody;
