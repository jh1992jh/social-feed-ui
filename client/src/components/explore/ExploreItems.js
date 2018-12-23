import React from 'react';
import styled from 'styled-components';

const ExploreItemsStyled = styled.div`
  margin-bottom: 3.1em;
  margin-top: 0.1em;
  display: flex;
  flex-wrap: wrap;

  img {
    width: 33vw;
    height: 33vw;
  }

  :nth-child(18n + 2),
  :nth-child(18n + 2)img {
    width: 66vw;
    height: 66vw;
  }

  :nth-child(18n + 10),
  :nth-child(18n + 10) img {
    width: 66vw;
    height: 66vw;
  }

  :nth-child(18n + 3) {
    margin-top: -33vw;
  }

  :nth-child(18n + 15) {
    margin-top: -33vw;
  }

  :nth-child(18n + 4) {
    margin-left: -33vw;
  }

  :nth-child(18n + 14) {
    margin-right: -33vw;
  }
`

const ExploreItems = ({children}) => (
    <ExploreItemsStyled>
        {children}
    </ExploreItemsStyled>
)

export default ExploreItems;