import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ProfilePosts from './ProfilePosts';

const ProfileBodyStyled = styled.div`
width: 100vw;
display: grid;
grid-template-columns: repeat(3, 1fr);
margin-bottom: 3.1em;

@media (min-width: 1000px) {
    margin: 1em auto;
    width: 80vw;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1em;
}
`

const ProfilePost = styled.div`
height: 33vw;
img {
  height: 33.3vw;
  width: 33.3vw;
}

@media (min-width: 1000px) {
  height: 20vw;
img {
  height: 20vw;
  width: 20vw;
}
}
`

const NoPosts = styled.div`
display: flex;
min-width: 100%;

justify-content: center;
padding: 5em 0;
text-align: center;

`;


const ProfileBody = ({ ownedPosts }) => {
    if(ownedPosts.length > 0) {
      return <ProfilePosts ownedPosts={ownedPosts} />
    } else {
      return (
        <NoPosts>
        
        <p>User has no posts yet</p>
        </NoPosts>
      )
    }
};

ProfileBody.propTypes = {
  ownedPosts: PropTypes.array.isRequired
}

export default ProfileBody;
