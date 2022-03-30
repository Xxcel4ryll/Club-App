import { getCartItems, setCartItems } from './localStorage';

export const parseRequestURL = () => {
  const url = document.location.hash.toLowerCase();
  const request = url.split('/');
  return {
    resource: request[1],
    id: request[2],
    action: request[3],
  };
};

export const rerender = async (component) => {
  const main = document.querySelector('.dynamic-view');
  main.innerHTML = await component.render();
  await component.afterRender();
};

export const showLoading = () => {
  document.getElementById('loader').classList.add('active');
};

export const hideLoading = () => {
  document.getElementById('loader').classList.remove('active');
};

export const showMessage = (message, callback) => {
  document.getElementById('message-overlay').innerHTML = `
    <span class="fas fa-exclamation-circle"></span>
    <span class="msg">${message}</span>
  `;
  document.getElementById('message-overlay').classList.add('active');

  setTimeout(() => {
    document.getElementById('message-overlay').classList.remove('active');
  }, 2500);

  if (callback) {
    callback();
  }
};

export const failMessage = (message, callback) => {
  document.getElementById('failed-overlay').classList.add('alive');

  document.getElementById('failed-overlay').innerHTML = `
    <span class="fas fa-exclamation-circle"></span>
    <span class="msg">${message}</span>
  `;

  setTimeout(() => {
    document.getElementById('failed-overlay').classList.remove('alive');
  }, 2500);

  if (callback) {
    callback();
  }
};

export const addToCart = (item, forceUpdate = false, cartpage) => {
  let cartItems = getCartItems();
  const existItem = cartItems.find((value) => {
    value.id === item.id;
  });

  if (existItem) {
    if (forceUpdate) {
      cartItems = cartItems.map((value) => {
        value.id === existItem.id ? item : value;
      });
    }
  } else {
    cartItems = [...cartItems, item];
  }
  setCartItems(cartItems);
  if (forceUpdate) {
    rerender(cartpage);
  }
};

export const removeFromCart = (id, CartScreen) => {
  setCartItems(getCartItems().filter((value) => value.id !== id));
  rerender(CartScreen);
};

export const redirectUser = () => {
  document.location.hash = '/dashboard';
};

// ${rows
//   .map(
//     (item, index) =>
//       `
//       ${
//         index < 4 && item.category == 'secondary ads'
//           ? ` <div class="first ad">
//             <img src="img/${item.image}" alt="" />
//           </div>`
//           : ''
//       }`
//   )
//   .join('\n')}
