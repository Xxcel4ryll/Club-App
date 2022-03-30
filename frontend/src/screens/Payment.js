import {
  getUserInfo,
  clearCart,
  getCartItems,
  setCartItems,
  clearOrder,
  checkOrder,
} from '../localStorage.js';
import {
  failMessage,
  removeFromCart,
  rerender,
  showMessage,
} from '../utils.js';
import Checkout from '../components/Checkout.js';
import config from '../config.js';
import Axios from 'axios';
import {
  debitWallet,
  getWallet,
  specialUpdateProduct,
  verifyPayment,
} from '../apis.js';

const addresspage = {
  render,
  afterRender,
};

async function render() {
  const { firstName, role, id } = getUserInfo();
  const items = getCartItems();
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
      
  ${await Checkout.render({ step3: true })}

  <div class="address-checkout">
    <form id="paymentForm" class="address-container" >
      <div class="radio">
      <label>  
        <input
          type="radio"
          name="pay-method"
          id="pay"
          required
          value="card"
        />
        Bank account</label>

        <label>
        <input
          type="radio"
          name="pay-method"
          id="pay"
          required
          value="wallet"
        />
         Wallet</label>

      </div>  

        <button type="submit" class="btn submit-btn span-2">Pay Now</button>
    </form>
    
  </div> 
  `;
}

function afterRender() {
  const paymentBtn = document.getElementById('paymentForm');
  const items = getCartItems();
  const { orderId } = checkOrder();
  const { email, customerId, token } = getUserInfo();
  const price = items.reduce((acc, value) => acc + value.price * value.qty, 0);

  const neededItem = items.map((value) => {
    return { qty: value.qty, id: value.id };
  });

  paymentBtn.addEventListener('submit', checkPayMethod, false);
  function checkPayMethod(e) {
    e.preventDefault();
    const payMethod = document.querySelector(
      'input[name="pay-method"]:checked'
    ).value;

    if (payMethod === 'card') {
      payWithPaystack();
    } else {
      payFromWallet();
    }
  }
  async function payFromWallet() {
    const { data: wallet } = await getWallet(customerId, token);

    if (wallet >= price) {
      const result = await debitWallet({ orderId, price, token });
      if (result) {
        clearCart();
        clearOrder();
        location.hash = '/success';
        return showMessage('Product successfully purchase');
      }
    }

    failMessage('Insufficient wallet balance');
  }
  function payWithPaystack() {
    const handler = PaystackPop.setup({
      key: `${config.PAYSTACK_PUBLIC_KEY}`,
      email,
      amount: `${price}00`,
      currency: 'NGN',
      ref: Math.floor(Math.random() * 1000) * 9000,
      callback: async (response) => {
        const reference = response.reference;
        const payment = await verifyPayment(
          reference,
          orderId,
          price,
          customerId
        );

        if (payment) {
          await specialUpdateProduct(token, neededItem);
          location.hash = '/success';
          clearCart();
          clearOrder();
        }
        // : [(location.hash = '/failed')];
      },
      onClose: () => {
        failMessage('Cancelled, please try again');
      },
    });
    handler.openIframe();
  }
}

export default addresspage;
