import React from 'react';

const MyStory = ({ authUser }) => {
  return (
    <div>
      <div className="story myStory">
        <img
          src="https://images.pexels.com/photos/106400/pexels-photo-106400.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
          alt="My Story"
          className="myStoryImg"
        />
        <ul className="forDesktop">
          <li>{authUser.name}</li>
        </ul>
        <i className="fas fa-plus-circle" />
      </div>
      <br />
      <p className="myStoryText">Your Story</p>
    </div>
  );
};

export default MyStory;
