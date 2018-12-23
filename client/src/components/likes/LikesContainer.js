import React from 'react';
import styled from 'styled-components';

const LikesContainerStyled = styled.div`
  margin: 3em 0;
`;

const LikesContainer = ({ children }) => (
  <LikesContainerStyled>{children}</LikesContainerStyled>
)


export default LikesContainer;
