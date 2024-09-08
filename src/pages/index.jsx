import dynamic from 'next/dynamic';
const GameCanvas = dynamic(() => import('../components/GameCanvas'), { ssr: false });

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <GameCanvas />
    </div>
  );
}
