import { useEffect } from 'react';

const useAutoRotate = (isInteracting: boolean, rotationSpeed: number = 0.01) => {
  useEffect(() => {
    let animationFrameId: number;

    const rotate = () => {
      if (!isInteracting) {
        // Aquí pondrías la lógica para rotar tu panorama
        // Por ejemplo, actualizando la rotación de tu viewer
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
