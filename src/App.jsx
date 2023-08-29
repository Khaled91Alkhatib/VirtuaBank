import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';

import { Navbar, Homepage } from './components/index';
import './App.scss';

import GeneralContext from './contexts/GeneralContext';

function App() {
  const [products, setProducts] = useState([]);
  const [carousel, setCarousel] = useState([]);

  useEffect(() => {

    axios.get('http://localhost:5001/api/products')
      .then((res) => {
        // console.log(res.data.products);
        setProducts(prev => res.data.products);
      });

    axios.get('http://localhost:5001/api/carousel')
      .then((res) => {
        setCarousel(prev => res.data.images);
      });

  }, []);

  return (
    <>
      <GeneralContext.Provider value={{ products, carousel }} >
        <Navbar />
        <Routes>
          <Route path='/' element={<Homepage />} />
        </Routes>

      </GeneralContext.Provider>
    </>
  );
}

export default App;
