import { getWallet } from '../apis.js';
import { getUserInfo, getCartItems, setCartItems } from '../localStorage.js';
import { removeFromCart, rerender } from '../utils.js';

function addToCart(item, forceUpdate = false) {
  let cartItems = getCartItems();
  const existItem = cartItems.find((value) => value.id === item.id);

  if (existItem) {
    if (forceUpdate) {
      cartItems = cartItems.map((value) =>
        value.id === existItem.id ? item : value
      );
    }
  } else {
    cartItems = [...cartItems, item];
  }
  setCartItems(cartItems);
  if (forceUpdate) {
    rerender(cartpage);
  }
}

const cartpage = {
  render,
  afterRender,
};

async function render() {
  const { firstName, customerId, role, token } = getUserInfo();
  const { data: wallet } = await getWallet(token);
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
        
  <div class="cart-container">

  <h1>My E-Wallet</h1>


  <div class="cart">

        
            <div class="products">
              <div class="empty">
                <i class="fas fa-wallet cart-empty"></i>
                <h2 >Your E-Wallet Balance is &#8358;${
                  wallet ? wallet.toLocaleString() : 0
                }</h2>
                <p>Purchase items to increase wallet balance</p>
                <p>
                <a href="/#/">
                <i class="fa fa-angle-left"></i>
                Return Shopping
                </a>
                </p>
              </div>  
            </div>
            
           
        
      <div class="cart-total">
        <p>
          <span>Wallet Balance</span>
          <span>&#8358;${wallet ? wallet.toLocaleString() : 0}</span>
        </p>
        <p>
          <span>Total Purchases</span>
          <span>0</span>
        </p>

         

          <a href="/#/">Return Shopping </a>

      </div>

  </div>

</div>

<footer class="footer-container">
      <div class="container">
        <div class="row">
          <div class="footer-col">
            <h4>company</h4>
            <ul>
              <li><a href="#">about us</a></li>
              <li><a href="#">our services</a></li>
              <li><a href="#">privacy policy</a></li>
              <li><a href="#">affiliate program</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>get help</h4>
            <ul>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">shipping</a></li>
              <li><a href="#">returns</a></li>
              <li><a href="#">order status</a></li>
              <li><a href="#">payment options</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>online shop</h4>
            <ul>
              <li><a href="#">watch</a></li>
              <li><a href="#">bag</a></li>
              <li><a href="#">shoes</a></li>
              <li><a href="#">dress</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>follow us</h4>
            <div class="social-links">
              <a href="#"><i class="fab fa-facebook-f"></i></a>
              <a href="#"><i class="fab fa-twitter"></i></a>
              <a href="#"><i class="fab fa-instagram"></i></a>
              <a href="#"><i class="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `;
}

function afterRender() {
  // const qtySelect = document.getElementsByClassName('qty-select');
  // const deleteBtn = document.getElementsByClassName('remove');
  // Array.from(qtySelect).forEach((value) => {
  //   value.addEventListener('change', (e) => {
  //     const matchItem = getCartItems().find((item) => item.id === value.id);
  //     addToCart({ ...matchItem, qty: Number(e.target.value) }, true);
  //   });
  // });
  // Array.from(deleteBtn).forEach((value) => {
  //   value.addEventListener('click', (e) => {
  //     removeFromCart(value.id, cartpage);
  //   });
  // });
}

export default cartpage;
