const express = require('express');
const { body } = require('express-validator');
const { auth, isAdmin } = require('../middleware/auth');
const validate = require('../middleware/validation');
const OrderController = require('../controllers/orderController');

const router = express.Router();

router.post('/',
  [auth],
  [
    body('items').isArray(),
    body('items.*.id').notEmpty(),
    body('items.*.quantity').isInt({ min: 1 }),
    validate
  ],
  OrderController.createOrder
);

router.get('/', [auth], OrderController.getUserOrders);
router.get('/all', [auth, isAdmin], OrderController.getAllOrders);
router.put('/:id/status', [auth, isAdmin], OrderController.updateOrderStatus);

module.exports = router;