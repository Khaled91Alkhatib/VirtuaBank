import React, { useContext } from 'react';
import logo from "../../assets/logo-transparent.png";
import GeneralContext from '../../contexts/GeneralContext';

import "./Navbar.scss";
import { NavLink, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
library.add(faCartShopping);

const Navbar = () => {
  const { setSelectedCategory, cart } = useContext(GeneralContext);
  const navigate = useNavigate();

  const logoClick = () => {
    navigate("/");
  };

  return (
    <div>

      <div className='announcement'>
        Enjoy Our Limited Time Free Shipping!
      </div>

      <div className='main-nav'>

        <div className='logo-category'>
          <img onClick={logoClick} src={logo} alt='Logo' />

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

          {/* <NavLink className="button">Latest</NavLink> */}

        </div>

        <div>
          <button className="button" style={{ paddingRight: "2rem" }}>Contact Us</button>
          <button className="button"><NavLink style={{ textDecoration: "none" }} to="/cart"><FontAwesomeIcon className='cart-icon' icon="cart-shopping" size="xl" /><span className='badge'>{cart.length}</span></NavLink></button>
        </div>

      </div>
    </div>
  );
};

export default Navbar;