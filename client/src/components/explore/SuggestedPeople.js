import React, { Fragment } from 'react';
import{ Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SuggestedPeople = ({ profiles }) => {
  const outputSuggestions = profiles.slice(0, 3).map(profile => (
    <div key={profile.user._id} className="suggestedCard">
      <img
        src={profile.user.profileImage}
        className="suggestedRoundedProfic"
        alt="Auggested profile"
      />
      <p className="name">{profile.handle}</p>
      <Link to={`/profile/${profile.user._id}`}>
      <button className="suggestedButton">See their profile</button>
      </Link>
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

SuggestedPeople.propTypes = {
  profiles: PropTypes.array.isRequired
}

export default SuggestedPeople;
