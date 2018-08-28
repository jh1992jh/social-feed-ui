import React from 'react';
import spinner from './spinner.gif';

export default ({ width }) => {
  return (
    <div>
      <img
        src={spinner}
        style={{ width: `${width}`, margin: 'auto', display: 'block', background: 'transparent' }}
        alt="Loading..."
      />
    </div>
  );
};
