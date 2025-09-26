import { useEffect } from 'react';

const useAutoRotate = (isInteracting, rotationSpeed = 0.01) => {
  useEffect(() => {
    let animationFrameId;

    const rotate = () => {
      if (!isInteracting) {
        // Logic to rotate the panorama goes here
        // For example, you might update the rotation state of your viewer
      }
      animationFrameId = requestAnimationFrame(rotate);
    };

    rotate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInteracting, rotationSpeed]);
};

export default useAutoRotate;