import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import Vehicle from './Vehicle';
import FallingShapes from './FallingShapes';

export default function GameCanvas() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <Physics>
        <Vehicle />
        <FallingShapes />
      </Physics>
    </Canvas>
  );
}
