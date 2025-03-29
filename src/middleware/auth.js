const jwt = require('jsonwebtoken');
const { db } = require('../config/firebase');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userDoc = await db.collection('users').doc(decoded.uid).get();
    
    if (!userDoc.exists) {
      throw new Error();
    }

    req.user = { uid: decoded.uid, ...userDoc.data() };
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate.' });
  }
};

const isAdmin = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: 'Access denied. Admin privileges required.' });
  }
  next();
};

module.exports = { auth, isAdmin };