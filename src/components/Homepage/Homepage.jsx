import React from 'react';

import Carousel from './Carousel';
import "./Homepage.scss";

const Homepage = () => {
  return (

    <div>

      <div className='main-image-container'>
        <img className='main-image' src="/main-image.png" alt='image' />
      </div>

      <div>
        <h2 className='slogan'>“Nother day, ‘nother great pair of kicks from FOOTPRINTS!”</h2>
        <button style={{ marginRight: "7px" }} className='shop'>Shop Men's</button>
        <button className='shop'>Shop Women's</button>
      </div>

      <Carousel />

      <div className='boot-care'>
        <h2>Complimentary Boot Care Service</h2>
        <div className='boot-care'>
          Complimentary boot cleaning, polishing and conditioning service is available at our
          locations for our customers. (even if you purchased your boots from another retailer!).<br /><br />

          Please note the cleaning portion of this service applies to the upper of the boots
          only and not the sole. Please ensure the soles of your dropped-off boots are free of mud,
          debris and other organic material.<br /><br />

          This service is now a drop-off service with a 24 to 72-hour turnaround to allow adequate
          time for us to take care of your boots. Please limit boots to 3 pairs per customer at a time.
          We encourage you to call the store before you drop by to double-check they have capacity and to
          avoid disappointment.
        </div>
      </div>

    </div>

  );
};

export default Homepage;