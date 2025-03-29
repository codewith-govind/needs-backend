const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validation');
const AuthController = require('../controllers/authController');

const router = express.Router();

router.post('/register',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('name').notEmpty(),
    validate
  ],
  AuthController.register
);

router.post('/login',
  [
    body('email').isEmail(),
    body('password').notEmpty(),
    validate
  ],
  AuthController.login
);

module.exports = router;