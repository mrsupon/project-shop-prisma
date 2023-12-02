import express from 'express';

import ProductController from '../controllers/shops/productController.js';
import CartController from '../controllers/shops/cartController.js';
import OrderController from '../controllers/shops/orderController.js';
import InvoiceController from '../controllers/shops/invoiceController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const ShopRoute = express.Router();

ShopRoute.get('/products', ProductController.index);
ShopRoute.get('/products/:id', ProductController.show);

ShopRoute.get('/carts', CartController.index);
ShopRoute.post('/carts', CartController.store);
ShopRoute.delete('/carts', CartController.destroy);

ShopRoute.get('/orders', OrderController.index);
ShopRoute.post('/orders', OrderController.store);

ShopRoute.get('/invoices/:id', InvoiceController.show);

export default ShopRoute;
