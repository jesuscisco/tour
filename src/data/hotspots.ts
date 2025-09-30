export type HotspotData = {
  id: string;
  position: [number, number, number];
  label: string;
  target?: string; // ruta al panorama destino (si aplica)
};

const HOTSPOTS_MAP: Record<string, HotspotData[]> = {
  '/panoramas/entrada.png': [
    { id: 'to-1', position: [800, -50, 50], label: 'Ir a 1', target: '/panoramas/1.png' },
  ],
  '/panoramas/1.png': [
    { id: 'to-entrada', position: [-900, -80, -220], label: 'Ir a entrada', target: '/panoramas/entrada.png' },
    { id: 'to-2', position: [500, -80, 500], label: 'Ir a 2', target: '/panoramas/2.png' },
    { id: 'to-2b', position: [-7, -1.4, 10], label: 'Ir a 2b', target: '/panoramas/11.png' },
  ],
  '/panoramas/11.png': [
    { id: 'to-1-again', position: [-90, -0, 100], label: 'Ir a 1', target: '/panoramas/1.png' },
  ],
  '/panoramas/2.png': [
    { id: 'to-1', position: [-200, -10, 100], label: 'ir a 1', target: '/panoramas/1.png' },
    { id: 'to-3', position: [50, 0, -180], label: 'ir a 3', target: '/panoramas/3.png' },
    { id: 'to-4', position: [50, 0, 0], label: 'ir a 4', target: '/panoramas/4.png' },
    { id: 'to-5', position: [700, 0, 600], label: 'ir a 5', target: '/panoramas/5.png' },
    
  ],
  '/panoramas/3.png': [
    { id: 'to-2-again', position: [700, 0, 200], label: 'Ir a 1', target: '/panoramas/2.png' },
    { id: 'to-3b-again', position: [-120, 0, -200], label: 'Ir a 1', target: '/panoramas/12.png' },
  ],
  '/panoramas/12.png': [
    { id: 'to-3-again', position: [-120, -5, 75], label: 'Ir a 1', target: '/panoramas/3.png' },
  ],
  '/panoramas/4.png': [
    { id: 'to-2-again', position: [-80, -5, -3], label: 'Ir a 1', target: '/panoramas/2.png' },
  ],
  '/panoramas/5.png': [
    { id: 'to-6', position: [400, 150, -200], label: 'Ir a 1', target: '/panoramas/6.png' },
    { id: 'to-2-again', position: [500, -400, 50], label: 'Ir a 1', target: '/panoramas/2.png' },
  ],
  '/panoramas/6.png': [
    { id: 'to-5-again', position: [500, 0, 50], label: 'Ir a 1', target: '/panoramas/5.png' },
    { id: 'to-7', position: [-100, 0, -80], label: 'Ir a 1', target: '/panoramas/7.png' },
    { id: 'to-8', position: [-300, -0, 500], label: 'Ir a 1', target: '/panoramas/8.png' },
  ],
  '/panoramas/7.png': [
    { id: 'to-6', position: [-180, 0, 500], label: 'Ir a 1', target: '/panoramas/6.png' },
  ],
  '/panoramas/8.png': [
    { id: 'to-6-again', position: [-400, 20, 170], label: 'Ir a 1', target: '/panoramas/6.png' },
    { id: 'to-9', position: [-400, 20, -80], label: 'Ir a 1', target: '/panoramas/9.png' },
    { id: 'to-10', position: [70, 0, 50], label: 'Ir a 1', target: '/panoramas/10.png' },
  ],
    '/panoramas/9.png': [
    { id: 'to-8', position: [-300, 20, -80], label: 'Ir a 1', target: '/panoramas/8.png' },
  ],
  '/panoramas/10.png': [
    { id: 'to-8', position: [500, 0, 50], label: 'Ir a 1', target: '/panoramas/8.png' },
  ],
};

export default HOTSPOTS_MAP;