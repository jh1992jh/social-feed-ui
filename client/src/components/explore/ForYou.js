import React from 'react';
import PropTypes from 'prop-types';

const ForYou = ({ img, profileImage }) => {
  return (
    <div className="exploreForYou">
      <div className="exploreCategoriesRoundedProfThumbSmall">
        <img src={profileImage} alt="profImg" />
      </div>
      <img src={profileImage} alt="For you" />
      <h4>For You</h4>
    </div>
  );
};

ForYou.propTypes = {
  profileImage: PropTypes.string.isRequired
}

export default ForYou;
