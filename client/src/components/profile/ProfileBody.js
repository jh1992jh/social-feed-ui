import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ProfilePosts from './ProfilePosts';

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
