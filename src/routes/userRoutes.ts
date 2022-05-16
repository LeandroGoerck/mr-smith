import { Router } from 'express';
import UserController from '../controllers/userController';
import validateUserMiddleware from '../middlewares/validateUserMiddleware';

const userController = new UserController();

const route = Router();
route.post('/', validateUserMiddleware, userController.create);

export default route;