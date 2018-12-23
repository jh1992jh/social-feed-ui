import React, { Fragment } from 'react';
import{ Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const SuggestedPeopleContainer = styled.div`
  margin-top: 3em;
  max-width: 60%;
  margin: 3em auto;
`;

const SuggestedPeopleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5em;

  p {
    margin: 0 1em;
    color: #909090;
  }

  .showAll {
    color: #0099cc;
  }
`

const SuggestedCard = styled.div`
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2em 0;
  margin: 1em;
  border: 1px solid #d0d0d0;
  background-color: #fff;

  img {
    height: auto;
    max-height: 100%;
    max-width: 100%;
  
    margin-bottom: 0.2em;
  }

  button {
    background-color: #0099cc;
    color: #fff;
    font-weight: 600;
    border: none;
    border-radius: 5.5px;
    padding: 0.6em;
  }
`

const SuggestedPeopleStyled = styled.div`
  display: flex;
  justify-content: center;
  color: #d0d0d0;
`

const SuggestedPeople = ({ profiles }) => {
  const outputSuggestions = profiles.slice(0, 3).map(profile => (
    <SuggestedCard key={profile.user._id}>
      <img
        src={profile.profileImage}
        className="suggestedRoundedProfic"
        alt="Suggested profile"
      />
      <p className="name">{profile.handle}</p>
      <Link to={`/profile/${profile.user._id}`}>
      <button className="suggestedButton">See their profile</button>
      </Link>
    </SuggestedCard>
  ));
  return (
    <Fragment>
      <SuggestedPeopleContainer>
        <SuggestedPeopleHeader>
          <p>Get To Know people</p>
        </SuggestedPeopleHeader>
        <SuggestedPeopleStyled>{outputSuggestions}</SuggestedPeopleStyled>
      </SuggestedPeopleContainer>
    </Fragment>
  );
};

SuggestedPeople.propTypes = {
  profiles: PropTypes.array.isRequired
}

export default SuggestedPeople;
