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

// async function getCities(regionId) {
//   const ukResult = await fetch(
//     `https://www.olx.ua/api/v1/geo-encoder/regions/${regionId}/cities/`,
//     { headers: { 'accept-language': 'uk' } }
//   );
//   const ukJSON = await ukResult.json();

//   const ruResult = await fetch(
//     `https://www.olx.ua/api/v1/geo-encoder/regions/${regionId}/cities/`
//   );
//   const ruJSON = await ruResult.json();

//   return ukJSON.data.map(({ name, normalized_name, ...city }) => {
//     const ruRecord = ruJSON.data.find(({ id }) => id === city.id);
//     return {
//       id: city.id,
//       ...city,
//       regionId,
//       normalizedName: normalized_name,
//       ukName: name,
//       ruName: ruRecord.name,
//     };
//   });
// }
