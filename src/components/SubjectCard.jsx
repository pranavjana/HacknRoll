import { useState } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import TaskItem from './TaskItem';

export default function SubjectCard({ subject, onUpdate, onDelete }) {
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    const updatedSubject = {
      ...subject,
      tasks: [
        ...subject.tasks,
        { id: Date.now(), content: newTask.trim(), completed: false }
      ]
    };
    onUpdate(updatedSubject);
    setNewTask('');
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
    onUpdate(updatedSubject, !wasCompleted);
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
      setEditingTask({ id: taskId, content: task.content });
    }
  };

  const handleUpdateTask = (e) => {
    e.preventDefault();
    if (!editingTask || !editingTask.content.trim()) return;

    const updatedSubject = {
      ...subject,
      tasks: subject.tasks.map(task =>
        task.id === editingTask.id
          ? { ...task, content: editingTask.content.trim() }
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
            <form key={task.id} onSubmit={handleUpdateTask} className="flex gap-2">
              <input
                type="text"
                value={editingTask.content}
                onChange={(e) => setEditingTask({ ...editingTask, content: e.target.value })}
                className="flex-grow px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400"
                autoFocus
              />
              <button type="submit" className="btn btn-primary">Save</button>
              <button
                type="button"
                onClick={() => setEditingTask(null)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </form>
          ) : (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
            />
          )
        ))}
      </div>

      <form onSubmit={handleAddTask} className="flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400"
        />
        <button type="submit" className="btn btn-primary">
          <PlusIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
} 