import React from 'react';

const ContentItem = ({ img, onAddCurrentImg }) => {
  return (
    <div className="createPostContentItem" onClick={() => onAddCurrentImg(img)}>
      <img src={img} alt="item" />
    </div>
  );
};

export default ContentItem;
