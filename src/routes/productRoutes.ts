import { Router } from 'express';
import ProductController from '../controllers/productController';
import validateProductMiddleware from '../middlewares/validateProductMiddleware.ts';

const productController = new ProductController();

const route = Router();
route.get('/', productController.getAll);
route.post('/', validateProductMiddleware, productController.create);

export default route;