import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

export const verifyOwnAccessToken = (accessToken) => {
  const result = jwt.verify(accessToken, process.env.TOKEN_SECRET);
  return result;
};

export const generateAccessToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn });
};

export const verifyGoogleIdToken = async (idToken) => {
  const client = new OAuth2Client(process.env.GOOGLE_ID);
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_ID,
  });
  const payload = ticket.getPayload();
  return payload;
};
