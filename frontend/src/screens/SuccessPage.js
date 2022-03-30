import {
  getUserInfo,
  getCartItems,
  setCartItems,
  saveOrder,
  checkOrder,
} from '../localStorage.js';
import { removeFromCart, rerender } from '../utils.js';
import Checkout from '../components/Checkout.js';
import config from '../config.js';
import Axios from 'axios';
import { orders } from '../apis.js';

const addresspage = {
  render,
  afterRender,
};

async function render() {
  const { firstName, id, role } = getUserInfo();
  const items = getCartItems();
  if (!firstName && items.length === 0) {
    location.hash = '/';
  }

  return `
  <header>
      <a href="/#/" class="company">GofonLink</a>
      <ul class="navigation">
        <l1
          ><a href="/#/services"><i class="fas fa-cog"></i>Services</a></l1
        >
        <l1
          ><a href="/#/wallet"><i class="far fa-credit-card"></i>Wallet</a></l1
        >
        <l1
          ><a href="/#/cart"><i class="fas fa-cart-arrow-down"></i>Cart</a></l1
        >
        ${
          !firstName
            ? `<l1
          ><a href="/#/login"><i class="far fa-user"></i>Login</a></l1
        >`
            : firstName && role === 'User'
            ? `<l1
      ><a href="/#/orders"><i class="far fa-user-circle"></i>Hi, ${firstName}</a></l1
    >`
            : `<l1
            ><a href="/#/dashboard"><i class="far fa-user-circle"></i>Hi, ${firstName}</a></l1
          >`
        }
      </ul>
      <div class="search">
        <input type="text" placeholder="Search services and products" />
        <i class="fa fa-search" aria-hidden="true"></i>
      </div>
  </header>
      
  ${await Checkout.render({ step4: true })}

  <div class="address-checkout">
    <form id="summaryForm" class="address-container" >

    
        <div class="success">
          <i class="fas fa-thumbs-up"></i>
          <div>Thank You!</div>
          <p>Delivery date will be sent to your email</p>
        </div>
        <button type="submit" id="shop" class="btn submit-btn span-2">Shop</button>
    </form>
  </div> 
  `;
}

function afterRender() {
  const shop = document.getElementById('shop');
  shop.addEventListener('click', () => {
    document.location.hash = '/';
  });
}

export default addresspage;
