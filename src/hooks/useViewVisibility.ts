import { useEffect, useState } from 'react';

const useViewVisibility = (hotspots) => {
  const [visibleHotspots, setVisibleHotspots] = useState([]);

  const checkVisibility = (currentView) => {
    const visible = hotspots.filter(hotspot => {
      const { position } = hotspot;
      // Assuming position is an object with x, y coordinates
      return isHotspotVisible(currentView, position);
    });
    setVisibleHotspots(visible);
  };

  const isHotspotVisible = (currentView, position) => {
    // Implement logic to determine if the hotspot is visible based on the current view
    // This could involve checking angles or distances
    // Placeholder logic for visibility check
    const angleThreshold = 45; // Example threshold
    const angleToHotspot = Math.atan2(position.y, position.x) * (180 / Math.PI);
    return Math.abs(currentView - angleToHotspot) < angleThreshold;
  };

  useEffect(() => {
    const handleViewChange = (currentView) => {
      checkVisibility(currentView);
    };

    // Assume there's a way to subscribe to view changes
    // This could be a context or a prop passed down from a parent component
    // Example: subscribeToViewChanges(handleViewChange);

    return () => {
      // Cleanup subscription if necessary
      // Example: unsubscribeFromViewChanges(handleViewChange);
    };
  }, [hotspots]);

  return visibleHotspots;
};

export default useViewVisibility;