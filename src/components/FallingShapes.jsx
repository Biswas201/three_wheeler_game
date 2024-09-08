import { useFrame } from '@react-three/fiber';
import { useState, useRef } from 'react';
import { RigidBody } from '@react-three/rapier';

export default function FallingShapes() {
  const [shapes, setShapes] = useState([]);
  const shapeRef = useRef();

  // Randomly generate shapes falling from the sky
  useFrame(() => {
    if (Math.random() > 0.99) {
      const newShape = {
        position: [Math.random() * 10 - 5, 5, Math.random() * 10 - 5],
        mass: Math.random() * 2,
      };
      setShapes((prevShapes) => [...prevShapes, newShape]);
    }
  });

  return (
    shapes.map((shape, index) => (
      <RigidBody key={index} mass={shape.mass}>
        <mesh ref={shapeRef} position={shape.position}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      </RigidBody>
    ))
  );
}
