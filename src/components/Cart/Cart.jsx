import React, { useContext } from 'react';
import GeneralContext from '../../contexts/GeneralContext';

import "./Cart.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
library.add(faPlus, faMinus, faTrash);

const Cart = () => {
  const { setCart, cart } = useContext(GeneralContext);
  // console.log(cart);

  let priceBeforeTaxes = 0;
  let itemsInCart = 0;
  cart.map(item => {
    priceBeforeTaxes += item.price * item.quantity;
    // console.log(priceBeforeTaxes)
    itemsInCart += item.quantity;
  });

  const removeClick = (sku, size) => {
    setCart((pre) => pre.filter(item => !(sku === item.sku && size === item.size)));
  };


  return (
    <div>
      {cart.length === 0 ?
        <div className='empty-cart'>
          Your Shopping Cart is Empty!
          <br />
          Browse Our Collection Here...
          <div style={{ textAlign: "center", marginTop: "2em" }}>
            <NavLink to="/products/men"><button style={{ marginRight: "7px" }} className='shop'>Shop Men's</button></NavLink>
            <NavLink to="/products/women"><button className='shop'>Shop Women's</button></NavLink>
          </div>

        </div> :
        <div className='main-cart'>
          <div className='cart-title'>Your Shopping Cart</div>
          <div className='item-count'>{itemsInCart} item{cart.length === 1 ? "" : "s"}</div>
          <table>
            <thead>
              <tr className='headers'>
                <th style={{ width: "70%", textAlign: 'left' }}>Item Description</th>
                <th style={{ textAlign: 'center', padding: '8px' }}>Quantity</th>
                <th style={{ textAlign: 'center', padding: '8px' }}>Price</th>
              </tr>
            </thead>
            <tbody>

              {cart.map((product, index) => (
                <tr key={index}>

                  <td>
                    <div className='image-to-name'>
                      <img className='cart-image' src={`/images/${product.image}`} alt='image' />
                      <div className='name-color-size'>
                        <div className='cart-name'>{product.name}</div>
                        <div className='cart-color'>Color: {product.color}</div>
                        <div className='cart-size'>Size: {product.size}</div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className='quantity-counter'>
                      <button
                        onClick={() => {
                          if (product.quantity > 1) {
                            const updatedItem = cart.map(item => {
                              if (product.sku === item.sku && product.size === item.size) {
                                return {
                                  ...item,
                                  quantity: product.quantity - 1
                                };
                              } else {
                                return { ...item };
                              }
                            });
                            setCart(updatedItem);
                          }
                        }}
                        className='plus-minus'>
                        <FontAwesomeIcon icon="fa-solid fa-minus" size="xs" />
                      </button>
                      <div className='cart-quantity'>{product.quantity}</div>
                      <button
                        onClick={() => {
                          const updatedItem = cart.map(item => {
                            if (product.sku === item.sku && product.size === item.size) {
                              return {
                                ...item,
                                quantity: product.quantity + 1
                              };
                            } else {
                              return { ...item };
                            }
                          });
                          setCart(updatedItem);
                        }}
                        className='plus-minus'>
                        <FontAwesomeIcon icon="fa-solid fa-plus" size="xs" />
                      </button>
                    </div>
                    <div>
                      <button
                        className='remove-item'
                        onClick={() => removeClick(product.sku, product.size)}
                      >
                        <FontAwesomeIcon icon="fa-solid fa-trash" beat size="xs" /> Remove Item
                      </button>
                    </div>
                  </td>

                  <td>
                    <div className='cart-price'>${(product.price * product.quantity).toFixed(2)}</div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
          <div className='taxes-total'>
            <div className='total-before'>
              <div>Total:</div>
              <div>${priceBeforeTaxes.toFixed(2)}</div>
            </div>
            <div className='taxes'>
              <div>Taxes(13%): </div>
              <div>${(priceBeforeTaxes * 0.13).toFixed(2)}</div>
            </div>
            <div className='total'>
              <div>Total Including Taxes: </div>
              <div>${(priceBeforeTaxes + (priceBeforeTaxes * 0.13)).toFixed(2)}</div>
            </div>
            {/* <div className='pay-button'>
                    <PayButton cart={cart} setCart={setCart} />
                  </div> */}
          </div>

        </div>

      }

    </div>
  );
};

export default Cart;