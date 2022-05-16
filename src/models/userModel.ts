import { ResultSetHeader } from 'mysql2/promise';
import connection from './connection';

export default class UserModel {
  public create = async (
    username: string,
    classe: string,
    level: number,
    password: string,
  ): Promise<{ token: string }> => {
    await connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?);',
      [username, classe, level, password],
    );

    return { token: 'aqui vai o token' };
  };
}
