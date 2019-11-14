const express = require('express');
const router = express.Router();

const assignmentController = require('../controllers/assignmentController');

router.post('/', assignmentController.save);
router.get('/', assignmentController.listAssignments);
router.post('/:id', assignmentController.UpdateEndDateAssignment);

module.exports = router;
