import { useState, useEffect, useRef } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';
import HealthBar from './HealthBar';
import ItemGrid from './ItemGrid';

// Import all sprite frames
const frames = [
  '/sprites/frame1.png',
  '/sprites/frame2.png',
  '/sprites/frame3.png',
  '/sprites/frame4.png',
];

// Background options
const backgrounds = {
  GRASS: '/background/grass1.jpg',
  PARK: '/background/park1.jpg',
  HOME: '/background/home1.jpg',
};

// Initial items data
const initialItems = [
  { id: 1, name: 'Bone Treat', type: 'food', quantity: 3 },
  { id: 2, name: 'Tennis Ball', type: 'toy', quantity: 2 },
  { id: 3, name: 'Pet Medicine', type: 'medicine', quantity: 1 },
  { id: 4, name: 'Chicken Snack', type: 'food', quantity: 5 },
  { id: 5, name: 'Squeaky Duck', type: 'toy', quantity: 1 },
  { id: 6, name: 'Vitamins', type: 'medicine', quantity: 2 },
];

export default function Pet() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [health, setHealth] = useState(80);
  const [items, setItems] = useState(initialItems);
  const [currentBackground, setCurrentBackground] = useState(backgrounds.GRASS);
  const animationRef = useRef();

  const MAX_HEALTH = 100;

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
    const frameInterval = 1000 / fps;

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

  const handleUseItem = (item) => {
    // Update item quantity
    setItems(items.map(i => 
      i.id === item.id 
        ? { ...i, quantity: i.quantity - 1 }
        : i
    ));

    // Apply item effects
    switch (item.type) {
      case 'food':
        setHealth(prev => Math.min(prev + 20, MAX_HEALTH));
        break;
      case 'toy':
        setHealth(prev => Math.min(prev + 10, MAX_HEALTH));
        break;
      case 'medicine':
        setHealth(prev => Math.min(prev + 50, MAX_HEALTH));
        break;
      default:
        break;
    }
  };

  const changeBackground = (background) => {
    setCurrentBackground(background);
  };

  // Simulate health decrease over time
  useEffect(() => {
    const interval = setInterval(() => {
      setHealth(prev => Math.max(prev - 1, 0));
    }, 10000); // Decrease health by 1 every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Pet Display Section */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-neutral-800">Your Pet</h2>
          <div className="flex gap-4 items-center">
            {/* Background selector */}
            <div className="flex gap-2">
              <button
                onClick={() => changeBackground(backgrounds.GRASS)}
                className={`w-8 h-8 rounded-full bg-green-100 border-2 transition-all ${
                  currentBackground === backgrounds.GRASS ? 'border-green-500 scale-110' : 'border-transparent'
                }`}
                title="Grass Background"
              />
              <button
                onClick={() => changeBackground(backgrounds.PARK)}
                className={`w-8 h-8 rounded-full bg-blue-100 border-2 transition-all ${
                  currentBackground === backgrounds.PARK ? 'border-blue-500 scale-110' : 'border-transparent'
                }`}
                title="Park Background"
              />
              <button
                onClick={() => changeBackground(backgrounds.HOME)}
                className={`w-8 h-8 rounded-full bg-yellow-100 border-2 transition-all ${
                  currentBackground === backgrounds.HOME ? 'border-yellow-500 scale-110' : 'border-transparent'
                }`}
                title="Home Background"
              />
            </div>
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
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Pet Sprite */}
          <div 
            className="aspect-square rounded-lg flex items-center justify-center overflow-hidden relative bg-neutral-50"
            style={{
              backgroundImage: `url(${currentBackground})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Platform shadow */}
            <div className="absolute bottom-12 w-32 h-8 bg-black/10 rounded-full blur-sm" />
            
            {/* Pet sprite */}
            <div className="relative translate-y-16">
              <img
                src={frames[currentFrame]}
                alt="Pet animation frame"
                className="w-auto h-auto max-w-full max-h-full object-contain image-rendering-pixelated scale-[4]"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
          </div>

          {/* Pet Stats */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-neutral-700 mb-3">Pet Health</h3>
              <HealthBar health={health} maxHealth={MAX_HEALTH} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-neutral-700 mb-2">Status</h3>
              <div className="space-y-2">
                <div className="text-sm text-neutral-600">
                  Mood: {health > 80 ? 'Happy! 😊' : health > 50 ? 'Content 😌' : health > 20 ? 'Hungry 😕' : 'Sad 😢'}
                </div>
                <div className="text-sm text-neutral-600">
                  Animation: {isPlaying ? 'Playing' : 'Paused'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Items Section */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-neutral-800 mb-6">Your Items</h2>
        <ItemGrid items={items} onUseItem={handleUseItem} />
      </div>
    </div>
  );
} 