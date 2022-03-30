const Axios = require('axios');
const { BasicAuth, mailURL } = process.env;
const link = 'http://localhost:7711/';

module.exports = {
  sendInvite: ({ message, reference }) => {
    console.log(reference);
    Axios.post(
      mailURL,
      {
        name: 'Fred',
        message: `${message} Club please click ${link}${reference} to join`,
        email: 'xxcel4ryll@gmail.com',
      },
      {
        headers: {
          Authorization: `basic ${BasicAuth}`,
        },
      }
    )
      .then(function ({ data }) {
        console.log(data);
      })
      .catch(function (error) {
        console.log({ type: 'failed', error });
      });
  },
};
