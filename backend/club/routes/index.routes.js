const router = require('express').Router();
const Validator = require('../../services/validator');
const ClubController = require('../controllers/club.controllers');
const $ = require('express-async-handler');

router
  .route('/')
  .get($(ClubController.fetchClubs))
  .post(Validator(ClubController.createSchema), $(ClubController.createClub));

module.exports = router;
