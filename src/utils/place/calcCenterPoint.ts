export default function calcCenterPoint(points: { location: { lat: number; lng: number } }[]) {
  let x = 0;
  let y = 0;
  let s = 0;

  if (points === undefined) return { lat: null, lng: null };

  if (points.length === 1) {
    const lat = points[0].location.lat;
    const lng = points[0].location.lng;
    return { lat, lng };
  }

  if (points.length === 2) {
    const lat = (points[0].location.lat + points[1].location.lat) / 2;
    const lng = (points[0].location.lng + points[1].location.lng) / 2;
    return { lat, lng };
  }

  for (let i = 0; i < points.length; i++) {
    let j = (i + 1) % points.length;

    x +=
      (points[i].location.lat + points[j].location.lat) *
      (points[i].location.lat * points[j].location.lng - points[j].location.lat * points[i].location.lng);

    y +=
      (points[i].location.lng + points[j].location.lng) *
      (points[i].location.lat * points[j].location.lng - points[j].location.lat * points[i].location.lng);

    s += points[i].location.lat * points[j].location.lng - points[j].location.lat * points[i].location.lng;
  }

  s /= 2;
  x = x / (6 * s);
  y = y / (6 * s);

  return { lat: x, lng: y };
}
