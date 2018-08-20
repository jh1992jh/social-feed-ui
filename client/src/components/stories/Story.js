import React from 'react';

const Story = ({ storyImage, handle }) => {
  return (
    <div>
      <div className="story othersStory">
        <img className="storyImg" src={storyImage} alt="story" />
        <ul className="forDesktop">
          <li>{handle}</li>
          <li className="ago">{new Date().getHours()} HOURS AGO</li>
        </ul>
      </div>
      <p className="storyText">{handle}</p>
    </div>
  );
};

export default Story;
