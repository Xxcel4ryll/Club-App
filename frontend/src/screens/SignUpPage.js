import { login, signup } from '../apis.js';
import { getUserInfo, saveUserInfo } from '../localStorage.js';
import {
  showLoading,
  hideLoading,
  showMessage,
  redirectUser,
  failMessage,
} from '../utils.js';
import { bootstrap } from '../utils/styles-loader.js';

const signupscreen = {
  render,
  afterRender,
};

function render() {
  // if (getUserInfo().firstName) {
  //   redirectUser();
  // }

  return `
  <header>
  <a href="/#/" class="company">Club Management</a>
  <ul class="navigation">
    <l1
      ><a href="/#/services"><i class="fas fa-cog"></i>Services</a></l1
    >
    
    <l1
      ><a href="/#/login"><i class="far fa-user"></i>Login</a></l1
    >
  </ul>
  <div class="search">
    <input type="text" placeholder="Search services and products" />
    <i class="fa fa-search" aria-hidden="true"></i>
  </div>
</header>
<main class="account-container ">
  <section class="sign-in-container sign-up-mode">
    <div class="signin-signup">
      <form action="" id="login" class="sign-in-form">
        <h2 class="title">Sign In</h2>
        <div class="input-field">
          <i class="fas fa-envelope"></i>
          <input type="text" required id="email" placeholder="Email" />
        </div>
        <div class="input-field">
          <i class="fas fa-lock"></i>
          <input type="password" required id="password" placeholder="Password" />
        </div>
        
        <select name="role" required id="role" class="input-role">
              <option selected disabled value="">ROLE</option>
              <option name="role" value="users">USER</option>
              <option name="role" value="admins">ADMIN</option>
            </select>
        <input type="submit" value="Login" class="btn" />
        <p class="account-text">
          Dont have an account?
          <a id="sign-up-btn2">Sign Up</a>
        </p>
      </form>

      <form action="" class="sign-up-form" id="signUp">
        <h2 class="title">Sign Up</h2>
        <div class="input-field">
          <i class="fas fa-user"></i>
          <input type="text" id="first-Name" required placeholder="First Name" />
        </div>
        <div class="input-field">
          <i class="fas fa-user"></i>
          <input type="text" id="last-Name" required placeholder="Last Name" />
        </div>
        <div class="input-field">
          <i class="fas fa-envelope"></i>
          <input type="text" id="email-fatty" required placeholder="Email" />
        </div>
        <div class="input-field">
          <i class="fas fa-user"></i>
          <input type="text" id="phone" required placeholder="Mobile Number" />
        </div>
        <div class="input-field">
          <i class="fas fa-lock"></i>
          <input type="password" id="password-lock" required placeholder="Password" />
        </div>
        <input type="submit" value="Submit" class="btn" />
        <p class="account-text">
          Already have an account?
          <a id="sign-in-btn2">Sign In</a>
        </p>
      </form>
    </div>
    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content">
          <h3>Already have an account?</h3>
          <p>Sign In here to continue</p>
          <button class="btn" id="sign-in-btn">Sign In</button>
          <img src="img/signin.svg" alt="" class="image" />
        </div>
      </div>
      <div class="panel right-panel">
        <div class="content">
          <h3>Don't have an account?</h3>
          <p>Create an account to begin</p>
          <button class="btn" id="sign-up-btn">Sign up</button>
          <img src="img/signup.svg" alt="" class="image" />
        </div>
      </div>
    </div>
  </section>
</main>



  `;
}

function afterRender() {
  const signInBtn = document.querySelector('#sign-in-btn');
  const signUpBtn = document.querySelector('#sign-up-btn');
  const signInBtn2 = document.querySelector('#sign-in-btn2');
  const signUpBtn2 = document.querySelector('#sign-up-btn2');
  const container = document.querySelector('.sign-in-container');

  signUpBtn.addEventListener('click', () => {
    container.classList.add('sign-up-mode');
  });

  signInBtn.addEventListener('click', () => {
    container.classList.remove('sign-up-mode');
  });

  signUpBtn2.addEventListener('click', () => {
    container.classList.add('sign-up-mode2');
  });

  signInBtn2.addEventListener('click', () => {
    container.classList.remove('sign-up-mode2');
  });

  const signForm = document.getElementById('signUp');
  const loginForm = document.getElementById('login');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const user = await login({
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        role: document.getElementById('role').value,
      });
      if (user.error) {
        failMessage('email or password incorrect');
      } else {
        saveUserInfo({ ...user.data, customerId: user.id || user.customerId });
        showMessage('Login Successful');
        redirectUser();
      }
    });
  }

  if (signForm) {
    signForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const user = await signup({
        email: document.getElementById('email-fatty').value,
        firstName: document.getElementById('first-Name').value,
        lastName: document.getElementById('last-Name').value,
        password: document.getElementById('password-lock').value,
        phoneNumber: document.getElementById('phone').value,
      });
      if (user.error) {
        failMessage('email or password incorrect');
      } else {
        showMessage('account successfully created');
        saveUserInfo({ ...user.data });
        redirectUser();
      }
    });
  }
}

export default signupscreen;
