export default function Home() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-neutral-800 mb-4">
          Welcome to PETRACK
        </h1>
        <p className="text-neutral-600 mb-6">
          Your personal task manager with a virtual pet companion! Complete tasks to earn XP and level up.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-neutral-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-neutral-800 mb-3">Tasks</h2>
            <p className="text-neutral-600">
              Organize your tasks by subject and track your progress. Each completed task earns you XP!
            </p>
          </div>
          <div className="bg-neutral-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-neutral-800 mb-3">Virtual Pet</h2>
            <p className="text-neutral-600">
              Visit your virtual pet and watch it animate! Your pet grows happier as you complete more tasks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 