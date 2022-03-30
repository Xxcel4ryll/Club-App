const router = require('express').Router();
const Validator = require('../../services/validator');
const AdminController = require('../controllers/admin.controllers');
const $ = require('express-async-handler');

router.get('/:id', $(AdminController.getAdmin));

router
  .route('/')
  .get($(AdminController.fetchAdmin))
  .post(
    Validator(AdminController.createSchema),
    $(AdminController.createAdmin)
  );

router.post(
  '/login',
  Validator(AdminController.loginSchema),
  $(AdminController.loginAdmin)
);

module.exports = router;
