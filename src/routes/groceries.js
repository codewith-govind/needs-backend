const express = require('express');
const { body } = require('express-validator');
const { auth, isAdmin } = require('../middleware/auth');
const validate = require('../middleware/validation');
const GroceryController = require('../controllers/groceryController');

const router = express.Router();

router.get('/', GroceryController.getAllItems);
router.get('/:id', GroceryController.getItem);

router.post('/',
  [auth, isAdmin],
  [
    body('name').notEmpty(),
    body('price').isFloat({ min: 0 }),
    body('quantity').isInt({ min: 0 }),
    body('category').notEmpty(),
    validate
  ],
  GroceryController.createItem
);

router.put('/:id',
  [auth, isAdmin],
  [
    body('name').optional().notEmpty(),
    body('price').optional().isFloat({ min: 0 }),
    body('quantity').optional().isInt({ min: 0 }),
    body('category').optional().notEmpty(),
    validate
  ],
  GroceryController.updateItem
);

router.delete('/:id', [auth, isAdmin], GroceryController.deleteItem);

module.exports = router;