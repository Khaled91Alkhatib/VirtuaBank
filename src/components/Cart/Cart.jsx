import React, { useContext } from 'react';
import GeneralContext from '../../contexts/GeneralContext';

import "./Cart.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
library.add(faPlus, faMinus);

const Cart = () => {
  const { setCart, cart } = useContext(GeneralContext);
  console.log(cart);

  return (
    <div className='main-cart'>
      <div className='cart-title'>Your Shopping Cart</div>
      <div className='item-count'>{cart.length} item{cart.length === 1 ? "" : "s"}</div>
      <table>
        <thead>
          <tr className='headers'>
            <th style={{ width: "70%" }}>Item Description</th>
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
              </td>

              <td>
                <div className='cart-price'>${(product.price * product.quantity).toFixed(2)}</div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default Cart;