const router = require('express').Router();
const MembersController = require('../controllers/members.controllers');
const $ = require('express-async-handler');

router.route('/verify/:id').get($(MembersController.verify));

module.exports = router;
