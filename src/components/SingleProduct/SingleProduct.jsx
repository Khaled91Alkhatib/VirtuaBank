import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import GeneralContext from '../../contexts/GeneralContext';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "./SingleProduct.scss";
import Sizes from './Sizes';

const SingleProduct = () => {
  const [singleProduct, setSingleProduct] = useState([]);
  const { products } = useContext(GeneralContext);
  const [id, setId] = useState(Number(useParams().id));

  const getProductById = (id) => {
    axios.get(`http://localhost:5001/api/products/${id}`)
      .then(res => {
        setSingleProduct(prev => res.data.product);
      });
  };

  console.log(singleProduct);

  useEffect(() => {
    if (products) {
      getProductById(id);
    }
  }, []);

  return (
    <div>
      <div className='main-single-product'>

        <Carousel
          showArrows={false}
          showStatus={false}
          showThumbs={true}
          autoPlay={false}
          infiniteLoop={false}
          interval={5000}>
          <div>
            <img className='slider-images' src={`/images${singleProduct.image1}`} alt="Slide 1" />
          </div>
          <div>
            <img className='slider-images' src={`/images${singleProduct.image2}`} alt="Slide 2" />
          </div>
          <div>
            <img className='slider-images' src={`/images${singleProduct.image3}`} alt="Slide 3" />
          </div>
        </Carousel>

        <div style={{ width: "40%" }}>

          <div className='name-price'>
            <div className='name'>{singleProduct.name}</div>
            <div className='price'>${(singleProduct.price / 100).toFixed(2)}</div>
          </div>

          <div className='style-cat'>{singleProduct.style}</div>
          <div className='sku'>SKU: {singleProduct.sku}</div>
          <div>
            <div className='size'>Size</div>
            <Sizes />
          </div>
        </div>


      </div>
    </div>
  );
};

export default SingleProduct;