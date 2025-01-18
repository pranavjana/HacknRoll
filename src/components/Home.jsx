import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { SparklesCore } from './ui/sparkles';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="relative min-h-[500px] flex items-center justify-center">
        {/* Background with sparkles */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-100 via-amber-50 to-white" />
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#f59e0b"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          {/* Stylized PAWGRESS title */}
          <h1 className="flex items-center justify-center text-6xl font-bold text-neutral-800 mb-6">
            <span>P</span>
            <FontAwesomeIcon 
              icon={faPaw} 
              className="mx-2 text-amber-500 transform -rotate-12 h-12"
            />
            <span>WGRESS</span>
          </h1>

          <p className="text-xl text-neutral-600 max-w-2xl mx-auto mb-8">
            Your personal task manager with a virtual pet companion. Complete tasks, earn rewards, and watch your pet grow!
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-12">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-neutral-800">Task Management</h2>
              </div>
              <p className="text-neutral-600">
                Organize your tasks by subject and track your progress. Each completed task earns you XP and coins!
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <FontAwesomeIcon icon={faPaw} className="h-6 w-6 text-amber-600" />
                </div>
                <h2 className="text-xl font-semibold text-neutral-800">Virtual Pet</h2>
              </div>
              <p className="text-neutral-600">
                Take care of your virtual pet companion! Use earned coins to buy food, toys, and accessories.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 