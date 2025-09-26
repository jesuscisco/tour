import dynamic from 'next/dynamic';
import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Texture, Vector3, BackSide, SRGBColorSpace, LinearMipMapLinearFilter } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import type { Mesh, Group } from 'three';
import { Html, OrbitControls } from '@react-three/drei';
import Hotspot from './Hotspot';
import PANORAMA_META from '../../data/panoramas';

const Canvas = dynamic(() => import('@react-three/fiber').then(m => m.Canvas), { ssr: false });

type HotspotDef = { id: string; position: [number, number, number]; label?: string; target?: string };

// helper: lon/lat -> xyz (same as antes)
function posFromLonLat(lonDeg: number, latDeg: number, radius = 500) {
  const lon = (lonDeg * Math.PI) / 180;
  const lat = (latDeg * Math.PI) / 180;
  const phi = (Math.PI / 2) - lat;
  const theta = lon + Math.PI;
  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return [x, y, z] as [number, number, number];
}

export default function TourViewer({
  src,
  hotspots = [],
  onHotspotClick,
}: {
  src: string;
  hotspots?: HotspotDef[];
  onHotspotClick?: (id: string) => void;
}) {
  const [lastInteraction, setLastInteraction] = useState<number>(Date.now());
  const [contextLost, setContextLost] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false); // <- hide-until-ready flag
  const autoRotateDelay = 2500;
  const autoRotateSpeed = 0.0100;

  // reset ready flag whenever source changes so hide-until-ready re-applies
  useEffect(() => {
    setCanvasReady(false);
  }, [src]);

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <Suspense fallback={<div style={{ color: '#b58b00', padding: 24 }}>Cargando panorama…</div>}>
        <div
          aria-hidden={!canvasReady}
          style={{
            width: '100%',
            height: '100vh',
            opacity: canvasReady ? 1 : 0,
            transition: 'opacity 240ms ease',
            pointerEvents: canvasReady ? 'auto' : 'none',
          }}
        >
          <Canvas
            camera={{ fov: 85, position: [0, 0, 0.01] }}
            dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1}
            gl={{ antialias: true, powerPreference: 'low-power' }}
          >
            <Scene
              src={src}
              hotspots={hotspots}
              onHotspotClick={onHotspotClick}
              lastInteraction={lastInteraction}
              setLastInteraction={() => setLastInteraction(Date.now())}
              autoRotateDelay={autoRotateDelay}
              autoRotateSpeed={autoRotateSpeed}
              setContextLost={setContextLost}
              onReady={(ready: boolean) => setCanvasReady(ready)}
            />
          </Canvas>
        </div>
      </Suspense>

      {contextLost && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.2))', color:'#fff', zIndex: 40
        }}>
          <div style={{ textAlign: 'center', maxWidth: 560 }}>
            <h3 style={{ marginBottom: 8 }}>Se perdió el contexto WebGL</h3>
            <p style={{ marginBottom: 16 }}>Reduce la resolución del panorama o recarga la página manualmente.</p>
            <button onClick={() => location.reload()} style={{ background:'#b58b00', color:'#111', border: 'none', padding:'8px 16px', borderRadius:8, cursor:'pointer' }}>Recargar</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Scene({
  src,
  hotspots,
  onHotspotClick,
  lastInteraction,
  setLastInteraction,
  autoRotateDelay,
  autoRotateSpeed,
  setContextLost,
  onReady,
}: {
  src: string;
  hotspots: HotspotDef[];
  onHotspotClick?: (id: string) => void;
  lastInteraction: number;
  setLastInteraction: () => void;
  autoRotateDelay: number;
  autoRotateSpeed: number;
  setContextLost: (v: boolean) => void;
  onReady?: (ready: boolean) => void;
}) {
  const [imageBitmap, setImageBitmap] = React.useState<ImageBitmap | null>(null);

  useEffect(() => {
    let mounted = true;
    let currentBitmap: ImageBitmap | null = null;
    (async () => {
      try {
        const res = await fetch(src);
        if (!res.ok) {
          console.error('Failed fetching panorama', res.status, src);
          setContextLost(true);
          return;
        }
        const blob = await res.blob();
        currentBitmap = await createImageBitmap(blob);
        if (mounted) setImageBitmap(currentBitmap);
      } catch (err) {
        console.error('Error creating ImageBitmap', err);
        setContextLost(true);
      }
    })();
    return () => {
      mounted = false;
      if (currentBitmap && typeof currentBitmap.close === 'function') currentBitmap.close();
    };
  }, [src, setContextLost]);

  const texture = React.useMemo(() => {
    if (!imageBitmap) return null;
    const t = new Texture(imageBitmap);
    // sRGB handling
    // @ts-ignore
    if ('colorSpace' in t) t.colorSpace = SRGBColorSpace;
    else (t as any).encoding = SRGBColorSpace as any;
    t.minFilter = LinearMipMapLinearFilter;
    t.generateMipmaps = true;
    t.flipY = false;
    t.center.set(0.5, 0.5);
    t.rotation = Math.PI;
    t.needsUpdate = true;
    return t;
  }, [imageBitmap]);

  // notify parent when texture becomes available (useEffect so it runs after texture memo sets)
  useEffect(() => {
    onReady?.(!!texture);
  }, [texture, onReady]);

  const sphereRef = useRef<Mesh | null>(null);
  const groupRef = useRef<Group | null>(null);
  const controlsRef = useRef<any>(null);
  const { camera, gl } = useThree();

  // quality tuning
  useEffect(() => {
    if (!texture || !gl) return;
    try {
      // @ts-ignore
      const maxAniso = gl?.capabilities?.getMaxAnisotropy?.() ?? 1;
      // @ts-ignore
      texture.anisotropy = Math.max(1, Math.min(maxAniso, 16));
      // @ts-ignore
      texture.minFilter = (LinearMipMapLinearFilter as any) ?? texture.minFilter;
      texture.needsUpdate = true;
    } catch (e) { /* ignore */ }
  }, [texture, gl]);

  // immediate initial orientation (no animation)
  const meta = PANORAMA_META[src];
  let initialTargetVec: Vector3 | null = null;
  if (meta && typeof meta.initialLon === 'number' && typeof meta.initialLat === 'number') {
    const [x, y, z] = posFromLonLat(meta.initialLon, meta.initialLat, meta.radius ?? 500);
    initialTargetVec = new Vector3(x, y, z);
  } else if (hotspots && hotspots.length > 0) {
    initialTargetVec = new Vector3(...hotspots[0].position);
  }
  const initR = initialTargetVec ? initialTargetVec.length() || 1 : 1;
  const initialGroupY = initialTargetVec ? -Math.atan2(initialTargetVec.x, initialTargetVec.z) : 0;
  const initialPolar = initialTargetVec ? Math.acos(Math.max(-1, Math.min(1, initialTargetVec.y / initR))) : Math.PI / 2;

  useEffect(() => {
    if (!texture) return;
    // apply immediately
    if (groupRef.current) groupRef.current.rotation.y = initialGroupY;
    if (controlsRef.current) {
      try {
        if (controlsRef.current.setAzimuthalAngle) controlsRef.current.setAzimuthalAngle(0);
        if (controlsRef.current.setPolarAngle) controlsRef.current.setPolarAngle(initialPolar);
        controlsRef.current.update?.();
      } catch (e) {
        if (camera && initialTargetVec) {
          camera.lookAt(initialTargetVec);
          camera.updateMatrixWorld();
        }
      }
    } else if (camera && initialTargetVec) {
      camera.lookAt(initialTargetVec);
      camera.updateMatrixWorld();
    }
    // prevent instant auto-rotate kick
    setLastInteraction();
  }, [texture, initialGroupY, initialPolar]);

  useFrame((state, delta) => {
    if (!texture) return;
    const idle = Date.now() - lastInteraction > autoRotateDelay;
    if (groupRef.current && idle) {
      groupRef.current.rotation.y += autoRotateSpeed * delta * 3;
    }
    if (controlsRef.current) controlsRef.current.update?.();
  });

  if (!texture) {
    return <Html center><div style={{ background: 'rgba(0,0,0,0.6)', color: '#fff', padding: 12, borderRadius: 8 }}>Cargando panorama…</div></Html>;
  }

  return (
    <>
      <group ref={groupRef} rotation={[0, initialGroupY, 0]}>
        <mesh ref={sphereRef} scale={[1, 1, 1]}>
          <sphereGeometry args={[500, 80, 60]} />
          <meshBasicMaterial map={texture} side={BackSide} />
        </mesh>

        {hotspots.map(h => (
          <Hotspot
            key={h.id}
            id={h.id}
            position={new Vector3(...h.position)}
            label={h.label}
            camera={camera}
            onClick={(id) => onHotspotClick?.(id)}
          />
        ))}
      </group>

      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={false}
        enableDamping={false}
        onStart={setLastInteraction}
        onChange={setLastInteraction}
        rotateSpeed={-0.4}
        minPolarAngle={0.3}
        maxPolarAngle={Math.PI - 0.3}
      />
      <ambientLight intensity={0.6} />
    </>
  );
}