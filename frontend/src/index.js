// import "../public/css/style.css";
import LoginScreen from './screens/LoginPage.js';
import SignUpScreen from './screens/SignUpPage.js';
import ForgotScreen from './screens/ForgotPage.js';
import Dashboard from './screens/Dashboard.js';
import UserScreen from './screens/UserScreen.js';
import ProductsScreen from './screens/ProductPage.js';
import ProfileScreen from './screens/ProfilePage.js';
import AddressBook from './screens/AddressBook.js';
import RevenueScreen from './screens/RevenuePage.js';
import PrivacyScreen from './screens/PrivacyScreen.js';
import CreateScreen from './screens/CreateScreen.js';
import AddressScreen from './screens/Address.js';
import ClubScreen from './screens/ClubPage.js';
import CreateClubScreen from './screens/CreateClubScreen.js';
import MemberScreen from './screens/MemberScreen.js';
import InviteScreen from './screens/InviteScreen.js';
import ErrorScreen from './screens/ErrorPage.js';
import { hideLoading, parseRequestURL, showLoading } from './utils.js';
import { clearUser } from './localStorage.js';

const routes = {
  '/': SignUpScreen,
  '/#': SignUpScreen,
  '/createclub': CreateClubScreen,
  '/login': LoginScreen,
  '/sign-up': SignUpScreen,
  '/forgot': ForgotScreen,
  '/dashboard': Dashboard,
  '/clubs': ClubScreen,
  '/members': MemberScreen,
  '/invite': InviteScreen,
  '/users': UserScreen,
  '/products': ProductsScreen,
  '/profile': ProfileScreen,
  '/book': AddressBook,
  '/privacy': PrivacyScreen,
  '/create': CreateScreen,
  '/revenue': RevenueScreen,
  '/address': AddressScreen,
};

const router = async () => {
  showLoading();

  const request = parseRequestURL();
  const parseUrl =
    (request.resource ? `/${request.resource}` : '/') +
    (request.id ? `/:id` : '') +
    (request.action ? `/${request.action}` : '');
  const screen = routes[parseUrl] ? routes[parseUrl] : ErrorScreen;
  const main = document.querySelector('.dynamic-view');
  main.innerHTML = await screen.render();
  if (screen.afterRender()) await screen.afterRender();

  if (document.getElementById('log-out')) {
    const logOut = document.getElementById('log-out');
    logOut.addEventListener('click', () => {
      clearUser();
    });
  }

  hideLoading();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
