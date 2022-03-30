const server = require('./app');
const { seq: DB } = require('./sequelize');

const port = process.env.PORT || 3000;

DB.authenticate()
  .then(() => {
    server.listen(port, () => {
      console.log({
        type: 'success',
        message: '****Server and POSTGRES Connected*****',
      });
    });
  })
  .catch((err) => {
    console.log({
      type: 'danger',
      msg: 'Failed to connect to POSTGRES',
      err: err.toString ? err.toString() : err,
    });
    process.exit(1);
  });
