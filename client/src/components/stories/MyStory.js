import React from "react";
import { Link } from "react-router-dom";
// import PropTypes from 'prop-types';
import styled from "styled-components";

const MyStoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 1000px) {
    min-width: 100%;
    height: 12vh;
    padding: 0.5em;
    margin: 0.5em 0;
    flex-direction: row;
  }
`;

const MyStoryStyled = styled.div`
  width: 70px;
  height: 70px;

  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1000px) {
    height: 48px;
    width: 48px;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
  }
`;

const MyStoryImg = styled.img`
  width: 100%;
  height: 100%;
  max-height: 100%;
  border-radius: 100%;
`;

const ForDesktop = styled.ul`
  list-style-type: none;

  li {
    font-weight: 550;
    font-size: 0.8rem;
    text-align: center;
  }

  a {
    color: #0099cc !important;
  }
  @media (max-width: 980px) {
    display: none;
  }
`;

const ForMobile = styled.p`
  margin: 0;
  margin-top: 0.5em;
  font-size: 0.7rem;

  a {
    color: #0099cc;
  }
  @media (min-width: 1000px) {
    display: none;
  }
`;

const MyStory = ({ handle, profileImage }) => {
  return (
    <MyStoryContainer>
      <MyStoryStyled>
        {profileImage !== undefined ? (
          <MyStoryImg src={profileImage} alt="Story" />
        ) : null}
      </MyStoryStyled>
      <ForDesktop>
        <li>{handle}</li>
        <Link to="/create-story">Create a Story</Link>
      </ForDesktop>
      <ForMobile>
        <Link to="/create-story">Create</Link>
      </ForMobile>

      <br />
      {/* <MyStoryText>{handle}</StoryText> REMEMBER TO ADD THE STORY HANDLE FOR MOBILE*/}
    </MyStoryContainer>
  );
};

/* MyStory.propTypes = {
  handle: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired
} */

export default MyStory;
