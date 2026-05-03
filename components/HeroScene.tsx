"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, useTexture } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const ACCENT = "#22d3ee";
const NODE_COUNT = 60;
const EDGE_DISTANCE = 1.9;

// Precomputed constellation — runs once at module load (client-only via dynamic import).
const CONSTELLATION_DATA = (() => {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    const theta = Math.random() * Math.PI * 2;
    const r = 3.6 + Math.random() * 2.4;
    const yJitter = (Math.random() - 0.5) * 2.4;
    const radialJitter = (Math.random() - 0.5) * 0.5;
    pts.push(
      new THREE.Vector3(
        (r + radialJitter) * Math.cos(theta),
        yJitter,
        (r + radialJitter) * Math.sin(theta) - 0.5
      )
    );
  }
  const positions = new Float32Array(pts.length * 3);
  pts.forEach((p, i) => {
    positions[i * 3] = p.x;
    positions[i * 3 + 1] = p.y;
    positions[i * 3 + 2] = p.z;
  });
  const edges: number[] = [];
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      if (pts[i].distanceTo(pts[j]) < EDGE_DISTANCE) {
        edges.push(pts[i].x, pts[i].y, pts[i].z);
        edges.push(pts[j].x, pts[j].y, pts[j].z);
      }
    }
  }
  return {
    positions,
    edges: new Float32Array(edges),
  };
})();

// ---------- Helmet logo: textured plane drifting in 3D ----------
function LogoPlane() {
  const ref = useRef<THREE.Mesh>(null);
  const tex = useTexture("/Revoca%20logo.svg");

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.03;
  });

  return (
    <Float floatIntensity={0.22} rotationIntensity={0.03} speed={0.6}>
      <group>
        <mesh position={[0, 0, -0.05]}>
          <circleGeometry args={[1.45, 64]} />
          <meshBasicMaterial
            color={ACCENT}
            transparent
            opacity={0.05}
            depthWrite={false}
          />
        </mesh>
        <mesh ref={ref}>
          <planeGeometry args={[1.8, 1.8]} />
          <meshBasicMaterial
            map={tex}
            transparent
            toneMapped={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </Float>
  );
}

// ---------- Constellation field (slow + subtle) ----------
function Constellation() {
  const groupRef = useRef<THREE.Group>(null);

  const pointsGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.BufferAttribute(CONSTELLATION_DATA.positions, 3)
    );
    return g;
  }, []);

  const linesGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.BufferAttribute(CONSTELLATION_DATA.edges, 3)
    );
    return g;
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Very slow rotation — barely perceptible
    groupRef.current.rotation.y += delta * 0.025;
  });

  return (
    <group ref={groupRef}>
      <points geometry={pointsGeom}>
        <pointsMaterial
          color={ACCENT}
          size={0.055}
          sizeAttenuation
          transparent
          opacity={0.65}
          depthWrite={false}
        />
      </points>
      <lineSegments geometry={linesGeom}>
        <lineBasicMaterial
          color={ACCENT}
          transparent
          opacity={0.07}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

// ---------- Camera with very subtle mouse drift ----------
function CameraRig() {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      // Reduced amplitude — barely-there parallax
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 0.25;
      target.current.y = -(e.clientY / window.innerHeight - 0.5) * 0.18;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(() => {
    /* eslint-disable react-hooks/immutability -- three.js scene graph is intentionally imperative */
    camera.position.x += (target.current.x - camera.position.x) * 0.025;
    camera.position.y += (target.current.y - camera.position.y) * 0.025;
    /* eslint-enable react-hooks/immutability */
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ---------- Static fallback (no WebGL) ----------
function StaticFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/Revoca%20logo.svg"
        alt="Revoca"
        className="w-[180px] h-[180px] rounded-full"
      />
    </div>
  );
}

// ---------- Public component ----------
export default function HeroScene({ className = "" }: { className?: string }) {
  const [enable3D] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    type DeviceMemoryNav = Navigator & { deviceMemory?: number };
    const lowMem = ((navigator as DeviceMemoryNav).deviceMemory ?? 8) < 4;
    return !reducedMotion && !lowMem;
  });

  if (!enable3D) {
    return <div className={className}><StaticFallback /></div>;
  }

  return (
    <div className={className}>
      <Canvas
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 7], fov: 45 }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 4, 5]} intensity={0.6} color="#ffffff" />
        <pointLight position={[-3, -2, 3]} intensity={0.6} color={ACCENT} />
        <Suspense fallback={null}>
          <LogoPlane />
          <Constellation />
        </Suspense>
        <CameraRig />
      </Canvas>
    </div>
  );
}
