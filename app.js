import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const morgan = require('morgan');

require('dotenv').config();

import winston from './config/winston';
import api from './controllers/api/v1';
import { verifyToken } from './helpers/auth';

const app = express();

app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  morgan('combined', {
    skip: (req) => req.originalUrl === '/',
    stream: {
      write: function (msg) {
        winston.info(msg);
      },
    },
  })
);

app.use('/api/v1', api);

app.get('/', function (req, res) {
  console.log(
    verifyToken(
      'eyJhbGciOiJIUzUxMiJ9.eyJuYW1lIjoiTURtMXRyeSIsImVtYWlsIjpudWxsLCJwaWN0dXJlIjoiaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzI5NjU2MDg2P3Y9NCIsInN1YiI6IjEiLCJpYXQiOjE2Mjk2Njc4NTgsImV4cCI6MTYzMjI1OTg1OH0.5fLgDSygqc2oNhqAJ9awxBX748WoJ0-v_Q4mu-IyOqQXgXjuZWKvCa_GGIasRImWQy4zNrY87eJ1RPOtcjp-gg'
    )
  );
  res.status(200).send();
});

// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
  winston.error(
    `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip} - Error: ${err.stack}`
  );

  return res.status(500).json({ message: 'Internal server error' });
});

export default app;
