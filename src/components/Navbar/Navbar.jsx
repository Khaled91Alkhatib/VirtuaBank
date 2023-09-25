import React, { useContext, useState } from 'react';
import logo from "../../assets/logo-transparent.png";
import GeneralContext from '../../contexts/GeneralContext';
import { motion } from 'framer-motion';
import { HiMenuAlt4, HiX } from 'react-icons/hi';

import "./Navbar.scss";
import { NavLink, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
library.add(faCartShopping);

const Navbar = () => {
  const { setSelectedCategory, cart } = useContext(GeneralContext);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const logoClick = () => {
    navigate("/");
  };

  const smallMenScreentoggle = () => {
    setToggle(false);
    setSelectedCategory("men");
  };
  const smallWomenScreentoggle = () => {
    setToggle(false);
    setSelectedCategory("women");
  };


  return (
    <div>

      <div className='announcement'>
        Enjoy Our Limited Time Free Shipping!
      </div>

      <div className='main-nav'>

        <div className='logo-category'>
          <img onClick={logoClick} src={logo} alt='Logo' />

          <div className='men-women'>

            <NavLink
              className="button"
              to="/products/men"
              onClick={() => setSelectedCategory("men")}>
              Men
            </NavLink>

            <NavLink
              className="button"
              to="/products/women"
              onClick={() => setSelectedCategory("women")}>
              Women
            </NavLink>

            <button className="button" style={{ paddingRight: "2rem" }}>Contact Us</button>

          </div>
        </div>



        <div className='menu-cart'>

          <div className='app__navbar-menu'>
            <HiMenuAlt4 onClick={() => setToggle(true)} />
            {toggle &&
              <motion.div
                whileInView={{ x: [300, 0] }} /* 300px */
                transition={{ duration: 0.85, ease: 'easeOut' }}
              >
                <HiX onClick={() => setToggle(false)} />
                <ul>
                  <NavLink onClick={smallMenScreentoggle} className='button' to="/products/men">Men</NavLink>
                  <NavLink onClick={smallWomenScreentoggle} className='button' to="/products/women">Women</NavLink>
                  <NavLink onClick={() => setToggle(false)} className='button'>Contact Us</NavLink>
                </ul>
              </motion.div>}
          </div>

          <button className="button"><NavLink style={{ textDecoration: "none" }} to="/cart"><FontAwesomeIcon className='cart-icon' icon="cart-shopping" size="xl" /><span className='badge'>{cart.length}</span></NavLink></button>

        </div>

      </div>
    </div>
  );
};

export default Navbar;