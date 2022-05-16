import { Request, Response, NextFunction } from 'express';
import UserService from '../services/userService';

export default class UserController {
  public service = new UserService();

  public create = async (req: Request, res: Response, next: NextFunction)
  : Promise<Response | void> => {
    const { username, classe, level, password } = req.body;
    try {
      const token = await this.service.create(username, classe, level, password);
      return res.status(201).json(token);
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('User already exists')) {
        return res.status(403).json({ message: error.message });
      }
      next(error);
    }
  };
}