export function posFromLonLat(lonDeg: number, latDeg: number, radius = 500) {
  const lon = (lonDeg * Math.PI) / 180;
  const lat = (latDeg * Math.PI) / 180;
  const phi = (Math.PI / 2) - lat;
  const theta = lon + Math.PI; // ajuste para mapping (tweak si tu texture necesita otro offset)
  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return [x, y, z] as [number, number, number];
}