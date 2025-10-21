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
    { id: 'to-12', position: [-95, 0, -900], label: 'ir a 12', target: '/panoramas/12.png' },
    { id: 'to-3', position: [80, 0, 5], label: 'ir a 3', target: '/panoramas/3.png' },
  ],
  '/panoramas/3.png': [
    { id: 'to-2-again', position: [350, 0, -700], label: 'Ir a 2', target: '/panoramas/2.png' },
    { id: 'to-4', position: [-120, 0, -115], label: 'Ir a 4', target: '/panoramas/4.png' },
  ],
    '/panoramas/4.png': [
    { id: 'to-3-again', position: [-80, -5, -3], label: 'Ir a 3', target: '/panoramas/3.png' },
    { id: 'to-5', position: [80, 0, -5], label: 'Ir a 5', target: '/panoramas/15.png' },
  ],
  '/panoramas/15.png': [
    { id: 'to-4-again', position: [-80, -5, -3], label: 'Ir a 4', target: '/panoramas/4.png' },
  ],

  '/panoramas/12.png': [
    { id: 'to-2-again', position: [400, -170, -120], label: 'Ir a 2', target: '/panoramas/2.png' },
    { id: 'to-13', position: [400, 220, 100], label: 'Ir a 13', target: '/panoramas/13.png' },
  ],

  '/panoramas/13.png': [
    { id: 'to-12-again', position: [100, -130, 800], label: 'Ir a 12', target: '/panoramas/12.png' },
    { id: 'to-14', position: [-100, -20, 30], label: 'Ir a 14', target: '/panoramas/14.png' },
    { id: 'to-17', position: [-100, -20, -80], label: 'Ir a 17', target: '/panoramas/17.png' },
    { id: 'to-18', position: [-60, -130, -900], label: 'Ir a 18', target: '/panoramas/18.png' },
    { id: 'to-19', position: [500, -70, -140], label: 'Ir a 19', target: '/panoramas/19.png' },
  ],

  '/panoramas/14.png': [
    { id: 'to-13-again', position: [-60, -130, -900], label: 'Ir a 13', target: '/panoramas/13.png' },
  ],

'/panoramas/17.png': [
    { id: 'to-13-again', position:[-40, 0, 30], label: 'Ir a 13', target: '/panoramas/13.png' },
  ],

  '/panoramas/18.png': [
    { id: 'to-13-again', position: [-100, 0, 60], label: 'Ir a 13', target: '/panoramas/13.png' },
  ],

  '/panoramas/19.png': [
    { id: 'to-13-again', position: [-700, -100, -400], label: 'Ir a 13', target: '/panoramas/13.png' },
    { id: 'to-10', position: [-300, -40, 60], label: 'Ir a 10', target: '/panoramas/10.png' },
  ],

  '/panoramas/10.png': [
    { id: 'to-19-again', position: [-300, 0, -400], label: 'Ir a 1', target: '/panoramas/19.png' },
  ],
};





export default HOTSPOTS_MAP;