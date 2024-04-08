export default function convexHull(points: { location: { lat: number; lng: number } }[]) {
  points.sort((a, b) => a.location.lng - b.location.lng || a.location.lat - b.location.lat);

  const upperHull = [];
  const lowerHull = [];

  for (const p of points) {
    while (upperHull.length >= 2) {
      const q = upperHull[upperHull.length - 1];
      const r = upperHull[upperHull.length - 2];
      if (
        (q.location.lng - r.location.lng) * (p.location.lat - r.location.lat) >=
        (q.location.lat - r.location.lat) * (p.location.lng - r.location.lng)
      ) {
        upperHull.pop();
      } else {
        break;
      }
    }
    upperHull.push(p);
  }

  for (let i = points.length - 1; i >= 0; i--) {
    const p = points[i];
    while (lowerHull.length >= 2) {
      const q = lowerHull[lowerHull.length - 1];
      const r = lowerHull[lowerHull.length - 2];
      if (
        (q.location.lng - r.location.lng) * (p.location.lat - r.location.lat) >=
        (q.location.lat - r.location.lat) * (p.location.lng - r.location.lng)
      ) {
        lowerHull.pop();
      } else {
        break;
      }
    }
    lowerHull.push(p);
  }

  upperHull.pop();
  lowerHull.pop();

  return upperHull.concat(lowerHull);
}
