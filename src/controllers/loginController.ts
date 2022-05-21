import { NextFunction, Request, Response } from 'express';
import LoginService from '../services/loginService';

export default class LoginController {
  public service = new LoginService();

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      const { status, token, error } = await this.service.login({ username, password });
      if (error) res.status(status).json({ message: error.message });
      return res.status(status).json(token);
    } catch (error) {
      next(error);
    }
  };
}