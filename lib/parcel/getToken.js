import api from '../api';

async function getToken() {
  const clientId = process.env.ELAND_CLIENT_ID;
  const clientSecret = process.env.ELAND_CLIENT_SECRET;
  const grantType = 'client_credentials';

  const res = await api.get(
    api.createParcelAuthUrl(clientId, clientSecret, grantType)
  );

  if (res.status === 401 || res.status === 400) {
    throw new Error("can't check the cadastral number");
  }

  return res;
}

export default getToken;
