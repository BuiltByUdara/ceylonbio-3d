"use client";
import { Suspense, useRef } from "react";
import { Canvas, ThreeEvent, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei/core/OrbitControls";
import { ContactShadows } from "@react-three/drei/core/ContactShadows";
import * as THREE from "three";
import { structures, ModelId } from "@/lib/data";
import { useStudio } from "@/lib/store";
type PartProps = {
  id: string;
  color: string;
  position: [number, number, number];
  scale?: [number, number, number];
  size?: number;
};
function Part({
  id,
  color,
  position,
  scale = [1, 1, 1],
  size = 0.7,
}: PartProps) {
  const { selected, select } = useStudio();
  return (
    <mesh
      position={position}
      scale={scale}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        select(id);
      }}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      <sphereGeometry args={[size, 48, 32]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.32}
        metalness={0.08}
        clearcoat={0.5}
        emissive={color}
        emissiveIntensity={selected === id ? 0.4 : 0.025}
      />
    </mesh>
  );
}
function Heart({ playing }: { playing: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const s = playing
        ? 1 +
          0.035 * Math.sin(clock.elapsedTime * 7) +
          0.015 * Math.sin(clock.elapsedTime * 14)
        : 1;
      ref.current.scale.setScalar(s);
    }
  });
  return (
    <group ref={ref} rotation={[0, 0, -0.16]} position={[0, -0.15, 0]}>
      <Part
        id="lv"
        color="#b74659"
        position={[0.42, -0.42, 0.05]}
        scale={[0.83, 1.4, 0.85]}
        size={0.87}
      />
      <Part
        id="rv"
        color="#895178"
        position={[-0.48, -0.3, 0.1]}
        scale={[0.9, 1.2, 0.85]}
        size={0.73}
      />
      <Part
        id="la"
        color="#d57481"
        position={[0.53, 0.7, 0]}
        scale={[1, 0.8, 0.8]}
        size={0.56}
      />
      <Part
        id="ra"
        color="#7970a4"
        position={[-0.57, 0.65, 0]}
        scale={[0.9, 1, 0.9]}
        size={0.57}
      />
      {[
        { x: 0.15, y: 1.1, c: "#cf6b76", r: -0.3 },
        { x: -0.38, y: 1.28, c: "#7583b3", r: 0.12 },
        { x: 0.67, y: 1.12, c: "#bd6378", r: -0.65 },
      ].map((v, i) => (
        <mesh key={i} position={[v.x, v.y, -0.16]} rotation={[0, 0, v.r]}>
          <cylinderGeometry args={[0.19, 0.23, 1.1, 32]} />
          <meshStandardMaterial color={v.c} roughness={0.4} />
        </mesh>
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <mesh
          key={i}
          position={[
            0.05 + Math.sin(i * 0.5) * 0.2,
            0.5 - i * 0.19,
            0.69 - i * 0.015,
          ]}
          rotation={[0, 0, -0.3]}
        >
          <sphereGeometry args={[0.048, 12, 12]} />
          <meshStandardMaterial color="#ef9ba1" />
        </mesh>
      ))}
    </group>
  );
}
function Model({ model, playing }: { model: ModelId; playing: boolean }) {
  if (model === "heart") return <Heart playing={playing} />;
  if (model === "brain")
    return (
      <group rotation={[0, 0.2, 0]}>
        {structures.brain.map((s, i) => (
          <group key={s.id}>
            {Array.from({ length: 8 }, (_, j) => (
              <Part
                key={j}
                id={s.id}
                color={s.color}
                position={[
                  (i % 2 ? 0.52 : -0.5) + (j % 2) * 0.25,
                  Math.floor(i / 2) ? -0.5 : 0.45,
                  (Math.floor(j / 2) - 1.5) * 0.32,
                ]}
                scale={[1, 0.8, 1]}
                size={0.48}
              />
            ))}
          </group>
        ))}
        <mesh position={[0, -1.1, 0]}>
          <cylinderGeometry args={[0.18, 0.13, 0.65, 24]} />
          <meshStandardMaterial color="#e0b4bb" />
        </mesh>
      </group>
    );
  if (model === "dna")
    return (
      <group rotation={[0, 0, -0.25]}>
        {Array.from({ length: 18 }, (_, i) => {
          const a = i * 0.49,
            x = Math.cos(a) * 0.85,
            z = Math.sin(a) * 0.85,
            y = (i - 8.5) * 0.19;
          return (
            <group key={i}>
              <Part
                id={i % 2 ? "gc" : "at"}
                color="#67e8f9"
                position={[x, y, z]}
                size={0.12}
              />
              <Part
                id={i % 2 ? "gc" : "at"}
                color="#a78bfa"
                position={[-x, y, -z]}
                size={0.12}
              />
              <mesh
                position={[0, y, 0]}
                rotation={[0, -a, Math.PI / 2]}
                onClick={(e) => {
                  e.stopPropagation();
                  useStudio.getState().select(i % 2 ? "gc" : "at");
                }}
              >
                <cylinderGeometry args={[0.045, 0.045, 1.7, 12]} />
                <meshStandardMaterial color={i % 2 ? "#a78bfa" : "#6ee7b7"} />
              </mesh>
            </group>
          );
        })}
      </group>
    );
  return (
    <group rotation={[0.25, 0, 0.15]}>
      {Array.from({ length: 42 }, (_, i) => {
        const x = ((i % 7) - 3) * 0.39,
          z = (Math.floor(i / 7) - 2.5) * 0.38;
        return (
          <group key={i}>
            {[-1, 1].map((side) => (
              <group key={side}>
                <Part
                  id="head"
                  color="#67e8f9"
                  position={[x, side * 0.5, z]}
                  size={0.14}
                />
                {[-0.055, 0.055].map((d) => (
                  <mesh
                    key={d}
                    position={[x + d, side * 0.26, z]}
                    onClick={(e) => {
                      e.stopPropagation();
                      useStudio.getState().select("tail");
                    }}
                  >
                    <cylinderGeometry args={[0.026, 0.026, 0.38, 8]} />
                    <meshStandardMaterial color="#a78bfa" />
                  </mesh>
                ))}
              </group>
            ))}
          </group>
        );
      })}
      <Part
        id="protein"
        color="#6ee7b7"
        position={[0, 0, 0]}
        scale={[0.6, 1.6, 0.6]}
        size={0.47}
      />
    </group>
  );
}
export default function Scene({
  model,
  playing,
  reset,
}: {
  model: ModelId;
  playing: boolean;
  reset: number;
}) {
  return (
    <Canvas
      key={reset}
      camera={{ position: [0, 0.3, 5.8], fov: 40 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onPointerMissed={() => useStudio.getState().select(null)}
      aria-label={`Interactive ${model} schematic`}
    >
      <color attach="background" args={["#101c2b"]} />
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 5, 5]} intensity={3} />
      <pointLight position={[-4, 0, 2]} color="#67e8f9" intensity={12} />
      <Suspense fallback={null}>
        <Model model={model} playing={playing} />
        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.3}
          scale={10}
          blur={2}
          far={4}
        />
      </Suspense>
      <OrbitControls
        makeDefault
        enablePan={false}
        minDistance={3.5}
        maxDistance={9}
        autoRotate={playing && model !== "heart"}
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}
