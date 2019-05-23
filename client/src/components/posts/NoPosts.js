import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NoPostsStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    color: #0099cc !important;
  }

  p {
    text-align: center;
  }
`;

const NoPosts = ({ message }) => (
  <NoPostsStyled>
    <p>
      {message}
      <br />
      There are no posts
      <br />
      click this link to find some
      <br />
      <Link to="/explore">Explore</Link>
    </p>
  </NoPostsStyled>
);

export default NoPosts;
