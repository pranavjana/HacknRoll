import { CheckCircleIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  return (
    <div className="task-item">
      <button
        onClick={() => onToggle(task.id)}
        className="flex-shrink-0"
      >
        <CheckCircleIcon
          className={`w-5 h-5 ${
            task.completed
              ? 'text-green-500 fill-current'
              : 'text-neutral-400'
          }`}
        />
      </button>
      <span
        className={`flex-grow ${
          task.completed ? 'line-through text-neutral-400' : ''
        }`}
      >
        {task.content}
      </span>
      <button
        onClick={() => onEdit(task.id)}
        className="p-1 hover:bg-neutral-100 rounded"
      >
        <PencilIcon className="w-4 h-4 text-neutral-500" />
      </button>
      <button
        onClick={() => onDelete(task.id)}
        className="p-1 hover:bg-neutral-100 rounded"
      >
        <TrashIcon className="w-4 h-4 text-neutral-500" />
      </button>
    </div>
  );
} 