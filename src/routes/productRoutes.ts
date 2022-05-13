import { Router } from 'express';
import ProductController from '../controllers/productController';

const productController = new ProductController();

const route = Router();
route.get('/', productController.getAll);

export default route;