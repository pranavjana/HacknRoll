import { useState, useEffect, useRef } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';
import HealthBar from './HealthBar';
import DraggableItem from './DraggableItem';
import WoofBubble from './WoofBubble';

// Import all sprite frames
const frames = [
  '/sprites/sit1.png',
  '/sprites/sit2.png',
  '/sprites/sit3.png',
  '/sprites/sit4.png',
  '/sprites/sit5.png',
  '/sprites/sit6.png',
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
  const [isDragOver, setIsDragOver] = useState(false);
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

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    try {
      const item = JSON.parse(e.dataTransfer.getData('application/json'));
      if (item && item.quantity > 0) {
        handleUseItem(item);
      }
    } catch (error) {
      console.error('Error processing dropped item:', error);
    }
  };

  // Simulate health decrease over time
  useEffect(() => {
    const interval = setInterval(() => {
      setHealth(prev => Math.max(prev - 1, 0));
    }, 10000); // Decrease health by 1 every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-4 max-w-7xl mx-auto h-screen p-4">
      {/* Main Content */}
      <div className="flex-grow space-y-4">
        {/* Pet Display Card */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-bold text-neutral-800">Your Pet</h2>
            <div className="flex gap-3 items-center">
              {/* Background selector */}
              <div className="flex gap-1">
                <button
                  onClick={() => changeBackground(backgrounds.GRASS)}
                  className={`w-6 h-6 rounded-full bg-green-100 border-2 transition-all ${
                    currentBackground === backgrounds.GRASS ? 'border-green-500 scale-110' : 'border-transparent'
                  }`}
                  title="Grass Background"
                />
                <button
                  onClick={() => changeBackground(backgrounds.PARK)}
                  className={`w-6 h-6 rounded-full bg-blue-100 border-2 transition-all ${
                    currentBackground === backgrounds.PARK ? 'border-blue-500 scale-110' : 'border-transparent'
                  }`}
                  title="Park Background"
                />
                <button
                  onClick={() => changeBackground(backgrounds.HOME)}
                  className={`w-6 h-6 rounded-full bg-yellow-100 border-2 transition-all ${
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
                  <PauseIcon className="w-4 h-4" />
                ) : (
                  <PlayIcon className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Pet Display Area */}
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              w-full h-[400px] rounded-lg flex items-center justify-center overflow-hidden relative bg-neutral-50
              transition-all duration-200
              ${isDragOver ? 'ring-4 ring-emerald-400 ring-opacity-50 scale-[1.02]' : ''}
            `}
            style={{
              backgroundImage: `url(${currentBackground})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Drop zone hint */}
            {isDragOver && (
              <div className="absolute inset-0 bg-emerald-500 bg-opacity-10 flex items-center justify-center">
                <div className="bg-white bg-opacity-90 px-4 py-2 rounded-full text-sm font-medium text-emerald-600">
                  Drop item here to use
                </div>
              </div>
            )}

            {/* Platform shadow */}
            <div className="absolute bottom-12 w-32 h-8 bg-black/10 rounded-full blur-sm" />
            
            {/* Pet sprite */}
            <div className="relative translate-y-16">
              <WoofBubble />
              <img
                src={frames[currentFrame]}
                alt="Pet animation frame"
                className="w-auto h-auto max-w-full max-h-full object-contain image-rendering-pixelated scale-[4]"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
          </div>
        </div>

        {/* Pet Stats Card */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Health Section */}
            <div>
              <h3 className="text-base font-semibold text-neutral-700 mb-2">Pet Health</h3>
              <HealthBar health={health} maxHealth={MAX_HEALTH} />
            </div>

            {/* Status Section */}
            <div>
              <h3 className="text-base font-semibold text-neutral-700 mb-2">Status</h3>
              <div className="space-y-1">
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

      {/* Side Panel - Items */}
      <div className="w-72 flex-shrink-0 bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-lg font-bold text-neutral-800 mb-2">Your Items</h2>
        <p className="text-xs text-neutral-600 mb-4">
          Drag items onto your pet to use them
        </p>
        <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-160px)]">
          {items.map(item => (
            <DraggableItem
              key={item.id}
              item={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 