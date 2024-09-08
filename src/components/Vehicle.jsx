import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useRef, useState, useEffect } from 'react';
import { RigidBody } from '@react-three/rapier'; // Import RigidBody

export default function Vehicle() {
  const vehicle = useRef();
  const [velocity, setVelocity] = useState(new Vector3(0, 0, 0)); // to store the velocity
  const [keysPressed, setKeysPressed] = useState({
    w: false,
    s: false,
  });

  // Keypress event handlers
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === 'w') setKeysPressed((prev) => ({ ...prev, w: true }));
      if (e.key.toLowerCase() === 's') setKeysPressed((prev) => ({ ...prev, s: true }));
    };

    const handleKeyUp = (e) => {
      if (e.key.toLowerCase() === 'w') setKeysPressed((prev) => ({ ...prev, w: false }));
      if (e.key.toLowerCase() === 's') setKeysPressed((prev) => ({ ...prev, s: false }));
    };

    // Attach event listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame(({ mouse, camera, raycaster }) => {
    const vehiclePos = vehicle.current.position;

    // Project mouse position into 3D world space
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(vehicle.current);
    if (intersects.length) {
      const direction = new Vector3()
        .subVectors(intersects[0].point, vehiclePos) // Vector from vehicle to cursor
        .normalize(); // Get unit direction vector

      // Adjust speed and movement based on keypresses
      const speed = 0.05; // Speed of movement
      if (keysPressed.w) {
        setVelocity(direction.multiplyScalar(speed)); // Move forward in the direction of cursor
      }
      if (keysPressed.s) {
        setVelocity(direction.multiplyScalar(-speed)); // Move backward
      }

      // Update vehicle's position
      vehicle.current.position.add(velocity);
    }
  });

  return (
    <group ref={vehicle}>
      <RigidBody type="dynamic"> {/* Use RigidBody for physics */}
        {/* Front sphere wheel */}
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.3]} />
          <meshStandardMaterial color="blue" />
        </mesh>

        {/* Back cylinder wheels */}
        <mesh position={[-0.5, 0.5, -0.5]}>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
          <meshStandardMaterial color="red" />
        </mesh>
        <mesh position={[0.5, 0.5, -0.5]}>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
          <meshStandardMaterial color="red" />
        </mesh>

        {/* Vehicle body */}
        <mesh position={[0, 0.5, -1]}>
          <boxGeometry args={[1, 0.5, 1]} />
          <meshStandardMaterial color="green" />
        </mesh>
      </RigidBody>
    </group>
  );
}
