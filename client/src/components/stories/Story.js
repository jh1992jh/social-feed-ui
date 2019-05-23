import React from "react";
// import PropTypes from 'prop-types';
import styled from "styled-components";
import Moment from "react-moment";

const OtherStoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 0 0.2em;
  @media (min-width: 1000px) {
    min-width: 24vw;
    height: 8vh;
    padding: 0.5em 0;
    margin: 0.5em 0;
    flex-direction: row;
    justify-content: flex-start;
  }
`;

const OtherStory = styled.div`
  width: 50px;
  height: 50px;

  border: 2px solid orangered;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1000px) {
    height: 48px;
    width: 48px;
    max-height: 12vh;
    display: flex;
    flex-direction: column;

    border: 2px solid orangered;
    border-radius: 100%;
  }
`;

const ForDesktop = styled.ul`
  list-style-type: none;

  @media (max-width: 980px) {
    display: none;
  }
`;

const OtherStoryImg = styled.img`
  height: 48px;
  width: 48px;
  border-radius: 360px;

  @media (min-width: 1000px) {
    border: 2px solid #fff;
    border-radius: 100%;
  }
`;
const ForMobile = styled.p`
  margin: 0;
  margin-top: 0.5em;
  font-size: 0.7rem;

  @media (min-width: 1000px) {
    display: none;
  }
`;

/*const StoryText = styled.p`
color: #222;
font-size: 0.6rem;
text-align: center;
margin-top: -1.5em;
margin-right: 0.5em; 

@media (min-width: 1000px) {
  text-align: left;
  margin-top: 0;
  margin-left: 1em;
}
)
`*/

/* const Story = ({ storyImage, handle }) => {
  return (
    <div>
      <OtherStory>
        {storyImage !== undefined ? <OtherStoryImg src={storyImage} alt="story" /> : null}
        <ForDesktop>
          <li>{handle}</li>
          <Ago className="ago">{new Date().getHours()} HOURS AGO</Ago>
        </ForDesktop>
      </OtherStory>
      <StoryText className="storyText">{handle}</StoryText>
    </div>
  );
}; */

const Story = ({ storyImage, handle, date }) => {
  return (
    <OtherStoryContainer>
      <OtherStory>
        {storyImage !== undefined ? (
          <OtherStoryImg src={storyImage} alt="Story" />
        ) : null}
      </OtherStory>
      <ForDesktop>
        <li>{handle}</li>
        <Moment fromNow className="ago">
          {date}
        </Moment>
      </ForDesktop>
      <ForMobile>{handle}</ForMobile>

      {/* <StoryText>{handle}</StoryText> REMEMBER TO ADD THE STORY HANDLE FOR MOBILE*/}
    </OtherStoryContainer>
  );
};

/* Story.propTypes = {
  storyImage: PropTypes.string.isRequired,
  handle: PropTypes.string.isRequired
} */

export default Story;
