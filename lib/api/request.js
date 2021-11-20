const fetch = require('node-fetch');

export const headers = new fetch.Headers({
  'Content-Type': 'application/json',
});

async function parseBody(res) {
  const contentType = res.headers.get(`Content-Type`);
  if (!contentType || contentType.startsWith(`text/`)) {
    return { text: await res.text() };
  }
  return res.json();
}

export default async function request(url, method, data) {
  const init = {
    method,
    headers,
  };

  if (data) {
    init.body = JSON.stringify(data);
  }

  const res = await fetch(url, init);
  const body = await parseBody(res);

  return {
    status: res.status,
    ...body,
  };
}
