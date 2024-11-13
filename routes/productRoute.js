const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const passport = require('passport');

router.get('/', passport.authenticate('jwt', { session: false }), productController.getAllProducts);
router.post('/add', passport.authenticate('jwt', { session: false }), productController.addProduct);
router.put('/update/:id', passport.authenticate('jwt', { session: false }), productController.updateProduct);
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), productController.deleteProduct);
router.get('/:id', passport.authenticate('jwt', { session: false }), productController.getProductById);

module.exports = router;
