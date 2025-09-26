import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface ThreeFbsViewerProps {
  panoramaUrl: string;
}

const ThreeFbsViewer: React.FC<ThreeFbsViewerProps> = ({ panoramaUrl }) => {
  const sphereRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = Math.PI; // Start with the panorama facing the user
    }
  }, []);

  return (
    <Canvas>
      <OrbitControls enableZoom={false} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Sphere ref={sphereRef} args={[100, 100, 100]} scale={[-1, 1, 1]}>
        <meshBasicMaterial
          attach="material"
          map={new THREE.TextureLoader().load(panoramaUrl)}
        />
      </Sphere>
    </Canvas>
  );
};

export default ThreeFbsViewer;
