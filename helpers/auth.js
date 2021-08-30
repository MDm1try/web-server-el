import jwt from 'jsonwebtoken';

// import { User } from '../models';

export const generateAccessToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn });
};

export const verifyToken = (token) => {
  const result = jwt.verify(token, process.env.TOKEN_SECRET);
  return result;
};

async function auth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).send({ error: 'Token not provided' }); // if there isn't any token

  const data = verifyToken(token);
  if (!data) {
    return res.status(401).send({ error: 'Token is invalid' }); // if there isn't any token
  }

  // const user = await User.findByPk(data.id);
  // if (!user) return res.status(401).send({ error: 'Token is invalid' });

  // req.user = user;
  next(); // pass the execution off to whatever request the client intended
}

export default auth;
