import React, { useContext, useEffect, useState } from 'react';
import GeneralContext from '../../contexts/GeneralContext';

import "./AllProducts.scss";
import { NavLink } from 'react-router-dom';

const AllProducts = () => {
  const { products, selectedCategory } = useContext(GeneralContext);
  const [onHover, setOnHover] = useState(Array(products.length).fill(false));
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStyle, setSelectedStyle] = useState("");
  const [searchText, setSearchText] = useState("");

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

  const filteredProducts = products.filter(product => {
    if (selectedStyle === "" && searchText === "") {
      return (product.category.toLowerCase() === selectedCategory.toLowerCase()) &&
        product.disp;
    } else if (selectedStyle !== "") {
      return (product.category.toLowerCase() === selectedCategory.toLowerCase()) &&
        product.disp && product.style === selectedStyle;
    } else if (searchText !== "") {
      return (product.category.toLowerCase() === selectedCategory.toLowerCase()) &&
        product.disp &&
        product.name.toLowerCase().includes(searchText.toLowerCase());
    }
  });

  filteredProducts.map(product => {
    if (!styles.includes(product.style)) {
      styles.push(product.style);
    }
  });

  const handleStyleChange = (event) => {
    const currentStyle = event.target.value;
    setSelectedStyle((prev) => prev === currentStyle ? "" : currentStyle);
  };

  // useEffect(() => {
  //   console.log(products);
  //   console.log(selectedStyle);
  //   console.log(searchText);
  // }, [products, selectedStyle, searchText]);

  return (
    <div>
      {isLoading ? "Loading..." :
        <div className='title-description'>{selectedCategory.toLowerCase() === "men" ?
          <div>
            <div style={{ fontWeight: "bold", paddingBottom: "5px", fontSize: "18px", textAlign: "center" }}>Men's All Styles</div>
            <div style={{textAlign:"center"}}>Our men's collection includes styles perfect for the office or your next weekend getaway. Shop our wide selection of comfortable men's dress shoes, athleisure and more.</div>
          </div>
          :
          <div>
            <div style={{ fontWeight: "bold", paddingBottom: "5px", fontSize: "18px", textAlign: "center" }}>Women's All Styles</div>
            <div style={{textAlign:"center"}}>In search of your next pair of fashion shoes for women? Browse all of FOOTPRINTS' women's shoes. Whether you're after stylish shoes for women or something a little more practical, you'll find plenty on our website. Find your next new pair of comfortable shoes today.</div>
          </div>
        }
        </div>
      }
      <div className='filter-to-products'>

        <div className='filter-column'>

          <input
            type='text'
            placeholder='Search Products...'
            className='search-bar'
            onChange={(e) => { setSearchText(e.target.value); }}
            value={searchText}
          />

          <div className='filter-title'>Filter By</div>
          <div className='styles'>
            <div className='sub-filter'>Styles</div>
            {styles.sort((a, b) => a[0].localeCompare(b[0])).map((style, index) => (
              <div className='all-styles' key={index}>
                <input
                  className='input'
                  type='checkbox'
                  name='style'
                  value={style}
                  checked={selectedStyle === style}
                  onChange={handleStyleChange}
                /> {style}
              </div>
            ))}
          </div>

        </div>

        <div className='main-products-container'>
          {filteredProducts.map((product, index) => (
            <div className='all-products' key={index}>
              <NavLink className="product-navlink" to={`${product.id}`}>

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

    </div>
  );
};

export default AllProducts;