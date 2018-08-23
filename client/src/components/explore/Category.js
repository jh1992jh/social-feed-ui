import React from 'react';
import PropTypes from 'prop-types'; 

const Category = ({ category, img , onChooseFilterCategory}) => {
  return (
    <div className="exploreCategory">
      <img src={img} alt="Category" onClick={() => onChooseFilterCategory(category)}/>
      <h4>{category}</h4>
    </div>
  );
};

Category.propTypes = {
  category: PropTypes.string.isRequired,
  // img: PropTypes.string.isRequired,
  onChooseFilterCategory: PropTypes.func.isRequired
}

export default Category;
