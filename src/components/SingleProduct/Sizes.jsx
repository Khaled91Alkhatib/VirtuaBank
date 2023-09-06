import React, { useContext } from 'react';
import GeneralContext from '../../contexts/GeneralContext';

import './sizes.scss';

const Sizes = ({ onSelectSize, selectedSize, setSelectedSize }) => {
  const { specifications } = useContext(GeneralContext);
  const sizes = specifications.sizes;
  console.log(selectedSize);

  const sizesArray = sizes.map((size) => {

    let className = selectedSize === size.size ? "size-button active-size" : "size-button";
    return (
      <button
        key={size.size}
        className={className}
        onClick={() => setSelectedSize(size.size)}
      >
        {size.size}
      </button>
    );
  });

  return (
    <div className='all-sizes'>
      {sizesArray}
    </div>
  );
};

export default Sizes;