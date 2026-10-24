import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Text, RoundedBox, Line } from '@react-three/drei';
import { categories } from '../data/categories';

const categoryPositionsR3F = [
  [0, 1.8, 0],     // top
  [1.6, 0.8, 0.3], // top-right
  [1.6, -0.8, 0.2], // bottom-right
  [0, -1.8, 0],    // bottom
  [-1.6, -0.8, 0.3], // bottom-left
  [-1.6, 0.8, 0.2],  // top-left
];

function CentralHub() {
  const meshRef = useRef(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.65, 32, 32]} />
        <meshStandardMaterial
          color="#14B8A6"
          transparent
          opacity={0.08}
        />
      </mesh>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial
          color="#0F766E"
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
      <Text
        position={[0, 0, 0.48]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
        fontWeight={800}
      >
        360°
      </Text>
    </group>
  );
}

function CategoryNode({
  position,
  category,
  index,
  onHover,
  onUnhover,
  onClick,
  isHovered,
}) {
  const groupRef = useRef(null);

  return (
    <Float
      speed={1.5 + index * 0.3}
      rotationIntensity={0.1}
      floatIntensity={0.4}
      floatingRange={[-0.08, 0.08]}
    >
      <group
        ref={groupRef}
        position={[position[0], position[1], position[2]]}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerEnter={(e) => {
          e.stopPropagation();
          onHover();
          document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={() => {
          onUnhover();
          document.body.style.cursor = 'default';
        }}
        scale={isHovered ? 1.12 : 1}
      >
        <RoundedBox
          args={[1.3, 0.85, 0.08]}
          radius={0.12}
          smoothness={4}
        >
          <meshStandardMaterial
            color={isHovered ? '#F0FDFA' : '#FFFFFF'}
            roughness={0.5}
            metalness={0}
            transparent
            opacity={0.95}
          />
        </RoundedBox>

        <mesh position={[0, 0.1, 0.05]}>
          <circleGeometry args={[0.18, 32]} />
          <meshStandardMaterial
            color={isHovered ? category.color : category.colorLight}
          />
        </mesh>

        <Text
          position={[0, -0.22, 0.05]}
          fontSize={0.1}
          color="#111827"
          anchorX="center"
          anchorY="middle"
          fontWeight={600}
          maxWidth={1.1}
        >
          {category.shortName}
        </Text>

        <Line
          points={[
            [0, 0, 0],
            [-position[0], -position[1], -position[2]],
          ]}
          color="#14B8A6"
          lineWidth={1}
          transparent
          opacity={isHovered ? 0.4 : 0.1}
        />
      </group>
    </Float>
  );
}

function ParallaxCamera() {
  const { camera } = useThree();

  useFrame(({ pointer }) => {
    camera.position.x += (pointer.x * 0.3 - camera.position.x) * 0.05;
    camera.position.y += (pointer.y * 0.3 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function Scene({ onCategoryClick }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <pointLight position={[-3, 2, 4]} intensity={0.3} color="#14B8A6" />

      <ParallaxCamera />
      <CentralHub />

      {categories.map((cat, idx) => (
        <CategoryNode
          key={cat.id}
          position={categoryPositionsR3F[idx]}
          category={cat}
          index={idx}
          onHover={() => setHoveredIdx(idx)}
          onUnhover={() => setHoveredIdx(null)}
          onClick={() => onCategoryClick(cat.slug)}
          isHovered={hoveredIdx === idx}
        />
      ))}
    </>
  );
}

export default function WebGLHero({ onCategoryClick }) {
  const [webglFailed, setWebglFailed] = useState(false);

  const isWebGLSupported = useMemo(() => {
    try {
      const canvas = document.createElement('canvas');
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch {
      return false;
    }
  }, []);

  if (!isWebGLSupported || webglFailed) {
    return null;
  }

  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 1.5]}
        onError={() => setWebglFailed(true)}
        style={{ background: 'transparent' }}
      >
        <Scene onCategoryClick={onCategoryClick} />
      </Canvas>
    </div>
  );
}
