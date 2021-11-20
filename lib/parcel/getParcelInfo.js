import api from '../api';
import getToken from './getToken';

function parseGeomMultipolygon(geom) {
  if (geom.includes('MULTIPOLYGON')) {
    const strLatLng = geom.substring(
      geom.indexOf('(((') + 3,
      geom.lastIndexOf(')))')
    );
    const rawLatLng = strLatLng.split(',');

    const latlng = rawLatLng.map((value) => {
      const latlng = value.split(' ');
      return {
        lat: Number(latlng[1]),
        lng: Number(latlng[0]),
      };
    });

    return latlng;
  }
  return [];
}

async function getParcelInfo(cadNum, requestOwner, requestOwnerId) {
  const token = await getToken();

  api.headers.set('authorization', `Bearer ${token.access_token}`);

  const res = await api.post(api.createParcelInfoInUrl(), {
    cad_num: cadNum,
    request_owner: requestOwner,
    request_owner_id: requestOwnerId,
  });

  if (res.status === 401) {
    throw new Error("can't check the cadastral number");
  } else if (res.status === 200 && res.error === 'no_result') {
    throw new Error(res.error_description);
  }

  const result = Object.values(res);
  if (!Array.isArray(result) || !result.length) {
    throw new Error(`Інформаці за кадастровим номером ${cadNum} відсутня`);
  }

  const data = result[0];

  return {
    cadNum: data.cad_num,
    category: data.category,
    purposeCode: data.purpose_code,
    purpose: data.purpose,
    use: data.use,
    area: data.area,
    unitArea: data.unit_area,
    ownershipcode: data.ownershipcode,
    ownership: data.ownership,
    ppoint: data.ppoint,
    zoomTo: data.zoom_to,
    shape: parseGeomMultipolygon(data.geom),
  };
}

export default getParcelInfo;
