import React from 'react';

const Category = ({ category, img }) => {
  return (
    <div className="exploreCategory">
      <img src={img} alt="Category" />
      <h4>{category}</h4>
    </div>
  );
};

export default Category;
