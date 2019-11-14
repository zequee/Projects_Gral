const express = require('express');
const router = express.Router();

const vehicleEditionController = require('../controllers/vehicleEditionController');

router.post('/', vehicleEditionController.save);

module.exports = router;
