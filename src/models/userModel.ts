import { ResultSetHeader } from 'mysql2/promise';
import ILogin from '../interfaces/loginInterface';
import connection from './connection';

export default class UserModel {
  public create = async (
    username: string,
    classe: string,
    level: number,
    password: string,
  ): Promise<{ token: string }> => {
    const query = `INSERT INTO Trybesmith.Users
                   (username, classe, level, password)
                   VALUES (?, ?, ?, ?);`;
    const values = [username, classe, level, password];
    
    await connection.execute<ResultSetHeader>(query, values);

    return { token: 'aqui vai o token' };
  };

  public getByName = async (
    username: string,
    password: string,
  ): Promise<ILogin | null> => {
    const query = `SELECT username, password
                   FROM Trybesmith.Users
                   WHERE username = ? AND password = ?;`;
    const values = [username, password];

    const [data] = await connection.execute(query, values);
    const [user] = data as ILogin[];

    return user || null;
  };
}
