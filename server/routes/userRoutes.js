const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const jwt = require('jsonwebtoken');
const Resignation = require('../models/Resignation');
const JWT_SECRET = 'SUPER_SECRET_JWT_KEY';

// POST api/user/resign
router.post('/resign', userController.submitResignation);

// POST api/user/responses
router.post('/responses', userController.submitExitResponses);
router.get('/my_resignations', async (req, res) => {
    try {
      // Get token from headers
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }
  
      // Decode and verify token
      const decoded = jwt.verify(token, JWT_SECRET);
      if (decoded.role !== 'employee') {
        return res.status(403).json({ message: 'Forbidden' });
      }
  
      // Find resignations for the logged-in employee
      const resignations = await Resignation.find({ employeeId: decoded.userId });
      return res.status(200).json({ data: resignations });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  
module.exports = router;
