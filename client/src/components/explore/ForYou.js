import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ForYouStyled = styled.div`
border: 1px solid #808080;
border-radius: 8px;
max-height: 50px;
min-width: 70px;
padding: 0.1em;
margin: 0 0.3em;
display: flex;
justify-content: center;
align-items: center;
position: relative;

img {
  height: calc(50px + 0.2em);
  width: calc(70px + 0.2em);
  border-radius: 8px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}

h4 {
  text-align: center;
  color: #fff;
  position: absolute;
  font-size: 0.85rem;
  z-index: 1030;
`

const RoundedProfPic = styled.div`
    height: 20px;
    width: 20px;
    border: 1px solid #fff;
    border-radius: 360px;
    z-index: 1030;
    position: relative;
    margin-bottom: 0.5em;

    img  {
      filter: blur(2px);
      height: calc(50px + 0.2em);
      width: calc(70px + 0.2em);
      border-radius: 8px;
      position: absolute;
      top: 0em;
      left: 0;
      z-index: 0;
    }
`

const ForYou = ({ img, profileImage }) => {
  return (
    <ForYouStyled>
      <RoundedProfPic>
        <img src={profileImage} alt="profImg" />
      </RoundedProfPic>
      <img src={profileImage} alt="For you" />
      <h4>For You</h4>
    </ForYouStyled>
  );
};

ForYou.propTypes = {
  profileImage: PropTypes.string.isRequired
}

export default ForYou;
