import React, { useContext, useEffect, useState } from 'react';
import GeneralContext from '../../contexts/GeneralContext';
import { NavLink, useNavigate } from 'react-router-dom';


import "./RecommendedProducts.scss";

const RecommendedProducts = ({ singleProduct, category, setSingleProduct }) => {
  const { products } = useContext(GeneralContext);
  const [onHover, setOnHover] = useState(Array(4).fill(false));
  const [randomProducts, setRandomProducts] = useState([]);
  const history = useNavigate();

  const mouseEnterImage = (index) => {
    const updatedOnHover = [...onHover];
    updatedOnHover[index] = true;
    setOnHover(updatedOnHover);
  };
  const mouseLeaveImage = (index) => {
    const updatedOnHover = [...onHover];
    updatedOnHover[index] = false;
    setOnHover(updatedOnHover);
  };

  useEffect(() => {
    if (!singleProduct || !singleProduct.category) {
      return;
    }

    const recommendedProducts = products.filter(product =>
      product.category.toLowerCase() === singleProduct.category.toLowerCase()
    );

    const shuffledProducts = [...recommendedProducts].sort(() => Math.random() - 0.5);

    const selectedProducts = shuffledProducts.slice(0, 4);

    setRandomProducts(selectedProducts);
  }, [singleProduct, products]);

  // console.log(randomProducts)
  return (
    <div>

      <h3 className='customer-viewed'>Customers Also Viewed</h3>
      <div className='recommended-products-container'>
        {randomProducts.map((product, index) => (
          <div className='all-products' key={index}>
            <NavLink className="product-navlink" onClick={() => {
              setSingleProduct(product);
              history.push(`/products/${category.toLowerCase()}/${product.id}`);
            }}
              to={`/products/${category.toLowerCase()}/${product.id}`}>

              <div>
                <img
                  src={!onHover[index] ? `/images${product.image1}` : `/images${product.image2}`}
                  alt='image'
                  onMouseEnter={() => mouseEnterImage(index)}
                  onMouseLeave={() => mouseLeaveImage(index)}
                />
              </div>

              <div className='name-price'>
                <div className='product-name'>{product.name}</div>
                <div className='product-price'>${(product.price / 100).toFixed(2)}</div>
              </div>

              <div className='product-category'>{product.category}</div>
            </NavLink>

          </div>
        ))}
      </div>

    </div>
  );
};

export default RecommendedProducts;