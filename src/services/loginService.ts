import ILogin from '../interfaces/loginInterface';
import UserModel from '../models/userModel';
import auth from './auth';
import MESSAGES from './messages';

export default class LoginService {
  public model = new UserModel();

  public login = async (data: ILogin) => {
    const userData = await this.model.getByName(data.username, data.password);

    if (userData === null) {
      return { status: 401, error: { message: MESSAGES.USERNAME_OR_PASSWORD_INVALID } };
    }
    const token = auth.generateToken(data.username, data.password);
    return { status: 200, token };
  };
}
