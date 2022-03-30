const router = require('express').Router();
const Validator = require('../../services/validator');
const UsersController = require('../controllers/users.controllers');
const $ = require('express-async-handler');

router.route('/').get($(UsersController.fetchUsers));

router.post(
  '/login',
  Validator(UsersController.loginSchema),
  $(UsersController.loginUser)
);

module.exports = router;
