import qs from 'qs';

const baseUrl = process.env.ELAND_URL;

export function createUrl(url, params) {
  const fullUrl = `${baseUrl}${url}`;
  const queryString = params && qs.stringify(params);

  return queryString ? `${fullUrl}?${queryString}` : fullUrl;
}

export function createParcelInfoInUrl() {
  return createUrl(`/api/parcel_info`);
}

export function createParcelAuthUrl(clientId, clientSecret, grantType) {
  return createUrl(`/oauth/v2/token`, {
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: grantType,
  });
}
