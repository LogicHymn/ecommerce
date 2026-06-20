const express = require('express');
const router = express.Router();

const {getAllProducts, deleteProduct, createProduct, getProductById} = require('../controllers/products');

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.delete('/:id', deleteProduct);

module.exports = router;