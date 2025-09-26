import React, { useRef } from 'react';
import { Html } from '@react-three/drei';
import { Vector3, Vector3 as ThreeVector3 } from 'three';
import { useFrame } from '@react-three/fiber';

export default function Hotspot({
  id,
  position,
  label = 'Entrar',
  camera,
  onClick,
}: {
  id: string;
  position: ThreeVector3;
  label?: string;
  camera: any;
  onClick?: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const anchorRef = useRef<THREE.Object3D | null>(null);
  const tempWorldPos = new Vector3();
  const threshold = -0.35; // visible más tiempo

  // compute visibility using the anchor's world position (works when parent group rotates)
  useFrame(() => {
    if (!camera || !ref.current || !anchorRef.current) return;
    anchorRef.current.getWorldPosition(tempWorldPos);
    const camDir = new Vector3();
    camera.getWorldDirection(camDir);
    const toHotspot = tempWorldPos.clone().sub(camera.position).normalize();
    const dot = camDir.dot(toHotspot);
    const visible = dot > threshold;
    ref.current.style.transition = 'opacity 200ms ease, transform 200ms ease';
    ref.current.style.opacity = visible ? '1' : '0';
    ref.current.style.pointerEvents = visible ? 'auto' : 'none';
    ref.current.style.transform = visible ? 'translateY(0px) scale(1)' : 'translateY(8px) scale(0.96)';
  });

  return (
    <group ref={anchorRef} position={[position.x, position.y, position.z]}>
      <Html center>
        {/* keyframes local to the portal so no global CSS change required */}
        <style>{`
          @keyframes hotspot-pulse {
            0%   { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,255,255,0); }
            50%  { transform: scale(1.08); box-shadow: 0 10px 30px 6px rgba(0,0,0,0.18); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,255,255,0); }
          }
        `}</style>

        <div
          ref={ref}
          className="hotspot"
          onClick={() => onClick?.(id)}
          role="button"
          tabIndex={0}
          aria-label={label}
          style={{
            width: 68,
            height: 68,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#1f1f1f',
            color: '#fff',
            borderRadius: '50%',
            border: '3px solid #fff',
            boxShadow: '0 6px 18px rgba(0,0,0,0.35)',
            cursor: 'pointer',
            transformOrigin: 'center',
            opacity: 0,
            transition: 'opacity 180ms ease, transform 180ms ease',
            animation: 'hotspot-pulse 1600ms ease-in-out infinite',
            fontSize: 40,
            fontWeight: 700,
            userSelect: 'none',
          }}
        >
          {/* chevron up icon */}
          <svg width="46" height="46" viewBox="0 0 24 24" aria-hidden focusable="false">
            <path d="M6 15l6-6 6 6" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>
      </Html>
    </group>
  );
}