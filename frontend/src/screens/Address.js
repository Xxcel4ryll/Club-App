import {
  getUserInfo,
  getCartItems,
  setCartItems,
  saveAddress,
  getAddress,
} from '../localStorage.js';
import { removeFromCart, rerender } from '../utils.js';
import Checkout from '../components/Checkout.js';
import { userUpdate } from '../apis.js';
const addresspage = {
  render,
  afterRender,
};

async function render() {
  const { firstName, id, role } = getUserInfo();
  const items = getCartItems();

  const { address, state, city, postal } = getAddress();

  if (!firstName || items.length === 0) {
    return (document.location.hash = '/');
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
      
  ${await Checkout.render({ step1: true })}

  <div class="address-checkout">
    <div class="address-container">
      <form id="checkout-form">
        <input
          type="text"
          class="form-input span-2"
          placeholder="${postal || 'Postal'}"
          id="postal-code" required
        />
        <input
          type="text"
          class="form-input span-2"
          placeholder="${city || 'City'}"
          id="city" required
        />
        <input
          type="text"
          class="form-input span-2"
          placeholder="${state || 'State'}"
          id="state" required
        />
        <input type="text" class="form-input span-2"   
        placeholder="${address || 'Address'}"
        id="address" required
        />
        <button class="btn submit-btn span-2">Proceed</button>
      </form>
    </div>
  </div> 

  `;
}

function afterRender() {
  const { role, token } = getUserInfo();
  const addressForm = document.getElementById('checkout-form');

  addressForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const addressInfo = {
      city: document.getElementById('city').value,
      state: document.getElementById('state').value,
      address: document.getElementById('address').value,
      postal: document.getElementById('postal-code').value,
    };

    await saveAddress({ ...addressInfo });

    const result = await userUpdate({ token, role, ...addressInfo });

    if (result.data) {
      document.location.hash = '/summary';
    }
  });
}

export default addresspage;
