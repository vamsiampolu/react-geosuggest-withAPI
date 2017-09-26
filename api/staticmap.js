import { GOOGLE_STATIC_MAP_URL } from '../constants';

export function getMap(data) {
  const {
    address,
    zoom,
    width,
    height,
  } = data;
  const center = encodeURIComponent(address);
  const url = `${GOOGLE_STATIC_MAP_URL}?center=${center}&zoom=${zoom}&width=${width}&height=${height}`;
  return url;
}
