export type HotspotData = {
  id: string;
  position: [number, number, number];
  label: string;
  target?: string; // ruta al panorama destino (si aplica)
};

const HOTSPOTS_MAP: Record<string, HotspotData[]> = {
  '/panoramas/INICIO.png': [
    { id: 'to-1', position: [800, -50, -70], label: 'Ir a 1', target: '/panoramas/1.png' },
  ],
  '/panoramas/1.png': [
    { id: 'to-inicio', position: [-900, -30, -300], label: 'Ir a inicio', target: '/panoramas/INICIO.png' },
    { id: 'to-2', position: [700, -50, 350], label: 'Ir a 2', target: '/panoramas/2.png' },
  ],
  '/panoramas/2.png': [
    { id: 'to-1', position: [-200, 7, -35], label: 'ir a 1', target: '/panoramas/1.png' },
    { id: 'to-3b', position: [-95, 0, -900], label: 'ir a 3b', target: '/panoramas/3b.webp' },
    { id: 'to-3', position: [80, 0, 5], label: 'ir a 3', target: '/panoramas/3.png' },
  ],
  '/panoramas/3.png': [
    { id: 'to-2-again', position: [350, 0, -700], label: 'Ir a 2', target: '/panoramas/2.png' },
    { id: 'to-4', position: [-120, 0, -115], label: 'Ir a 4', target: '/panoramas/4.png' },
  ],
    '/panoramas/4.png': [
    { id: 'to-3-again', position: [-80, -5, -3], label: 'Ir a 3', target: '/panoramas/3.png' },
    { id: 'to-5', position: [80, 0, -5], label: 'Ir a 5', target: '/panoramas/5.png' },
  ],
  '/panoramas/5.png': [
    { id: 'to-4-again', position: [-80, -5, -3], label: 'Ir a 4', target: '/panoramas/4.png' },
  ],

  '/panoramas/3b.webp': [
    { id: 'to-2-again', position: [400, -170, -120], label: 'Ir a 2', target: '/panoramas/2.png' },
    { id: 'to-5b', position: [400, 220, 100], label: 'Ir a 5b', target: '/panoramas/5b.png' },
  ],

  '/panoramas/11.png': [
    { id: 'to-3b-again', position: [100, -130, 800], label: 'Ir a 3b', target: '/panoramas/3b.webp' },
    { id: 'to-6b', position: [-100, -20, 30], label: 'Ir a 6b', target: '/panoramas/6b.png' },
    { id: 'to-7b', position: [-100, -20, -80], label: 'Ir a 7b', target: '/panoramas/7b.png' },
    { id: 'to-8b', position: [-60, -130, -900], label: 'Ir a 8b', target: '/panoramas/8b.png' },
    { id: 'to-9b', position: [500, -70, -140], label: 'Ir a 9b', target: '/panoramas/9b.png' },
  ],

  '/panoramas/6b.png': [
    { id: 'to-5b-again', position: [-60, -130, -900], label: 'Ir a 5b', target: '/panoramas/11.png' },
  ],

'/panoramas/7b.png': [
    { id: 'to-11-again', position:[-40, 0, 30], label: 'Ir a 11', target: '/panoramas/11.png' },
  ],

  '/panoramas/8b.png': [
    { id: 'to-11-again', position: [-100, 0, 60], label: 'Ir a 11', target: '/panoramas/11.png' },
  ],

  '/panoramas/9b.png': [
    { id: 'to-11-again', position: [-700, -100, -400], label: 'Ir a 11', target: '/panoramas/11.png' },
    { id: 'to-10', position: [-300, -40, 60], label: 'Ir a 10', target: '/panoramas/10.png' },
  ],

  '/panoramas/10.png': [
    { id: 'to-9b-again', position: [-300, 0, -400], label: 'Ir a 1', target: '/panoramas/9b.png' },
  ],
};






export default HOTSPOTS_MAP;