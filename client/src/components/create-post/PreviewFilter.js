import React from 'react'
import styled from 'styled-components';

const PreviewFilterStyled = styled.div`
    margin: 0 0.5em;
    text-align: center;

    img {
      height: 100px;
      width: 100px;
    }
`;

const PreviewFilter = ({ previewImage, filter, setFilter}) => {
  return (
    <PreviewFilterStyled onClick={() => setFilter(filter)}>
      <img src={previewImage} className={filter} alt="preview"/>
      <span>{filter}</span>
    </PreviewFilterStyled>
  )
}

export default PreviewFilter;