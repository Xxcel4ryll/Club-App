import { forgot } from '../apis.js';
import { getUserInfo, saveUserInfo } from '../localStorage.js';
import {
  failMessage,
  hideLoading,
  showLoading,
  showMessage,
} from '../utils.js';

const forgotpage = {
  render,
  afterRender,
};

async function render() {
  const { firstName, role } = await getUserInfo();

  if (firstName) {
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

<div class="forgot-container">
      <div class="wrapper">
        <div class="title"><span>Reset Password</span></div>
        <form action="#" id="forgot-form">
          <div class="row">
            <i class="fas fa-user"></i>
            <input type="email" id="email" placeholder="Email Address" required>
          </div>
          
          <div class="row button">
            <input type="submit" value="Send Password Reset">
          </div>
          
        </form>
      </div>
    </div>

  `;
}

function afterRender() {
  const forgotForm = document.getElementById('forgot-form');

  if (forgotForm) {
    forgotForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const user = await forgot({
        email: document.getElementById('email').value,
      });

      if (user.error) {
        failMessage('User doesnt exist');
      } else {
        // console.log(user);
        saveUserInfo({ ...user.data });
        location.hash = '/otp';
      }
    });
  }
}

export default forgotpage;
