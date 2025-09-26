export type PanoramaMeta = {
  initialLon?: number; // grados, + derecha
  initialLat?: number; // grados, + arriba
  radius?: number;     // opcional, coincide con radio de la esfera (p.ej. 500)
};

const PANORAMA_META: Record<string, PanoramaMeta> = {
  '/panoramas/INICIO.webp': { initialLon: 0, initialLat: 0, radius: 480 },
  '/panoramas/1.webp':    { initialLon: -100, initialLat: 10, radius: 480 },
  '/panoramas/2.webp':    { initialLon: 0, initialLat: 2, radius: 480 },
  '/panoramas/2b.webp':   { initialLon: -30, initialLat: 2, radius: 480 },
  '/panoramas/3.webp':    { initialLon: -30, initialLat: 2, radius: 480 },
  '/panoramas/4.webp':    { initialLon: -30, initialLat: 2, radius: 480 },
  '/panoramas/5.webp':    { initialLon: -30, initialLat: 2, radius: 480 },
  '/panoramas/6.webp':    { initialLon: 150, initialLat: 2, radius: 480 },
  '/panoramas/7.webp':    { initialLon: 20, initialLat: 18, radius: 480 },
  '/panoramas/8.webp':    { initialLon: 0, initialLat: 2, radius: 480 },
  '/panoramas/9.webp':    { initialLon: 0, initialLat: 2, radius: 480 },
  '/panoramas/10.webp':   { initialLon: 0, initialLat: 2, radius: 480 },
};

export default PANORAMA_META;