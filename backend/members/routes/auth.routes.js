const router = require('express').Router();
const Validator = require('../../services/validator');
const MembersController = require('../controllers/members.controllers');
const $ = require('express-async-handler');

router
  .route('/:id')
  .delete(
    Validator(MembersController.deleteSchema),
    $(MembersController.deleteMember)
  )
  .get($(MembersController.getMembers));

router
  .route('/')
  .post(
    Validator(MembersController.createSchema),
    $(MembersController.createMember)
  )
  .get($(MembersController.fetchMembers));

module.exports = router;
