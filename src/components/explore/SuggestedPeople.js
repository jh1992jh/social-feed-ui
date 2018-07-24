import React, { Fragment } from 'react';

const SuggestedPeople = ({ profiles }) => {
  const outputSuggestions = profiles.slice(0, 3).map((profile, i) => (
    <div key={i} className="suggestedCard">
      <img
        src={profile.profPic}
        className="suggestedRoundedProfic"
        alt="Auggested profile"
      />
      <p className="name">{profile.name}</p>
      <p>Friend on Facebook</p>
      <button className="suggestedButton">Follow</button>
    </div>
  ));
  return (
    <Fragment>
      <div className="suggestedPeopleContainer">
        <div className="suggestedPeopleHeader">
          <p>Get To Know people</p>
          <p className="showAll">Show All</p>
        </div>
        <div className="suggestedPeople">{outputSuggestions}</div>
      </div>
    </Fragment>
  );
};

export default SuggestedPeople;
