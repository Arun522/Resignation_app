const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// GET api/admin/resignations
router.get('/resignations', adminController.getAllResignations);

// PUT api/admin/conclude_resignation
router.put('/conclude_resignation', adminController.concludeResignation);

// GET api/admin/exit_responses
router.get('/exit_responses', adminController.getAllExitResponses);

module.exports = router;
