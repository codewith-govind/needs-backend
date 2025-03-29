const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../config/firebase');

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const userSnapshot = await db.collection('users')
      .where('email', '==', email)
      .get();

    if (!userSnapshot.empty) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user document
    const userRef = db.collection('users').doc();
    await userRef.set({
      email,
      name,
      password: hashedPassword,
      isAdmin: false,
      createdAt: new Date().toISOString()
    });

    const token = jwt.sign({ uid: userRef.id }, process.env.JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userSnapshot = await db.collection('users')
      .where('email', '==', email)
      .get();

    if (userSnapshot.empty) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const userDoc = userSnapshot.docs[0];
    const user = userDoc.data();

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ uid: userDoc.id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};

module.exports = {
  register,
  login
};