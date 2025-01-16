import { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import SubjectCard from './components/SubjectCard';
import ProgressBar from './components/ProgressBar';

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

export default function App() {
  const [subjects, setSubjects] = useState(loadSubjects);
  const [newSubject, setNewSubject] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [xp, setXP] = useState(loadXPData().xp);

  const { level, nextLevelXP } = calculateLevel(xp);

  // Save subjects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('subjects', JSON.stringify(subjects));
  }, [subjects]);

  // Save XP data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('xpData', JSON.stringify({ xp, level }));
  }, [xp, level]);

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (!newSubject.trim()) return;

    const subject = {
      id: Date.now(),
      title: newSubject.trim(),
      tasks: []
    };

    setSubjects([...subjects, subject]);
    setNewSubject('');
    setIsAdding(false);
  };

  const handleUpdateSubject = (updatedSubject, taskCompleted = false) => {
    if (taskCompleted) {
      // Award 10 XP for completing a task
      setXP(currentXP => currentXP + 10);
    }
    
    setSubjects(subjects.map(subject =>
      subject.id === updatedSubject.id ? updatedSubject : subject
    ));
  };

  const handleDeleteSubject = (subjectId) => {
    setSubjects(subjects.filter(subject => subject.id !== subjectId));
  };

  return (
    <div className="min-h-screen bg-neutral-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-800">
            PETRACK
          </h1>
          <button
            onClick={() => setIsAdding(true)}
            className="btn btn-primary flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            Add Subject
          </button>
        </div>

        <ProgressBar xp={xp} level={level} nextLevelXP={nextLevelXP} />

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {subjects.map(subject => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              onUpdate={handleUpdateSubject}
              onDelete={handleDeleteSubject}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
