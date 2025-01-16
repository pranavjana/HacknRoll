import { useState, useEffect } from 'react';
import { PlusIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import SubjectCard from './SubjectCard';
import ProgressBar from './ProgressBar';

// Task difficulty levels and their XP rewards
const DIFFICULTY_LEVELS = {
  LOW: { label: 'Low', xp: 10, color: 'bg-green-100 text-green-800' },
  MEDIUM: { label: 'Medium', xp: 20, color: 'bg-yellow-100 text-yellow-800' },
  HIGH: { label: 'High', xp: 30, color: 'bg-red-100 text-red-800' }
};

// Load subjects from localStorage or use empty array
const loadSubjects = () => {
  const saved = localStorage.getItem('subjects');
  return saved ? JSON.parse(saved) : [];
};

// Load XP data from localStorage or use defaults
const loadXPData = () => {
  const saved = localStorage.getItem('xpData');
  return saved ? JSON.parse(saved) : { xp: 0, level: 0 };
};

// Calculate level and next level XP threshold
const calculateLevel = (xp) => {
  const level = Math.floor(xp / 100);
  const nextLevelXP = (level + 1) * 100;
  return { level, nextLevelXP };
};

export default function Tasks({ coins, onLevelUp }) {
  const [subjects, setSubjects] = useState(loadSubjects);
  const [newSubject, setNewSubject] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [xp, setXP] = useState(loadXPData().xp);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [lastCheckedXP, setLastCheckedXP] = useState(xp);

  const { level, nextLevelXP } = calculateLevel(xp);

  // Save subjects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('subjects', JSON.stringify(subjects));
  }, [subjects]);

  // Save XP data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('xpData', JSON.stringify({ xp, level }));
  }, [xp, level]);

  // Handle level-up logic
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

    const subject = {
      id: Date.now(),
      title: newSubject.trim(),
      tasks: []
    };

    setSubjects(prevSubjects => [...prevSubjects, subject]);
    setNewSubject('');
    setIsAdding(false);
  };

  const handleUpdateSubject = (updatedSubject, taskCompleted = false, taskDifficulty = 'MEDIUM') => {
    if (taskCompleted) {
      // Award XP based on task difficulty
      const xpReward = DIFFICULTY_LEVELS[taskDifficulty].xp;
      setXP(currentXP => currentXP + xpReward);
    }
    
    setSubjects(prevSubjects => 
      prevSubjects.map(subject =>
        subject.id === updatedSubject.id ? updatedSubject : subject
      )
    );
  };

  const handleDeleteSubject = (subjectId) => {
    setSubjects(prevSubjects => 
      prevSubjects.filter(subject => subject.id !== subjectId)
    );
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
          <button
            onClick={() => setIsAdding(true)}
            className="btn btn-primary flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            Add Subject
          </button>
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
            <input
              type="text"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              placeholder="Enter subject name..."
              className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400"
              autoFocus
            />
            <button type="submit" className="btn btn-primary">
              Add
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map(subject => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            onUpdate={handleUpdateSubject}
            onDelete={handleDeleteSubject}
            difficultyLevels={DIFFICULTY_LEVELS}
          />
        ))}
      </div>
    </div>
  );
} 