import React from 'react';
import PropTypes from 'prop-types';

const Story = ({ storyImage, handle }) => {
  return (
    <div>
      <div className="story othersStory">
        {storyImage !== undefined ? <img className="storyImg" src={storyImage} alt="story" /> : null}
        <ul className="forDesktop">
          <li>{handle}</li>
          <li className="ago">{new Date().getHours()} HOURS AGO</li>
        </ul>
      </div>
      <p className="storyText">{handle}</p>
    </div>
  );
};

Story.propTypes = {
  storyImage: PropTypes.string.isRequired,
  handle: PropTypes.string.isRequired
}

export default Story;
