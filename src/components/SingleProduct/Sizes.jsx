import React, { useContext } from 'react';
import GeneralContext from '../../contexts/GeneralContext';

import './sizes.scss';

const Sizes = () => {
  const { specifications } = useContext(GeneralContext);
  const sizes = specifications.sizes;

  return (
    <div className='all-sizes'>
      {sizes.map((size, index) => (
        <div key={index}>
          <button className='size-button' >{size.size}</button>
        </div>
      ))}
    </div>
  );
};

export default Sizes;