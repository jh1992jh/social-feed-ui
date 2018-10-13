import React from 'react';


const Loading = ({ width, maxHeight }) => {
  return (
    <div className="loading" style={{width: `${width}`, maxHeight: `${maxHeight}`}}>
      <div className="circle1" />
      <div className="circle2" />
      <div className="circle3" />
      <div className="circle4" />
    </div>
  );
};

export default Loading;