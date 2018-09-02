import React from 'react'

const PreviewFilter = ({ previewImage, filter, setFilter}) => {
  return (
    <div className="previewFilter" onClick={() => setFilter(filter)}>
      <img src={previewImage} className={filter} alt="preview"/>
      <span>{filter}</span>
    </div>
  )
}

export default PreviewFilter;