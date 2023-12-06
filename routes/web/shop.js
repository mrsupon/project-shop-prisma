import express from 'express';

import ProductController from '../../controllers/shops/productController.js';
import CartController from '../../controllers/shops/cartController.js';
import OrderController from '../../controllers/shops/orderController.js';
import InvoiceController from '../../controllers/shops/invoiceController.js';

const ShopRouter = express.Router();

ShopRouter.get('/products', ProductController.index);
ShopRouter.get('/products/:id', ProductController.show);

ShopRouter.get('/carts', CartController.index);
ShopRouter.post('/carts', CartController.store);
ShopRouter.delete('/carts', CartController.destroy);

ShopRouter.get('/orders', OrderController.index);
ShopRouter.post('/orders', OrderController.store);

ShopRouter.get('/invoices/:id', InvoiceController.show);

export default ShopRouter;
