// server/controllers/adminController.js
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const Resignation = require('../models/Resignation');
const ExitResponse = require('../models/ExitResponse');
const User = require('../models/User');

const JWT_SECRET = 'SUPER_SECRET_JWT_KEY';

const transporter = nodemailer.createTransport({
  service: 'smtp.ethereal.email',
  auth: {
    user: 'nkei6syi3yzv63lu@ethereal.email',
    pass: 'PVbvUjaDDTEfe3SaYz',
  },
});

exports.getAllResignations = async (req, res) => {
  try {
    const resignations = await Resignation.find()
      .populate('employeeId', 'firstName lastName email'); 

    return res.status(200).json({ data: resignations });
  } catch (error) {
    console.error('getAllResignations error:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

exports.concludeResignation = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { resignationId, approved, lwd } = req.body;
    const resignation = await Resignation.findById(resignationId);
    if (!resignation) {
      return res.status(404).json({ message: 'Resignation not found' });
    }

    if (approved) {
      resignation.status = 'approved';
      resignation.lwd = lwd; 
    } else {
      resignation.status = 'rejected';
    }
    await resignation.save();

    // Notify the employee by email if possible
    const employee = await User.findById(resignation.employeeId);
    if (employee && employee.email) {
      const mailOptions = {
        from: 'nkei6syi3yzv63lu@ethereal.email ',
        to: employee.email,
        subject: 'Resignation Update',
        text: approved
          ? `Your resignation has been approved. Your last working day is ${lwd}`
          : 'Your resignation has been rejected.',
      };
      await transporter.sendMail(mailOptions);
    }

    return res.status(200).json({ message: 'Resignation concluded' });
  } catch (error) {
    console.error('concludeResignation error:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

exports.getAllExitResponses = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const responses = await ExitResponse.find().populate('employeeId', 'username');
    return res.status(200).json({ data: responses });
  } catch (error) {
    console.error('getAllExitResponses error:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};
