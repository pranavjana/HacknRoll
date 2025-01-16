import { useState, useEffect, useRef } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';

// Import all sprite frames
const frames = [
  '/sprites/frame1.png',
  '/sprites/frame2.png',
  '/sprites/frame3.png',
  '/sprites/frame4.png',
];

export default function Pet() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const animationRef = useRef();

  // Animation loop
  useEffect(() => {
    if (!isPlaying) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    let lastTime = 0;
    const fps = 8; // Frames per second
    const frameInterval = 1500 / fps;

    const animate = (timestamp) => {
      if (!lastTime) lastTime = timestamp;
      const elapsed = timestamp - lastTime;

      if (elapsed > frameInterval) {
        setCurrentFrame((prev) => (prev + 1) % frames.length);
        lastTime = timestamp;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  const toggleAnimation = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-neutral-800">Your Pet</h2>
          <button
            onClick={toggleAnimation}
            className="btn btn-primary"
          >
            {isPlaying ? (
              <PauseIcon className="w-5 h-5" />
            ) : (
              <PlayIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="aspect-square bg-neutral-50 rounded-lg flex items-center justify-center overflow-hidden p-4" style={{ minHeight: '800px' }}>
          <img
            src={frames[currentFrame]}
            alt="Pet animation frame"
            className="w-auto h-auto max-w-full max-h-full object-contain image-rendering-pixelated scale-[6]"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-neutral-700 mb-2">
            Animation Controls
          </h3>
          <div className="flex gap-4">
            <div className="text-sm text-neutral-600">
              Current Frame: {currentFrame + 1} / {frames.length}
            </div>
            <div className="text-sm text-neutral-600">
              Status: {isPlaying ? 'Playing' : 'Paused'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 