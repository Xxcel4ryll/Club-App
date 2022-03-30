import { token } from '../apis.js';
import { getUserInfo, saveUserInfo } from '../localStorage.js';
import { showMessage } from '../utils.js';
import { bootstrap } from '../utils/styles-loader.js';

const forgotpage = {
  render,
  afterRender,
};

async function render() {
  const { firstName, email, role } = await getUserInfo();

  if (firstName) {
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

<div class="forgot-container">
      <div class="wrapper">
        <div class="title"><span>Reset Password</span></div>
        <div class="reset-msg">An OTP has been sent your email address</div>
        <form id="otp-page">
          <div class="row">
            <i class="fas fa-user"></i>
            <input type="text" placeholder="Email Address" value="${email}" id="email" disabled required>
          </div>

          <div class="row">
            <i class="fas fa-user"></i>
            <input type="number" id="otp" placeholder="OTP" required>
          </div>

          <div class="row">
            <i class="fas fa-user"></i>
            <input type="password" id="password" placeholder="New Password" required>
          </div>

          <div class="row">
            <i class="fas fa-user"></i>
            <input type="password" id="password2" placeholder="Confirm Password" required>
          </div>
          
          <div class="row button">
            <input type="submit" value="Reset Password ">
          </div>
          
        </form>
      </div>
    </div>
  `;
}

function afterRender() {
  const otpForm = document.getElementById('otp-page');

  if (otpForm) {
    otpForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const user = await token({
        email: document.getElementById('email').value,
        otp: document.getElementById('otp').value,
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('password2').value,
      });

      if (user.error) {
        showMessage('Invalid OTP');
      } else {
        location.hash = '/login';
      }
    });
  }
}

export default forgotpage;
