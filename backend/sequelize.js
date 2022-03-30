const Sequelize = require('sequelize');
require('dotenv').config();

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_NAME,
} = process.env;

const sequelize = new Sequelize({
  database: POSTGRES_NAME,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const seq = sequelize;
const Op = Sequelize.Op;

module.exports = {
  seq,
  Op,
};
