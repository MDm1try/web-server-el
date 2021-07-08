/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_NAME,
    host: 'localhost',
    dialect: 'postgres',
  },
  production: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_NAME,
    host: 'localhost',
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
  },
};
