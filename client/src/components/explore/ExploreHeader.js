import React from 'react';

const ExploreHeader = () => {
  return (
    <div className="exploreHeader">
      <div className="exploreHeaderSearch">
        <i className="fas fa-search" />
        <input
          type="text"
          className="exploreHeaderInput"
          placeholder="Search"
        />
      </div>
      <div className="exploreHeaderScan">
        <i className="far fa-address-card" />
      </div>
    </div>
  );
};

export default ExploreHeader;
