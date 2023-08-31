import React, { useContext, useEffect, useState } from 'react';
import GeneralContext from '../../contexts/GeneralContext';

import "./AllProducts.scss";

const AllProducts = () => {
  const { products, selectedCategory } = useContext(GeneralContext);
  const [onHover, setOnHover] = useState(Array(products.length).fill(false));
  const [isLoading, setIsLoading] = useState(true);

  const styles = [];

  useEffect(() => {
    const loading = setTimeout(() => {
      setIsLoading(false);
    }, 10);

    return () => clearTimeout(loading);
  }, []);

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

  const filteredProducts = products.filter(product => (
    (product.category.toLowerCase() === selectedCategory.toLowerCase()) &&
    product.disp
  ));

  filteredProducts.map(product => {
    if (!styles.includes(product.style)) {
      styles.push(product.style);
    }
  });

  return (
    <div>
      {isLoading ? "Loading..." :
        <div className='title-description'>{selectedCategory.toLowerCase() === "men" ?
          <div>
            <div style={{ fontWeight: "bold", paddingBottom: "5px", fontSize: "18px" }}>Men's All Styles</div>
            <div>Our men's collection includes styles perfect for the office or your next weekend getaway. Shop our wide selection of comfortable men's dress shoes, athleisure and more.</div>
          </div>
          :
          <div>
            <div style={{ fontWeight: "bold", paddingBottom: "5px", fontSize: "18px" }}>Women's All Styles</div>
            <div>In search of your next pair of fashion shoes for women? Browse all of FOOTPRINTS' women's shoes. Whether you're after stylish shoes for women or something a little more practical, you'll find plenty on our website. Find your next new pair of comfortable shoes today.</div>
          </div>
        }
        </div>
      }
      <div className='filter-to-products'>

        <div>Filter By</div>
        <div>
          {styles.map((style, index) => (
            <div key={index}>
              <button>{style}</button>
            </div>
          ))}
        </div>

        <div className='main-products-container'>
          {filteredProducts.map((product, index) => (
            <div className='all-products' key={index}>

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

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

export default AllProducts;