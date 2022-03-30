require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

const customExpress = Object.create(express().response, {
  data: {
    value(data, status = true) {
      return this.type('json').json({
        status,
        data,
      });
    },
  },
  error: {
    value(error, message = 'An error occured') {
      return this.json({
        message,
        statusCode: -3,
        status: false,
        error,
      });
    },
  },
  errorMessage: {
    value(message = 'API response message') {
      return this.json({
        message,
        status: false,
        statusCode: 1,
      });
    },
  },
});

app.response = Object.create(customExpress);

app.use(cors());
app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use(express.json({ limit: '50mb' }));

app.on('error', (err) => {
  console.log(err);
});

const authMiddleware = require('./services/verifytoken');

// users authentication routes
const usersAuthRoutes = require('./users/routes/auth.routes');

const usersRoutes = require('./users/routes/index.routes');

// admin authentication routes
const adminAuthRoutes = require('./admin/routes/auth.routes');

// Members routes
const memberAuthRoutes = require('./members/routes/auth.routes');

// club authentication routes
const clubRoutes = require('./club/routes/index.routes');

const memberRoutes = require('./members/routes/index.routes');

app.get('/', (req, res) =>
  res.send({
    status: 'API Online',
    message: '******CLUB APP CONNECTED******',
  })
);

app.use(
  '/admins',
  adminAuthRoutes,
  authMiddleware({ allowedRoles: ['ADMIN'] })
);

app.use(
  '/users',
  usersRoutes,
  authMiddleware({ allowedRoles: ['ADMIN'] }),
  usersAuthRoutes
);

app.use(
  '/clubs',
  authMiddleware({ allowedRoles: ['USER', 'ADMIN'] }),
  clubRoutes
);

app.use(
  '/members',
  memberRoutes,
  authMiddleware({ allowedRoles: ['USER', 'ADMIN'] }),
  memberAuthRoutes
);

app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err);
  // if (process.env.NODE_ENV === 'development') {
  // }

  if (err.type && err.type === 'entity.parse.failed') {
    res.status(400).errorMessage('Invalid JSON payload passed.');
  } else if (err.toString() === '[object Object]') {
    try {
      res.status(400).error(err);
    } catch {
      res.status(500).error('Server error');
    }
  } else {
    res.status(400).error(err.toString());
  }
});

module.exports = app;
