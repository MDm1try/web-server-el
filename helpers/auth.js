import { verifyGoogleIdToken, verifyOwnAccessToken } from './token';
import { PROVIDERS, PROVIDERS_MAP } from '../constants';
import { Users } from '../models';

async function auth(req, res, next) {
  const provider = req.headers['provider'];
  if (!provider || !PROVIDERS.includes(provider)) {
    return res
      .status(401)
      .send({ error: 'Provider is invalid or not provided' });
  }

  switch (provider) {
    case PROVIDERS_MAP.GOOGLE: {
      const idToken = req.headers['id_token'];
      if (!idToken) {
        return res.status(401).send({ error: 'Token not provided' }); // if there isn't any token
      }
      const payload = await verifyGoogleIdToken(idToken);

      const user = await Users.findOne({ where: { email: payload.email } });
      if (!user) return res.status(401).send({ error: 'Token is invalid' });

      req.user = user;
      next();
      return;
    }
    case PROVIDERS_MAP.OWN: {
      const accessToken = req.headers['access_token'];
      const token = accessToken && accessToken.split(' ')[1];
      if (!token) {
        return res.status(401).send({ error: 'Token not provided' }); // if there isn't any token
      }
      const payload = verifyOwnAccessToken(token);

      const user = await Users.findByPk(payload.id);
      if (!user) return res.status(401).send({ error: 'Token is invalid' });

      req.user = user;
      next();
      return;
    }
    default:
      break;
  }
}

export default auth;
