import React from 'react';

const ForYou = ({ img, profileImage }) => {
  return (
    <div className="exploreForYou">
      <div className="exploreCategoriesRoundedProfThumbSmall">
        <img src={profileImage} alt="profImg" />
      </div>
      <img src={img} alt="For you" />
      <h4>For You</h4>
    </div>
  );
};

export default ForYou;
