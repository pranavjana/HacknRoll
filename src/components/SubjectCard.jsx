import { useState } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import TaskItem from './TaskItem';

export default function SubjectCard({ subject, onUpdate, onDelete, difficultyLevels }) {
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [taskDifficulty, setTaskDifficulty] = useState('MEDIUM');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    const updatedSubject = {
      ...subject,
      tasks: [
        ...subject.tasks,
        { 
          id: Date.now(), 
          content: newTask.trim(), 
          completed: false,
          difficulty: taskDifficulty
        }
      ]
    };
    onUpdate(updatedSubject);
    setNewTask('');
    setTaskDifficulty('MEDIUM'); // Reset to default
  };

  const handleToggleTask = (taskId) => {
    const task = subject.tasks.find(t => t.id === taskId);
    const wasCompleted = task.completed;
    
    const updatedSubject = {
      ...subject,
      tasks: subject.tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    };
    onUpdate(updatedSubject, !wasCompleted, task.difficulty);
  };

  const handleDeleteTask = (taskId) => {
    const updatedSubject = {
      ...subject,
      tasks: subject.tasks.filter(task => task.id !== taskId)
    };
    onUpdate(updatedSubject);
  };

  const handleEditTask = (taskId) => {
    const task = subject.tasks.find(t => t.id === taskId);
    if (task) {
      setEditingTask({ id: taskId, content: task.content, difficulty: task.difficulty });
    }
  };

  const handleUpdateTask = (e) => {
    e.preventDefault();
    if (!editingTask || !editingTask.content.trim()) return;

    const updatedSubject = {
      ...subject,
      tasks: subject.tasks.map(task =>
        task.id === editingTask.id
          ? { ...task, content: editingTask.content.trim(), difficulty: editingTask.difficulty }
          : task
      )
    };
    onUpdate(updatedSubject);
    setEditingTask(null);
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-neutral-800">{subject.title}</h2>
        <button
          onClick={() => onDelete(subject.id)}
          className="p-1 hover:bg-neutral-100 rounded"
        >
          <XMarkIcon className="w-5 h-5 text-neutral-500" />
        </button>
      </div>

      <div className="space-y-2 max-h-[300px] overflow-y-auto mb-4">
        {subject.tasks.map(task => (
          editingTask?.id === task.id ? (
            <form key={task.id} onSubmit={handleUpdateTask} className="space-y-2">
              <input
                type="text"
                value={editingTask.content}
                onChange={(e) => setEditingTask({ ...editingTask, content: e.target.value })}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400"
                autoFocus
              />
              <div className="flex gap-2">
                <select
                  value={editingTask.difficulty}
                  onChange={(e) => setEditingTask({ ...editingTask, difficulty: e.target.value })}
                  className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400 text-sm"
                >
                  {Object.entries(difficultyLevels).map(([key, { label }]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
                <button type="submit" className="btn btn-primary">Save</button>
                <button
                  type="button"
                  onClick={() => setEditingTask(null)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
              difficultyLevel={difficultyLevels[task.difficulty]}
            />
          )
        ))}
      </div>

      <form onSubmit={handleAddTask} className="space-y-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400"
        />
        <div className="flex gap-2">
          <select
            value={taskDifficulty}
            onChange={(e) => setTaskDifficulty(e.target.value)}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400 text-sm"
          >
            {Object.entries(difficultyLevels).map(([key, { label }]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          <button type="submit" className="btn btn-primary flex items-center gap-1">
            <PlusIcon className="w-5 h-5" />
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
} 