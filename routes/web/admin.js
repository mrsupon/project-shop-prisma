import express from 'express';
import AdminsProductController from '../../controllers/admins/productController.js';

const AdminRouter = express.Router();

AdminRouter.get('/products', AdminsProductController.index);
AdminRouter.get('/products/create', AdminsProductController.create);
AdminRouter.post('/products', AdminsProductController.store);
AdminRouter.get('/products/:id/edit', AdminsProductController.edit);
AdminRouter.put('/products/:id', AdminsProductController.update);
AdminRouter.delete('/products/:id', AdminsProductController.destroy);

export default AdminRouter;
