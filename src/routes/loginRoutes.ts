import { Router } from 'express';
import LoginController from '../controllers/loginController';
import validateLoginMiddleware from '../middlewares/validateLoginMiddleware';

const loginController = new LoginController();

const route = Router();
route.post('/', validateLoginMiddleware, loginController.login);

export default route;
