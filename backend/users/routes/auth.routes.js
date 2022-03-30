const router = require('express').Router();
const Validator = require('../../services/validator');
const UsersController = require('../controllers/users.controllers');
const $ = require('express-async-handler');

router.get('/:id', $(UsersController.getUsers));

router
  .route('/')
  .get($(UsersController.fetchUsers))
  .post(Validator(UsersController.createSchema), $(UsersController.createUser));


module.exports = router;