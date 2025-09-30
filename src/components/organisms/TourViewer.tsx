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
  blackoutMs = 25,
}: {
  src: string;
  hotspots?: HotspotDef[];
  onHotspotClick?: (id: string) => void;
  blackoutMs?: number; // milliseconds the blackout stays after ready
}) {
  const [contextLost, setContextLost] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false); // <- hide-until-ready flag
  const [blackout, setBlackout] = useState(false); // <- full-screen black overlay
  const blackoutTimerRef = useRef<number | null>(null);
  const navScheduledRef = useRef(false);
  const autoRotateDelay = 2500;
  const autoRotateSpeed = 0.0100;

  // Trigger blackout immediately when user clicks a hotspot
  const handleHotspotClick = (id: string) => {
    if (navScheduledRef.current) return; // prevent multiple rapid clicks
    setBlackout(true);
    navScheduledRef.current = true;
    // defer the actual src change to the next frame so blackout paints first
    requestAnimationFrame(() => {
      onHotspotClick?.(id);
    });
  };

  // reset navigation guard when src changes (navigation started)
  useEffect(() => {
    navScheduledRef.current = false;
  }, [src]);

  // reset ready flag whenever source changes so hide-until-ready re-applies
  useEffect(() => {
    setCanvasReady(false);
    // show blackout immediately when a new src arrives
    setBlackout(true);
    // clear any previous timers
    if (blackoutTimerRef.current) {
      clearTimeout(blackoutTimerRef.current);
      blackoutTimerRef.current = null;
    }
  }, [src]);

  // cleanup timer on unmount
  useEffect(() => () => { if (blackoutTimerRef.current) clearTimeout(blackoutTimerRef.current); }, []);

  // while blackout is shown, add a body class to suppress any portals visually above
  useEffect(() => {
    if (blackout) document.body.classList.add('blackout-open');
    else document.body.classList.remove('blackout-open');
    return () => document.body.classList.remove('blackout-open');
  }, [blackout]);

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <Suspense fallback={<div style={{ color: '#b58b00', padding: 24 }}>Cargando panorama…</div>}>
        <Canvas
          camera={{ fov: 85, position: [0, 0, 0.01] }}
          dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1}
          gl={{ antialias: true, powerPreference: 'low-power' }}
          style={{ width: '100%', height: '100vh', display: 'block', opacity: canvasReady ? 1 : 0, transition: 'opacity 240ms ease' }}
        >
          <Scene
            src={src}
            hotspots={hotspots}
            onHotspotClick={handleHotspotClick}
            autoRotateDelay={autoRotateDelay}
            autoRotateSpeed={autoRotateSpeed}
            setContextLost={setContextLost}
            onReady={(ready: boolean) => {
              setCanvasReady(ready);
              if (ready) {
                // keep screen black for 1s after ready/orientation
                if (blackoutTimerRef.current) clearTimeout(blackoutTimerRef.current);
                blackoutTimerRef.current = window.setTimeout(() => {
                  setBlackout(false);
                  blackoutTimerRef.current = null;
                }, Math.max(0, blackoutMs));
              }
            }}
          />
        </Canvas>
      </Suspense>

      {/* Blackout overlay to hide loading/initial orientation */}
      <div
        aria-hidden={!blackout}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#000',
          opacity: blackout ? 1 : 0,
          transition: blackout ? 'none' : 'opacity 240ms ease',
          pointerEvents: blackout ? 'auto' : 'none',
          zIndex: 999999, // ensure above all portals and UI
        }}
      />

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
  autoRotateDelay,
  autoRotateSpeed,
  setContextLost,
  onReady,
}: {
  src: string;
  hotspots: HotspotDef[];
  onHotspotClick?: (id: string) => void;
  autoRotateDelay: number;
  autoRotateSpeed: number;
  setContextLost: (v: boolean) => void;
  onReady?: (ready: boolean) => void;
}) {
  const [lastInteraction, setLastInteraction] = React.useState<number>(Date.now());
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
        const [stabilizing, setStabilizing] = React.useState(false);
        const framesSinceTextureRef = React.useRef(0);
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

  // We'll signal ready only AFTER we apply orientation to avoid any visible jump.

  const sphereRef = useRef<Mesh | null>(null);
  const groupRef = useRef<Group | null>(null);
  const controlsRef = useRef<any>(null);
  const { camera, gl } = useThree();
  const [stabilizing, setStabilizing] = React.useState(false);
  const stableFramesRef = React.useRef(0);
  const readySignaledRef = React.useRef(false);

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
  // compute polar and clamp to OrbitControls bounds to avoid internal clamping twitch
  const rawPolar = initialTargetVec ? Math.acos(Math.max(-1, Math.min(1, initialTargetVec.y / initR))) : Math.PI / 2;
  const MIN_POLAR = 0.3;
  const MAX_POLAR = Math.PI - 0.3;
  const initialPolar = Math.max(MIN_POLAR, Math.min(MAX_POLAR, rawPolar));

  useEffect(() => {
    if (!texture) return;
    // start stabilization window for initial frames
    setStabilizing(true);
    stableFramesRef.current = 0;
    readySignaledRef.current = false;
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
    setLastInteraction(Date.now());
    // do NOT signal ready yet; wait a couple frames in useFrame
  }, [texture, initialGroupY, initialPolar, onReady, camera]);

  useFrame((state, delta) => {
    if (!texture) return;

    // allow a couple frames to render after orientation & texture updates (prod stability)
    if (stabilizing) {
      controlsRef.current?.update?.();
      stableFramesRef.current += 1;
      if (stableFramesRef.current >= 2 && !readySignaledRef.current) {
        readySignaledRef.current = true;
        setStabilizing(false);
        onReady?.(true);
      }
      return; // skip autorotate during stabilization
    }

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
      <group ref={groupRef}>
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
        makeDefault
        enablePan={false}
        enableZoom={false}
        enableDamping={false}
        enabled={!stabilizing}
        onStart={() => setLastInteraction(Date.now())}
        onChange={() => setLastInteraction(Date.now())}
        rotateSpeed={-0.4}
        minPolarAngle={0.3}
        maxPolarAngle={Math.PI - 0.3}
      />
      <ambientLight intensity={0.6} />
    </>
  );
}