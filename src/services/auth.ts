import jwt from 'jsonwebtoken';

import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET || 'qualquercoisa';

const generateToken = (username: string, password: string) => {
  const jwtConfig = {
    expiresIn: '1d',
  };
  const tokenNum = jwt.sign({ username, password }, JWT_SECRET, jwtConfig);
  return ({ token: tokenNum });
};

// const checkJWT = async (authorization) => {
//   if (!authorization) throw ERR.TOKEN_NOT_FOUND;
//   const verifyToken = jwt.verify(authorization, JWT_SECRET);
//   const userEmailFound = await User.findOne({ where: { email: verifyToken.email } });
//   const userId = userEmailFound.dataValues.id;
//   if (verifyToken && userId) return userId;
//   return false;
// };

export default {
  generateToken,
  // checkJWT,
};