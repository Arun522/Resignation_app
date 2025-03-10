const jwt = require('jsonwebtoken');
const moment = require('moment');
const axios = require('axios');

const Resignation = require('../models/Resignation');
const ExitResponse = require('../models/ExitResponse');
const User = require('../models/User');

const JWT_SECRET = 'SUPER_SECRET_JWT_KEY';

// Check if date is weekend or holiday
async function isWeekendOrHoliday(dateStr, country) {
  const date = moment(dateStr, 'YYYY-MM-DD');
  const dayOfWeek = date.day();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return true;
  }

  // Holiday check via Calendarific
  const apiKey = '4epY4wtA1MCI3rx4V5l4HODktdo3FnJf';
  const year = date.year();
  const month = date.month() + 1;
  const day = date.date();
  const url = `https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${country}&year=${year}&month=${month}&day=${day}`;

  try {
    const response = await axios.get(url);
    const holidays = response.data?.response?.holidays;
    return holidays && holidays.length > 0;
  } catch (error) {
    console.error('Calendarific API error:', error);
    return false;
  }
}

exports.submitResignation = async (req, res) => {
  try {
    // Check token
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Decode user
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'employee') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const userId = decoded.userId;
    const { lwd, reason } = req.body; 

    // Check weekend or holiday
    const user = await User.findById(userId);
    const country = user.country || 'US';
    const invalidDate = await isWeekendOrHoliday(lwd, country);
    if (invalidDate) {
      return res.status(400).json({
        message: 'Last working day cannot be on a weekend or a holiday.',
      });
    }

    // Create Resignation
    const resignation = await Resignation.create({
      employeeId: userId,
      lwd,
      status: 'pending',
      reason,
    });

    // Log notification for HR (no email will be sent)
    console.log(`Resignation submitted for employee ${userId}. HR should be notified.`);

    return res.status(200).json({
      data: {
        resignation: {
          _id: resignation._id,
        },
      },
    });
  } catch (error) {
    console.error('submitResignation error:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

exports.submitExitResponses = async (req, res) => {
  try {
    // Check token
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Decode user
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'employee') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const userId = decoded.userId;
    const { responses } = req.body; // Array of { questionText, response }

    // Create ExitResponse
    await ExitResponse.create({
      employeeId: userId,
      responses,
    });

    return res.status(200).json({ message: 'Exit responses submitted successfully' });
  } catch (error) {
    console.error('submitExitResponses error:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};
