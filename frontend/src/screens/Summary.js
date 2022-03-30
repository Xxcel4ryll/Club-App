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
  if (!firstName || items.length === 0) {
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
      
  ${await Checkout.render({ step2: true })}

  <div class="address-checkout">
    <form id="summaryForm" class="address-container" >

      ${items
        .map(
          (item) =>
            `
              ${` 
              <div class="item-summary ">
                <img src="${item.primaryImage}"  />
                <p>Product Name: ${item.name}</p>
                <p>Quantity: ${item.qty}</p>
                <p>Product Price: &#8358; ${item.price.toLocaleString()}</p>
              </div> 
              `}`
        )
        .join('\n')}
        

        <button type="submit" class="btn submit-btn span-2">Checkout</button>
    </form>
  </div> 

  
  `;
}

function afterRender() {
  const addressBtn = document.getElementById('summaryForm');
  addressBtn.addEventListener('submit', async (e) => {
    e.preventDefault();
    const items = getCartItems();
    const user = getUserInfo();
    const price = items.reduce(
      (acc, value) => acc + value.price * value.qty,
      0
    );

    const order = {
      customerId: user.customerId,
      customerEmail: user.email,
      orders: items.map((item) => item.id),
      ordersAndQty: items.map((item) => {
        return {
          id: item.id,
          quantity: item.qty,
        };
      }),
      totalItems: items.reduce((acc, value) => acc + value.qty, 0),
      quantity: items.length,
      price,
      paymentStatus: 'PENDING',
    };

    const { orderId } = checkOrder();
    const { status, data } = await orders({
      token: user.token,
      orderId,
      ...order,
    });

    if (status) {
      saveOrder({
        orderId: data.id || data.orderId,
        customerId: data.customerId,
      });
      document.location.hash = '/payment';
    }
  });
}

export default addresspage;
