import React from 'react';

const Category = ({ category, img , onChooseFilterCategory}) => {
  return (
    <div className="exploreCategory">
      <img src={img} alt="Category" onClick={() => onChooseFilterCategory(category)}/>
      <h4>{category}</h4>
    </div>
  );
};

export default Category;
