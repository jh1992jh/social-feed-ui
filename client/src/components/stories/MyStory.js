import React from 'react';
import { Link } from 'react-router-dom';

const MyStory = ({ handle, profileImage }) => {
  return (
    <div>
    <Link to="/create-story">
      <div className="story myStory">
        <img
          src={profileImage}
          alt="My Story"
          className="myStoryImg"
        />
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

export default MyStory;
