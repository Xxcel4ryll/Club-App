import Axios from 'axios';
import config from './config.js';

export const fetchProduct = async () => {
  try {
    const response = await Axios({
      url: `${config.API_URL}/products`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.statusText !== 'OK') throw new Error(response.data.message);

    return response.data;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};

export const fetchPartners = async () => {
  try {
    const response = await Axios({
      url: `${config.API_URL}/partner`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};

export const fetchUsers = async () => {
  try {
    const response = await Axios({
      url: `${config.API_URL}/users`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};

export const fetchClubs = async ({ token }) => {
  try {
    const response = await Axios({
      url: `${config.API_URL}/clubs`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};

export const fetchMembers = async ({ token }) => {
  try {
    const response = await Axios({
      url: `${config.API_URL}/members`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};

export const getUser = async (id) => {
  try {
    const response = await Axios({
      url: `${config.API_URL}/admins/${id}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};

export const getProduct = async (id) => {
  try {
    const response = await Axios({
      url: `${config.API_URL}/products/${id}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};

export const deleteMember = async ({ memberId, clubId, token }) => {
  try {
    const response = await Axios({
      url: `${config.API_URL}/members/${memberId}`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      data: {
        clubId,
      },
    });

    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};

export const login = async ({ email, password, role }) => {
  try {
    const response = await Axios({
      url: `${config.API_URL}/${role}/login`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email,
        password,
      },
    });

    if (response.statusText !== 'OK') {
      throw new Error(response.data);
    }

    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};

export const createClub = async ({ name, state, city, address, token }) => {
  try {
    const response = await Axios({
      url: `${config.API_URL}/clubs`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      data: {
        name,
        state,
        city,
        address,
      },
    });

    if (response.statusText !== 'OK') {
      throw new Error(response.data);
    }

    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};

export const inviteMember = async ({
  firstName,
  lastName,
  phoneNumber,
  email,
  token,
}) => {
  try {
    const response = await Axios({
      url: `${config.API_URL}/members`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      data: {
        firstName,
        lastName,
        phoneNumber,
        email,
      },
    });

    if (response.statusText !== 'OK') {
      throw new Error(response.data);
    }

    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};

export const signup = async ({
  firstName,
  lastName,
  phoneNumber,
  email,
  password,
}) => {
  try {
    const response = await Axios({
      url: `${config.API_URL}/admins/`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
      },
    });

    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    console.log(response.data.token);
    return response.data;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};

export const accountUpdate = async ({
  firstName,
  lastName,
  phoneNumber,
  email,
  role,
  token,
}) => {
  try {
    const response = await Axios({
      url: `${config.API_URL}/${role}s/account/update`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      data: {
        firstName,
        lastName,
        phoneNumber,
        email,
      },
    });

    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};

export const passwordUpdate = async ({
  oldPassword,
  newPassword,
  confirmPassword,
  role,
  token,
}) => {
  try {
    const response = await Axios({
      url: `${config.API_URL}/${role}s/password/update`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      data: {
        oldPassword,
        newPassword,
        confirmPassword,
      },
    });

    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};

export const createUser = async ({
  firstName,
  lastName,
  phoneNumber,
  password,
  email,
  token,
}) => {
  try {
    const response = await Axios({
      url: `${config.API_URL}/users`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      data: {
        firstName,
        lastName,
        phoneNumber,
        password,
        email,
      },
    });

    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};

export const userUpdate = async ({
  role,
  token,
  address,
  city,
  state,
  postal,
}) => {
  try {
    const response = await Axios({
      url: `${config.API_URL}/${role}s/address/update`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      data: {
        address,
        city,
        state,
        postal,
      },
    });

    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};

export const forgot = async ({ email }) => {
  try {
    const response = await Axios({
      url: `${config.API_URL}/users/forgot/password`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email,
      },
    });

    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};

export const orders = async ({ token, ...order }) => {
  try {
    const response = await Axios({
      url: `${config.API_URL}/orders`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      data: order,
    });

    if (response.statusText !== 'OK') {
      throw new Error(response.data);
    }

    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};

export const getOrders = async (token) => {
  try {
    const response = await Axios({
      url: `${config.API_URL}/orders`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};

export const singleOrder = async (token, id) => {
  try {
    const response = await Axios({
      url: `${config.API_URL}/orders/${id}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};

export const getRevenue = async (token) => {
  try {
    const response = await Axios({
      url: `${config.API_URL}/orders/revenue`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};

export const getWallet = async (token) => {
  try {
    const response = await Axios({
      url: `${config.API_URL}/wallet/balance`,
      method: 'GET',
      headers: {
        'Content-Type': 'appl/ication/json',
        Authorization: token,
      },
    });

    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};

export const debitWallet = async ({ orderId, price, token }) => {
  try {
    const response = await Axios({
      url: `${config.API_URL}/orders/debit`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      data: {
        orderId,
        debitWallet: price,
      },
    });

    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};

export const updateProduct = async ({
  name,
  id,
  price,
  quantity,
  discount,
  token,
}) => {
  try {
    const response = await Axios({
      url: `${config.API_URL}/products`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      data: {
        name,
        id,
        discount,
        price,
        quantity,
      },
    });

    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};

export const specialUpdateProduct = async (token, items) => {
  try {
    const response = await Axios({
      url: `${config.API_URL}/products/update/special`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      data: items,
    });

    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};

export const verifyPayment = async (reference, orderId, price, id) => {
  try {
    const response = await Axios({
      url: `${config.API_URL}/payment`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        reference,
        orderId,
        price,
        id,
      },
    });

    if (response.statusText !== 'OK') {
      throw new Error(response.data);
    }

    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};

export const token = async ({ email, otp, password, confirmPassword }) => {
  try {
    const response = await Axios({
      url: `${config.API_URL}/users/reset/password`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email,
        otp,
        password,
        confirmPassword,
      },
    });

    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};

// const response = new Promise((resolve, reject) => {
// const productInfo = order.rows.map(async (item) => {
//   const newItem = await JSON.parse(item.ordersAndQty);

//   return newItem.filter(async (value) => {
//     const { name } = await ProductModel.findOne({
//       where: {
//         id: value.id,
//       },
//       attributes: ['name'],
//     });

//     if (name) {
//       // productInfo.push(name);
//       return name;
//     }

//     // resolve(name);
//     // resolve(name);
//   });
// });
// // });

// return productInfo;
