export type PanoramaMeta = {
  initialLon?: number; // grados, + derecha
  initialLat?: number; // grados, + arriba
  radius?: number;     // opcional, coincide con radio de la esfera (p.ej. 500)
};

const PANORAMA_META: Record<string, PanoramaMeta> = {
  '/panoramas/INICIO.png': { initialLon: 0, initialLat: 0, radius: 480 },
  '/panoramas/1.png':    { initialLon: -100, initialLat: 10, radius: 480 },
  '/panoramas/20.png':    { initialLon: 0, initialLat: 2, radius: 480 },
  '/panoramas/2b.png':   { initialLon: -30, initialLat: 2, radius: 480 },
  '/panoramas/3.png':    { initialLon: -30, initialLat: 2, radius: 480 },
  '/panoramas/4.png':    { initialLon: -30, initialLat: 2, radius: 480 },
  '/panoramas/5.png':    { initialLon: -30, initialLat: 2, radius: 480 },
  '/panoramas/6.png':    { initialLon: 150, initialLat: 2, radius: 480 },
  '/panoramas/7.png':    { initialLon: 20, initialLat: 18, radius: 480 },
  '/panoramas/8.png':    { initialLon: 0, initialLat: 2, radius: 480 },
  '/panoramas/9.png':    { initialLon: 0, initialLat: 2, radius: 480 },
  '/panoramas/10.png':   { initialLon: 0, initialLat: 2, radius: 480 },
};

export default PANORAMA_META;