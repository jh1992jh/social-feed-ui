import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const ProfilePostsStyled = styled.div`
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

const ProfilePosts = ({ownedPosts}) => (
    <ProfilePostsStyled>
            {
                ownedPosts.map(post => (
                    <ProfilePost key={post._id}>
                    <Link to={`/post/${post._id}`}>
                      <img src={post.postImage} className={post.filter !== 'none' ? post.filter : null} alt="postImg" />
                    </Link>
                    </ProfilePost>
                  ))
            }
        </ProfilePostsStyled>
)

export default ProfilePosts;