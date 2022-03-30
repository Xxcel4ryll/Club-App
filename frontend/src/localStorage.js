export const saveUserInfo = ({
  customerId = '',
  firstName = '',
  lastName = '',
  email = '',
  role = '',
  token = '',
  phoneNumber = '',
}) => {
  localStorage.setItem(
    'userInfo',
    JSON.stringify({
      customerId,
      firstName,
      lastName,
      email,
      role,
      token,
      phoneNumber,
    })
  );
};

export const saveAddress = ({
  postal = '',
  city = '',
  state = '',
  address = '',
}) => {
  localStorage.setItem(
    'addressInfo',
    JSON.stringify({
      postal,
      city,
      state,
      address,
    })
  );
};

export const saveOrder = ({ orderId = '', customerId = '' }) => {
  localStorage.setItem(
    'orderInfo',
    JSON.stringify({
      orderId,
      customerId,
    })
  );
};

export const setCartItems = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const getUserInfo = () => {
  return localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : { firstName: '', email: '', password: '' };
};

export const checkOrder = () => {
  return localStorage.getItem('orderInfo')
    ? JSON.parse(localStorage.getItem('orderInfo'))
    : { orderId: '', customerId: '' };
};

export const getAddress = () => {
  return localStorage.getItem('addressInfo')
    ? JSON.parse(localStorage.getItem('addressInfo'))
    : [];
};

export const getCartItems = () => {
  return localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];
};

export const clearUser = () => {
  localStorage.removeItem('userInfo');
  document.location = '/';
};

export const clearCart = () => {
  return localStorage.removeItem('cartItems');
};

export const clearOrder = () => {
  return localStorage.removeItem('orderInfo');
};
