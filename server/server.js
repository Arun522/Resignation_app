const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// ===== CONNECT TO MONGODB =====
mongoose.connect('mongodb+srv://root:root1@cluster0.dotw0.mongodb.net/');

// ===== CREATE ADMIN IF NOT EXISTS =====
(async () => {
  try {
    const adminUser = await User.findOne({ username: 'admin' });
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash('admin', 10);
      await User.create({
        username: 'admin',
        password: hashedPassword,
        role: 'admin', 
      });
      console.log('Admin user created: username=admin, password=admin');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
})();

// ===== ROUTES =====
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

// ===== START SERVER ON PORT 8080 =====
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
