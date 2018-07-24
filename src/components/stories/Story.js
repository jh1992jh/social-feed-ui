import React from 'react';

const Story = ({ img, name }) => {
  return (
    <div>
      <div className="story othersStory">
        <img className="storyImg" src={img} alt="story" />
        <ul className="forDesktop">
          <li>{name}</li>
          <li className="ago">{new Date().getHours()} HOURS AGO</li>
        </ul>
      </div>
      <p className="storyText">{name}</p>
    </div>
  );
};

export default Story;
