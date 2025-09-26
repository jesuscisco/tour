export type HotspotData = {
  id: string;
  position: [number, number, number];
  label: string;
  target?: string; // ruta al panorama destino (si aplica)
};

const HOTSPOTS_MAP: Record<string, HotspotData[]> = {
  '/panoramas/INICIO.webp': [
    { id: 'to-1', position: [800, -50, 50], label: 'Ir a 1', target: '/panoramas/1.webp' },
  ],
  '/panoramas/1.webp': [
    { id: 'to-inicio', position: [-900, -80, -220], label: 'Ir a inicio', target: '/panoramas/INICIO.webp' },
    { id: 'to-2', position: [500, -80, 500], label: 'Ir a 2', target: '/panoramas/2.webp' },
    { id: 'to-2b', position: [-7, -1.4, 10], label: 'Ir a 2b', target: '/panoramas/2b.webp' },
  ],
  '/panoramas/2b.webp': [
    { id: 'to-1-again', position: [-90, -0, 100], label: 'Ir a 1', target: '/panoramas/1.webp' },
  ],
  '/panoramas/2.webp': [
    { id: 'to-1', position: [-200, -10, 100], label: 'ir a 1', target: '/panoramas/1.webp' },
    { id: 'to-3', position: [50, 0, -180], label: 'ir a 3', target: '/panoramas/3.webp' },
    { id: 'to-4', position: [50, 0, 0], label: 'ir a 4', target: '/panoramas/4.webp' },
    { id: 'to-5', position: [700, 0, 600], label: 'ir a 5', target: '/panoramas/5.webp' },
    
  ],
  '/panoramas/3.webp': [
    { id: 'to-2-again', position: [700, 0, 200], label: 'Ir a 1', target: '/panoramas/2.webp' },
    { id: 'to-3b-again', position: [-120, 0, -200], label: 'Ir a 1', target: '/panoramas/3b.webp' },
  ],
  '/panoramas/3b.webp': [
    { id: 'to-3-again', position: [-120, -5, 75], label: 'Ir a 1', target: '/panoramas/3.webp' },
  ],
  '/panoramas/4.webp': [
    { id: 'to-2-again', position: [-80, -5, -3], label: 'Ir a 1', target: '/panoramas/2.webp' },
  ],
   '/panoramas/5.webp': [
    { id: 'to-6', position: [400, 150, -200], label: 'Ir a 1', target: '/panoramas/6.webp' },
    { id: 'to-2-again', position: [500, -400, 50], label: 'Ir a 1', target: '/panoramas/2.webp' },
  ],
  '/panoramas/6.webp': [
    { id: 'to-5-again', position: [500, 0, 50], label: 'Ir a 1', target: '/panoramas/5.webp' },
    { id: 'to-7', position: [-100, 0, -80], label: 'Ir a 1', target: '/panoramas/7.webp' },
    { id: 'to-8', position: [-300, -0, 500], label: 'Ir a 1', target: '/panoramas/8.webp' },
  ],
  '/panoramas/7.webp': [
    { id: 'to-6', position: [-180, 0, 500], label: 'Ir a 1', target: '/panoramas/6.webp' },
  ],
  '/panoramas/8.webp': [
    { id: 'to-6-again', position: [-400, 20, 170], label: 'Ir a 1', target: '/panoramas/6.webp' },
    { id: 'to-9', position: [-400, 20, -80], label: 'Ir a 1', target: '/panoramas/9.webp' },
    { id: 'to-10', position: [70, 0, 50], label: 'Ir a 1', target: '/panoramas/10.webp' },
  ],
    '/panoramas/9.webp': [
    { id: 'to-8', position: [-300, 20, -80], label: 'Ir a 1', target: '/panoramas/8.webp' },
  ],
  '/panoramas/10.webp': [
    { id: 'to-8', position: [500, 0, 50], label: 'Ir a 1', target: '/panoramas/8.webp' },
  ],
};

export default HOTSPOTS_MAP;