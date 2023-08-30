import React, { useContext } from 'react';
import GeneralContext from '../../contexts/GeneralContext';


const AllProducts = () => {
  const { products, selectedCategory } = useContext(GeneralContext);

  // console.log(products)

  const filteredProducts = products.filter(product => (
    (product.category.toLowerCase() === selectedCategory.toLowerCase()) &&
    product.disp
    ));
    // console.log(filteredProducts)

  return (
    <div>
      {filteredProducts.map((product, index) => (
        <div key={index}>
          <div>{product.name}</div>
          {/* <img src={`/images${product.image1}`} alt='image' /> */}
        </div>
      ))}
    </div>
  );
};

export default AllProducts;