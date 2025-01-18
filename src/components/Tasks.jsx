import { useState, useEffect } from 'react';
import { PlusIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import SubjectCard from './SubjectCard';
import ProgressBar from './ProgressBar';
import { Button } from './ui/button';
import { Input } from './ui/input';

const DIFFICULTY_LEVELS = {
  LOW: { label: 'Low', xp: 10, color: 'bg-green-100 text-green-800' },
  MEDIUM: { label: 'Medium', xp: 20, color: 'bg-yellow-100 text-yellow-800' },
  HIGH: { label: 'High', xp: 30, color: 'bg-red-100 text-red-800' }
};

const loadFromStorage = (key, defaultValue) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultValue;
};

const calculateLevel = (xp) => ({
  level: Math.floor(xp / 100),
  nextLevelXP: (Math.floor(xp / 100) + 1) * 100
});

export default function Tasks({ coins, onLevelUp }) {
  const [subjects, setSubjects] = useState(() => loadFromStorage('subjects', []));
  const [newSubject, setNewSubject] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [xp, setXP] = useState(() => loadFromStorage('xpData', { xp: 0, level: 0 }).xp);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [lastCheckedXP, setLastCheckedXP] = useState(xp);

  const { level, nextLevelXP } = calculateLevel(xp);

  useEffect(() => {
    localStorage.setItem('subjects', JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem('xpData', JSON.stringify({ xp, level }));
  }, [xp, level]);

  useEffect(() => {
    const previousLevel = calculateLevel(lastCheckedXP).level;
    const currentLevel = calculateLevel(xp).level;
    
    if (currentLevel > previousLevel) {
      onLevelUp();
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3000);
    }
    
    setLastCheckedXP(xp);
  }, [xp, lastCheckedXP, onLevelUp]);

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (!newSubject.trim()) return;

    setSubjects(prev => [...prev, {
      id: Date.now(),
      title: newSubject.trim(),
      tasks: []
    }]);
    setNewSubject('');
    setIsAdding(false);
  };

  const handleUpdateSubject = (updatedSubject, taskCompleted = false, taskDifficulty = 'MEDIUM') => {
    if (taskCompleted) {
      setXP(currentXP => currentXP + DIFFICULTY_LEVELS[taskDifficulty].xp);
    }
    
    setSubjects(prev => prev.map(subject =>
      subject.id === updatedSubject.id ? updatedSubject : subject
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-neutral-800">Your Tasks</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-md">
            <CurrencyDollarIcon className="w-5 h-5 text-amber-500" />
            <span className="font-medium text-amber-700">{coins}</span>
          </div>
          <Button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            Add Subject
          </Button>
        </div>
      </div>

      <ProgressBar xp={xp} level={level} nextLevelXP={nextLevelXP} />

      {showLevelUp && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg shadow-md animate-bounce">
          Level Up! +100 Coins
        </div>
      )}

      {isAdding && (
        <div className="mb-8">
          <form onSubmit={handleAddSubject} className="flex gap-2 max-w-md">
            <Input
              type="text"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              placeholder="Enter subject name..."
              autoFocus
            />
            <Button type="submit">Add</Button>
            <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map(subject => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            onUpdate={handleUpdateSubject}
            onDelete={(id) => setSubjects(prev => prev.filter(s => s.id !== id))}
            difficultyLevels={DIFFICULTY_LEVELS}
          />
        ))}
      </div>
    </div>
  );
} 