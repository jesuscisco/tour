import { useEffect, useState } from 'react';

interface Hotspot {
  id: string;
  position: { x: number; y: number; z?: number }; // agrega z si lo necesitas
  [key: string]: any; // otras propiedades opcionales
}

const useViewVisibility = (hotspots: Hotspot[], currentView?: number) => {
  const [visibleHotspots, setVisibleHotspots] = useState<Hotspot[]>([]);

  const checkVisibility = (view: number) => {
    const visible = hotspots.filter(hotspot => {
      const { position } = hotspot;
      return isHotspotVisible(view, position);
    });
    setVisibleHotspots(visible);
  };

  const isHotspotVisible = (view: number, position: { x: number; y: number }) => {
    const angleThreshold = 45; // ejemplo
    const angleToHotspot = Math.atan2(position.y, position.x) * (180 / Math.PI);
    return Math.abs(view - angleToHotspot) < angleThreshold;
  };

  useEffect(() => {
    if (currentView !== undefined) {
      checkVisibility(currentView);
    }
    // Aquí podrías suscribirte a cambios de vista si es necesario
  }, [hotspots, currentView]);

  return visibleHotspots;
};

export default useViewVisibility;
