const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dbPath = path.join(__dirname, '..', 'db_fallback.json');

const readJSONDb = () => {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ users: [], sessions: [] }, null, 2));
  }
  try {
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    if (!data.users) data.users = [];
    if (!data.sessions) data.sessions = [];
    return data;
  } catch (e) {
    return { users: [], sessions: [] };
  }
};

const writeJSONDb = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// Sign Up Route
router.post('/signup', async (req, res) => {
  console.log('Request received at /signup:', req.body);
  const { name, email, password } = req.body;

  try {
    if (global.dbType === 'json') {
      const db = readJSONDb();
      const existingUser = db.users.find(u => u.email === email);
      if (existingUser) return res.status(400).json({ msg: 'User already exists' });

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        _id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        password: hashedPassword,
        age: null,
        gender: 'Male',
        height: null,
        weight: null,
        fitnessGoal: 'Weight Loss',
        streak: 0,
        xp: 0,
        badge: 'Beginner Yogi',
        lastCompletedDate: null,
        profileCompleted: false,
        createdAt: new Date()
      };
      db.users.push(newUser);
      writeJSONDb(db);

      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(201).json({
        msg: "User created successfully",
        token,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email
        }
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      msg: "User created successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    }); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not set in environment variables');
  }

  try {
    if (global.dbType === 'json') {
      const db = readJSONDb();
      const user = db.users.find(u => u.email === email);
      if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update User Profile
router.put('/profile/:id', async (req, res) => {
  try {
    if (global.dbType === 'json') {
      const db = readJSONDb();
      const index = db.users.findIndex(u => u._id === req.params.id);
      if (index === -1) return res.status(404).json({ msg: 'User not found' });

      db.users[index] = { ...db.users[index], ...req.body };
      writeJSONDb(db);
      const { password, ...userWithoutPassword } = db.users[index];
      return res.json(userWithoutPassword);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(user);
  } catch(err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

// Get User Profile Route
router.get('/profile/:id', async (req, res) => {
  try {
    if (global.dbType === 'json') {
      const db = readJSONDb();
      const user = db.users.find(u => u._id === req.params.id);
      if (!user) return res.status(404).json({ msg: 'User not found' });
      const { password, ...userWithoutPassword } = user;
      return res.json(userWithoutPassword);
    }

    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
