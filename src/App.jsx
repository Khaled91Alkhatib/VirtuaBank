import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';

import { Navbar, Homepage, AllProducts, SingleProduct } from './components/index';
import './App.scss';

import GeneralContext from './contexts/GeneralContext';

function App() {
  const [products, setProducts] = useState([]);
  const [carousel, setCarousel] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [specifications, setSpecifications] = useState({
    sizes: [],
    colors: []
  });

  useEffect(() => {

    const savedCategory = JSON.parse(localStorage.getItem('category'));
    if (savedCategory !== null) {
      setSelectedCategory(savedCategory);
    }

    axios.get('http://localhost:5001/api/products')
      .then((res) => {
        // console.log(res.data.products);
        setProducts(prev => res.data.products);
      });

    axios.get('http://localhost:5001/api/carousel')
      .then((res) => {
        setCarousel(prev => res.data.images);
      });

    axios.get('http://localhost:5001/api/specifications')
      .then((res) => {
        const sizes = res.data.sizes;
        const colors = res.data.colors;
        setSpecifications({ sizes, colors });
      });

  }, []);

  useEffect(() => {
    localStorage.setItem('category', JSON.stringify(selectedCategory));
  }, [selectedCategory]);


  return (
    <>
      <GeneralContext.Provider value={{ products, carousel, selectedCategory, setSelectedCategory, specifications }} >
        <Navbar />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/products/:id' element={<AllProducts />} />
          <Route path='/products/men/:id' element={<SingleProduct />} />
          <Route path='/products/women/:id' element={<SingleProduct />} />
        </Routes>

      </GeneralContext.Provider>
    </>
  );
}

export default App;
