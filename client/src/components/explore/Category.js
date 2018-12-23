import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'; 

const ExploreCategory = styled.div`
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

const Category = ({ category, img , onChooseFilterCategory}) => {
  return (
    <ExploreCategory>
      <img src={img} alt="Category" onClick={() => onChooseFilterCategory(category)}/>
      <h4>{category}</h4>
    </ExploreCategory>
  );
};

Category.propTypes = {
  category: PropTypes.string.isRequired,
  onChooseFilterCategory: PropTypes.func.isRequired
}

export default Category;
