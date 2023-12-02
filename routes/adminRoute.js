import express from 'express';
import AdminsProductController from '../controllers/admins/productController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const AdminRoute = express.Router();

AdminRoute.get('/products', AdminsProductController.index);
AdminRoute.get('/products/create', AdminsProductController.create);
AdminRoute.post('/products', AdminsProductController.store);
AdminRoute.get('/products/:id/edit', AdminsProductController.edit);
AdminRoute.put('/products/:id', AdminsProductController.update);
AdminRoute.delete('/products/:id', AdminsProductController.destroy);

export default AdminRoute;
