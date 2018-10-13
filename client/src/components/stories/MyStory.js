import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MyStory = ({ handle, profileImage }) => {
  return (
    <div>
    <Link to="/create-story">
      <div className="story myStory">
        {profileImage !== undefined ? (<img
          src={profileImage}
          alt="My Story"
          className="myStoryImg"
        />) : null}
        <ul className="forDesktop">
          <li>{handle}</li>
        </ul>
        <i className="fas fa-plus-circle" />
      </div>
      </Link>
      <br />
      <p className="myStoryText">Your Story</p>
    </div>
  );
};

MyStory.propTypes = {
  handle: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired
}

export default MyStory;
