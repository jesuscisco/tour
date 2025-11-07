export type PanoramaMeta = {
  initialLon?: number; // grados, + derecha
  initialLat?: number; // grados, + arriba
  radius?: number;     // opcional, coincide con radio de la esfera (p.ej. 500)
};

const PANORAMA_META: Record<string, PanoramaMeta> = {
  '/panoramas/INICIO.png': { initialLon: 0, initialLat: 0, radius: 480 },
  '/panoramas/1.png':    { initialLon: 0, initialLat: 0, radius: 480 },
  '/panoramas/2.png':    { initialLon: 0, initialLat: 2, radius: 480 },
  '/panoramas/2b.png':   { initialLon: -30, initialLat: 2, radius: 480 },
  '/panoramas/3.png':    { initialLon: -30, initialLat: 2, radius: 480 },
  '/panoramas/3b.png':    { initialLon: 0, initialLat: 0, radius: 480 },
  '/panoramas/3b.webp':    { initialLon: 0, initialLat: 0, radius: 480 },
  '/panoramas/4.png':    { initialLon: -30, initialLat: 2, radius: 480 },
  '/panoramas/5.png':    { initialLon: -30, initialLat: 2, radius: 480 },
  '/panoramas/5b.webp':    { initialLon: -50, initialLat: 0, radius: 480 },
  '/panoramas/5b.png':    { initialLon: -50, initialLat: 0, radius: 480 },
  '/panoramas/6.png':    { initialLon: 150, initialLat: 2, radius: 480 },
  '/panoramas/6b.png':    { initialLon: 0, initialLat: 2, radius: 480 },
  '/panoramas/7b.png':    { initialLon: 30, initialLat: 2, radius: 480 },
  '/panoramas/8b.png':    { initialLon: 0, initialLat: 2, radius: 480 },
  '/panoramas/9b.png':    { initialLon: 300, initialLat: 2, radius: 480 },
  '/panoramas/10.png':   { initialLon: 0, initialLat: 2, radius: 480 },
  '/panoramas/11.png':    { initialLon: -30, initialLat: 2, radius: 480 },
  '/panoramas/12.png':    { initialLon: 0, initialLat: 0, radius: 480 },
  '/panoramas/15.png':    { initialLon: -50, initialLat: 0, radius: 480 },
  '/panoramas/14.png':    { initialLon: 0, initialLat: 2, radius: 480 },
  '/panoramas/17.png':    { initialLon: 30, initialLat: 2, radius: 480 },
  '/panoramas/18.png':    { initialLon: 0, initialLat: 2, radius: 480 },
  '/panoramas/19.png':    { initialLon: 300, initialLat: 2, radius: 480 },
  '/panoramas/beta.png':    { initialLon: 200, initialLat: 2, radius: 480 },
};


export default PANORAMA_META;